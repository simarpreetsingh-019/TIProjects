const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
// const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const pinFileToIPFS = require('./pinata-api-starter/pinJSONToIPFS');
const app = express();
const port = 5000;
const MONGODB_URI="mongodb+srv://bcapp:U3V_U27WU*CEcr3@cluster.gcx2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
const JWT_SECRET="ae2545df4c3e29ae12ace301a2dca03f51de207fc6b7d6bbe1d4cc77763fe46be282803ce54202569eae1b75e9e48d09160374d87506f0e5f39df2cd54e1a40e"
dotenv.config();
function calculateAge(birthDateString) {
    // Split the date string into day, month, year
    const [day, month, year] = birthDateString.split('/').map(Number);

    // Create a Date object (months are 0-indexed in JavaScript)
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust for birthday
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
    return age;
}
const pool = new Pool({
    user: process.env.NEW_USER,
    host: process.env.NEW_HOST,
    database: process.env.NEW_DATABASE,
    password: process.env.NEW_PASSWORD,
    port: process.env.NEW_PORT,
});

console.log('Connecting to PostgreSQL with:', {
    user: process.env.NEW_USER,
    host: process.env.NEW_HOST,
    database: process.env.NEW_DATABASE,
    password: process.env.NEW_PASSWORD,
    port: process.env.NEW_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());
pool.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error', err));

// mongoose.connect("mongodb+srv://bcapp:U3V_U27WU*CEcr3@cluster.gcx2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes); // Authentication routes


// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const FormData = require('form-data');

// Endpoint to handle file upload
app.post('/upload',authMiddleware,upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).send('No file uploaded');
        }
        console.log('File received:', {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
        });

        const pdfBuffer = req.file.buffer;
        // Create a FormData instance
        const form = new FormData();
        form.append('file', pdfBuffer, {
            filename: req.file.originalname,
            contentType: 'application/pdf'
        });

        // Send the PDF to Flask for processing
        const response = await axios.post('http://localhost:5001/extract', form, {
            headers: {
                ...form.getHeaders() // Include the form headers
            }
        });
        
        const { cleaned_text, name, dob } = response.data;
        //console.log('Response from Flask:', response.data);
        age=calculateAge(dob);
        console.log(age);
        pinataContent={
            name:name,
            dob:age
        }
        const value=await pinFileToIPFS(pinataContent);
        console.log("User:",req.user);
        // Send the processed data back to the client
        const userId = req.user.username; // Assuming you have the user ID from the auth middleware
        //console.log("Value:",value);
        //console.log("User id:",userId);
        
        const query = 'UPDATE users SET cid = $1 WHERE username = $2';
        await pool.query(query, [value, userId]);
        console.log("Done");
        res.json({ cleaned_text, name,dob });
        
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

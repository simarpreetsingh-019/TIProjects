// const express = require('express');
// const mongoose = require('mongoose');
// const Log = require('./modules/Log.js');

// const app = express();
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());


// URI = "mongodb+srv://jayaraj:5october2003@cluster0.1kzk6ik.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// app.post('/logs', async (req, res) => {
//     console.log("Inside Server.js");
//     console.log('Log Data:', req.body);
//   const { address, caseName, event, timestamp, result } = req.body;
//   try {
//     const log = new Log({ address, caseName, event, timestamp, result });
//     await log.save();
//     res.status(201).json({ message: 'Log saved successfully' });
//   } catch (error) {
//     console.error('Error saving log:', error);
//     res.status(500).json({ message: 'Error saving log' });
//   }
// });

// app.get('/', (req, res) => {
//     res.send({'status': 'Server is running'});
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // https://192.168.0.110:5000/

// server.js
const express = require('express');
const mongoose = require('mongoose');
const Log = require('./modules/Log.js');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const URI = "mongodb+srv://jayaraj:5october2003@cluster0.1kzk6ik.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/logs', async (req, res) => {
  console.log("Inside Server.js");
  console.log('Log Data:', req.body);
  const { address, caseName, event, timestamp, result } = req.body;
  try {
    const log = new Log({ address, caseName, event, timestamp, result });
    await log.save();
    res.status(201).json({ message: 'Log saved successfully' });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ message: 'Error saving log' });
  }
});

const ocrSpace = async (filePath, { apiKey = 'helloworld', language = 'eng' }) => {
  // const ext = path.extname(filePath).slice(1);
  const pre = `data:image/jpeg;base64,`;
  // console.log('File extension:', ext, 'Pre:', pre);
  
  try {
    const imageBase64 = fs.readFileSync(filePath, { encoding: 'base64' });
    const imageData = pre + imageBase64;
    // console.log(imageData);
    
    const payload = {
      base64Image: imageData,
      isOverlayRequired: false,
      filetype: "JPG",
      apikey: apiKey,
      language: language,
    };
    
    const response = await axios.post('https://api.ocr.space/parse/image', payload);
    console.log('OCR Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error processing the image:', error);
    throw new Error('Error processing the image');
  }
};

app.post('/ocr', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;
  console.log('File path:', filePath);

  try {
    const ocrResult = await ocrSpace(filePath, {
      apiKey: 'K82107326988957',
      language: 'eng',
    });

    // Clean up the uploaded file after OCR
    fs.unlinkSync(filePath);

    console.log('OCR Result:', ocrResult?.ParsedResults);
    res.json({ parsedText: ocrResult?.ParsedResults?.[0]?.ParsedText || 'No text found' });
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error('Error during OCR:', error);
    res.status(500).send('Error during OCR process');
  }
});

app.get('/', (req, res) => {
  res.send({'status': 'Server is running'});
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

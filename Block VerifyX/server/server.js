const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const FRONT_END_URL = process.env.FRONT_END_URL;
const DB = process.env.DB;
const port = process.env.PORT;

const app = express();

app.use(cors({
    origin: [FRONT_END_URL],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

console.log(`${DB}`)
// MongoDB connection
mongoose.connect(DB);
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
})
// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  pdfPath: String,
  uploadDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API endpoint for file upload and user data storage
app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const pdfPath = req.file.path;

    const newUser = new User({
      walletAddress,
      pdfPath
    });
    console.log(newUser);
    await newUser.save();

    res.status(200).json({ message: 'File uploaded and user data saved successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error occurred during upload' });
  }
});

// New route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'walletAddress uploadDate');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// New route to download PDF
app.get('/download/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const file = path.join(__dirname, user.pdfPath);
    if (fs.existsSync(file)) {
      res.download(file);
    } else {
      res.status(404).json({ error: 'PDF file not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while downloading the PDF' });
  }
});

const certificateSchema = new mongoose.Schema({
  certificateHash: {
    type: String,
    required: true,
    unique: true,
  },
  wallet_address: {
    type: String,
    required: true,
  },
  metadata: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: false,
  },
  transactionHash: {
    type: String,
    required: false,
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);

const revokedCertificateSchema = new mongoose.Schema(
  {
    originalCertificateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    certificateHash: {
      type: String,
      required: true,
    },
    wallet_address: {
      type: String,
      required: true,
    },
    metadata: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
    },
    revocationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
const RevokedCertificate = mongoose.model(
  "RevokedCertificate",
  revokedCertificateSchema
);

app.get("/certificates/revoked", async (req, res) => {
  try {
    const revokedCertificates = await RevokedCertificate.find().sort({
      revocationDate: -1,
    });

    res.status(200).json({ revokedCertificates });
  } catch (error) {
    console.error("Error fetching revoked certificates:", error);
    res.status(500).json({ error: "Failed to fetch revoked certificates" });
  }
});

app.post("/certificates/revoke", async (req, res) => {
  try {
    const {
      certificateId,
      certificateHash,
      walletAddress,
      metadata,
      expiryDate,
      revocationDate,
    } = req.body;

    await RevokedCertificate.create({
      originalCertificateId: certificateId,
      certificateHash,
      wallet_address: walletAddress,
      metadata,
      expiryDate,
      revocationDate,
    });

    await Certificate.findByIdAndDelete(certificateId);

    res.status(200).json({ message: "Certificate revoked successfully" });
  } catch (error) {
    console.error("Error in certificate revocation:", error);
    res.status(500).json({ error: "Failed to process certificate revocation" });
  }
});

app.post("/store-transaction", async (req, res) => {
  try {
    console.log("shit");
    const {
      certificateHash,
      wallet_address,
      metadata,
      expiryDate,
      transactionHash,
    } = req.body;

    if (!certificateHash || !wallet_address || !metadata) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const certificate = new Certificate({
      certificateHash,
      wallet_address,
      metadata,
      expiryDate: expiryDate || null,
      transactionHash,
    });

    await certificate.save();

    res.json({
      success: true,
      message: "Certificate stored successfully",
      certificate,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: "Certificate hash already exists",
      });
    } else {
      next(error);
    }
  }
});

app.get("/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find({});

    res.json({
      success: true,
      count: certificates.length,
      certificates,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/uploaddoc", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file);

    if (file && file.mimetype === "application/pdf") {
      // Convert Buffer to ArrayBuffer
    //   const arrayBuffer = new Uint8Array(file.buffer).buffer;

    //   // Now use crypto.subtle.digest with the ArrayBuffer
    //   const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    //   const hashArray = Array.from(new Uint8Array(hashBuffer));
    //   const hashHex = hashArray
    //     .map((byte) => byte.toString(16).padStart(2, "0"))

    //     .join("");

    // const arrayBuffer = await file.arrayBuffer();
    // const hashBuffer = await crypto.subtle.digest("SHA-256", file.buffer);
    // const hashArray = Array.from(new Uint8Array(hashBuffer));
    // const hashHex = hashArray
    //   .map((b) => b.toString(16).padStart(2, "0"))
    //   .join("");
    // const hashBinary = char2Bytes(hashHex);
//  const arrayBuffer = file.buffer.slice(
//    file.buffer.byteOffset,
//    file.buffer.byteOffset + file.buffer.byteLength
//  );

 // Use crypto.subtle.digest with the ArrayBuffer
 const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

        console.log(hashHex);
      res.json({ hash: hashHex });
    } else {
      res.status(400).send("Please upload a valid PDF file.");
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
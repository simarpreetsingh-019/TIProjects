import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { validateBountyData } from './middleware/validateBountyData.mjs';

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client-side URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Enable if you need to send cookies or HTTP authentication
}));

// Use express.json() middleware before defining routes
app.use(express.json());

mongoose.connect('mongodb+srv://t3chnobromo:SagarTanav2003@cluster0.o3lns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to the server..."));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['user', 'admin'] },
  walletAddress: { type: String, unique: true, sparse: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const walletSchema = new mongoose.Schema({
  username: { type: String, required: true },
  walletAddress: { type: String, required: true },
}, { timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);

// New Route: Get User Data by Username
app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Wallet.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      username: user.username,
      role: user.role,
      walletAddress: user.walletAddress,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});

// Define your routes after applying middleware
app.post('/api/add-wallet', async (req, res) => {
  console.log('Received body:', req.body);
  try {
    const { username, walletAddress } = req.body;
    const wallet = new Wallet({ username, walletAddress });
    const savedWallet = await wallet.save();
    res.status(201).json(savedWallet);
  } catch (error) {
    console.error('Error adding wallet address:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});
// Add a new route to update user wallet address
app.put('/api/update-wallet', async (req, res) => {
  const { username, walletAddress } = req.body;

  if (!username || !walletAddress) {
    return res.status(400).json({ message: 'Username and wallet address are required.' });
  }

  try {
    const updatedUser = await Wallet.findOneAndUpdate(
      { username },
      { walletAddress }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Wallet address updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating wallet address:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// Create a Mongoose schema for bounties
const bountySchema = new mongoose.Schema({
  title: { type: String, required: true },
  oneLiner: { type: String, required: true },
  description: { type: String, required: true },
  githubRepo: { type: String, required: true },
  githubIssue: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  rewardAmount: { type: Number, required: true },
  paymentToken: { type: String, required: true },
  isLive: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Bounty = mongoose.model('Bounty', bountySchema);;

// Apply the middleware to the POST route
app.post('/api/bounties', async (req, res) => {
  try {
    const bountyData = req.body;
    console.log('Received bounty data:', bountyData);  // Log the received data

    const bounty = new Bounty(bountyData);
    console.log('Created Bounty instance:', bounty);  // Log the created Bounty instance

    const savedBounty = await bounty.save();
    console.log('Saved Bounty:', savedBounty);  // Log the saved Bounty

    res.status(201).json(savedBounty);  // Return the entire saved bounty object
  } catch (error) {
    console.error('Error creating bounty:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});


app.post('c', async (req, res) => {
  try {
    const { username, role } = req.body;
    const user = await User.findOneAndUpdate(
        { username },
        { role },
        { upsert: true, new: true }
    );
    res.status(201).json(user);
  } catch (error) {
    console.error('Error storing user role:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});



// GET route to retrieve bounties
app.get('/api/bounties', async (req, res) => {
  try {
    const bounties = await Bounty.find();
    res.json(bounties);
  } catch (error) {
    console.error('Error retrieving bounties:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
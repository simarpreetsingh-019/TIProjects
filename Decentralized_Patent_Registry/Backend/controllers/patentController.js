// controllers/patentController.js

const { registerPatentOnBlockchain, transferPatentOnBlockchain, getPatentDetailsFromBlockchain } = require('../services/blockchain');

const registerPatent = async (req, res) => {
    const { title, description, userAddress } = req.body;
    try {
        const result = await registerPatentOnBlockchain(title, description, userAddress);
        return res.status(200).json({ message: 'Patent registered successfully!', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering patent', error: error.message });
    }
};

const transferPatent = async (req, res) => {
    const { patentId, toAddress, fromAddress } = req.body;
    try {
        if (!patentId || !toAddress || !fromAddress) {
            return res.status(400).json({ message: 'patentId, toAddress, and fromAddress are required.' });
        }
        const result = await transferPatentOnBlockchain(patentId, toAddress, fromAddress);
        return res.status(200).json({ message: 'Patent transferred successfully!', data: result });
    } catch (error) {
        console.error('Error in transferPatent:', error);
        return res.status(500).json({ message: 'Error transferring patent', error: error.message });
    }
};

const getPatentDetails = async (req, res) => {
    const { patentId } = req.params;
    try {
        const patentDetails = await getPatentDetailsFromBlockchain(patentId);
        return res.status(200).json({ message: 'Patent details fetched successfully!', data: patentDetails });
    } catch (error) {
        console.error('Error fetching patent details:', error);
        return res.status(500).json({ message: 'Error fetching patent details from blockchain', error: error.message });
    }
};

module.exports = { registerPatent, transferPatent, getPatentDetails };
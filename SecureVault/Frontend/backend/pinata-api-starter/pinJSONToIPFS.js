const axios = require('axios')
require('dotenv').config()

const pinFileToIPFS = async (pinataContent) => {
  try {
    data = JSON.stringify({
      "pinataOptions": {
      "cidVersion": 0
    },
    "pinataMetadata": {
      "name": "testing",
      "keyvalues": {
        "customKey": "customValue",
        "customKey2": "customValue2"
      }
    },
    "pinataContent": {
      pinataContent
    }
    })

    const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    console.log(res.data)
    console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`)
    return res.data.IpfsHash
  } catch (error) {
    console.log(error)
  } 
}

module.exports = pinFileToIPFS;

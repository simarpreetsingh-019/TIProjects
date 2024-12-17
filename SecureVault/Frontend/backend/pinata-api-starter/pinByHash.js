const axios = require('axios')
require('dotenv').config()

const pinFileToIPFS = async () => {
  try {
    data = JSON.stringify({
      "hashToPin": "CID_TO_PIN",
      "pinataMetadata": {
        "name": "testing",
        "keyvalues": {
          "customKey": "customValue1",
          "customKey2": "customValue2"
        }
      }
    })

    const res = await axios.post('https://api.pinata.cloud/pinning/pinByHash', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  } 
}

pinFileToIPFS()

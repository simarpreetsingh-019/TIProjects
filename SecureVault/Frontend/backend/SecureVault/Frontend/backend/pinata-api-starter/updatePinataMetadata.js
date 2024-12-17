const axios = require('axios')
require('dotenv').config()

const updatePinataMetadata = async () => {
  try {
    data = JSON.stringify({
      "ipfsPinHash": "CID",
      "name": "new name for file"
    })

    const res = await axios.put('https://api.pinata.cloud/pinning/hashMetadata', data, {
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

updatePinataMetadata()

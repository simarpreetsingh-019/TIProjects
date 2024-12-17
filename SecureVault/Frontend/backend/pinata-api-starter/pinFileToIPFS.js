const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
require('dotenv').config()

const pinFileToIPFS = async () => {
  try {
    let data = new FormData()
    data.append('file', fs.createReadStream('./assets/Pinnie.png'))
    data.append('pinataOptions', '{"cidVersion": 0}')
    data.append('pinataMetadata', '{"name": "pinnie"}')

    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    console.log(res.data)
    console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`)
  } catch (error) {
    console.log(error)
  } 
}

pinFileToIPFS()

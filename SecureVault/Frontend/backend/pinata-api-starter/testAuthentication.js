const axios = require('axios')
require('dotenv').config()

const testAuthentication = async () => {
  try {
    const res = await axios.get('https://api.pinata.cloud/data/testAuthentication', {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    console.log(res.data)
  } catch(error) {
    console.log(error)
  }
}

testAuthentication()

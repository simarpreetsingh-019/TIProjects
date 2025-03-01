const axios = require('axios')
require('dotenv').config()

const listApiKeys = async () => {
  try {
    const res = await axios.get('https://api.pinata.cloud/users/apiKeys', {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    console.log(res.data)
  } catch(error) {
    console.log(error)
  }
}

listApiKeys()

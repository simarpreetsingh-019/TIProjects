const axios = require('axios')
require('dotenv').config()

const revokeApiKey = async () => {
  try {
    data = JSON.stringify({
      "apiKey": "API_KEY",
    })

    const res = await axios.put('https://api.pinata.cloud/users/revokeApiKey', data, {
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

revokeApiKey()

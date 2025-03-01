const axios = require('axios')
require('dotenv').config()

const generateApiKey = async () => {
  try {
    data = JSON.stringify({
      "keyName": "My Key",
      "permissions": {
        "admin": true
      }
    })

    const res = await axios.post('https://api.pinata.cloud/users/generateApiKey', data, {
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

generateApiKey()

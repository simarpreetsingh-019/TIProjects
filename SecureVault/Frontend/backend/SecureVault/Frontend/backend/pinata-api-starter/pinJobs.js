const axios = require('axios')
require('dotenv').config()

const listPinJobs = async () => {
  try {
    const res = await axios.get('https://api.pinata.cloud/pinning/pinJobs', {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    console.log(res.data)
  } catch(error) {
    console.log(error)
  }
}

listPinJobs()

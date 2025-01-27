const axios = require('axios')
require('dotenv').config()

const pinList = async () => {
  try {
    const res = await axios.get('https://api.pinata.cloud/data/pinList?includeCount=false&status=pinned', {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    const pins = res.data
    console.log(pins.rows)
  } catch(error) {
    console.log(error)
  }
}

pinList()

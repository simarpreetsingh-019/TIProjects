const axios = require('axios')
require('dotenv').config()

const unpin = async () => {
  try {
    const res = await axios.delete(`https://api.pinata.cloud/pinning/unpin/QmRRgUYGgVgqWdsw1i9KscmxnnNfR8jVhCeB92chHCqvxg`, {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

unpin()

const db = require('mongoose')

const connection = async () =>{
   await db.connect(process.env.MONGO_URL)
}

module.exports = connection
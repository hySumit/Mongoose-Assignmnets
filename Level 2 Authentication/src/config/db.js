const db = require('mongoose')

const connectToDb = async()=>{
    db.connect(process.env.DB_URL)
}

module.exports = connectToDb
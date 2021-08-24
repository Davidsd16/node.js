const mongoose = require('mongoose')
const password = require('./password.js')

const connectionString = `mongodb+srv://David:${password}@cluster0.bfvsu.mongodb.net/dbDavid?retryWrites=true&w=majority`

// conexion a mongodb
mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    }).catch(err =>{
        console.error(err)
    })


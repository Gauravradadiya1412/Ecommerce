const app = require('./app');

const dotenv  = require('dotenv');

const connectDB = require('./config/mongoDB');

//config


dotenv.config({path:"backend/config/config.env"})

//connectiong to the database
connectDB()

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT} `)
})
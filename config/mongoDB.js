const mongoose = require('mongoose');


const connection = () => {

    mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true}).then((data)=> {
        console.log(`mongoDB connected : ${data.connection.host}`);
    }).catch((err) => {
        console.log("error mongoDB", err)
    })
    

}

module.exports = connection;
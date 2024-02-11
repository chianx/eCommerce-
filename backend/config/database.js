const mongoose = require("mongoose");

const connectDatabase = ( ) => {
    mongoose.connect(process.env.DB_URL, {})
    .then((data) => {
        console.log("MongoDb connected with sever: " + data.connection.host);
    })
}

module.exports = connectDatabase;
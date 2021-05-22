const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }).then(() => {
            console.log("Connect successfully!!");
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;
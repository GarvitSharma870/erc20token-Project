const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log("Connection Failed");
})
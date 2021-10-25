const mongoose = require('mongoose');
const validator = require('validator');
const tokenSchema = new mongoose.Schema({
    compromisedPublicKey: {
        type: String,
        required: true
    },
    newPublicKey: {
        type: String,
        required: true
    },
    tokenAddress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email Id')
            }
        }
    }
})

const Token = new mongoose.model("Token", tokenSchema);
module.exports = Token;
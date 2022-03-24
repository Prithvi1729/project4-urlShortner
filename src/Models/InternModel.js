const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Enter a Valid Email Address'],
        unique: true
    },

    mobile: {
        type: Number,
        required: true,
        match: [/^([+]\d{2})?\d{10}$/, "Enter 10 Digit Valid Mobile Number"],
        unique: true
    },
    collegeId: {
        type: ObjectId,
        ref: "collegeModel",

        isDeleted: {
            type: Boolean,
            default: false
        }

    }
}, { timeStamps: true })

module.exports = mongoose.model('internModels', internSchema)
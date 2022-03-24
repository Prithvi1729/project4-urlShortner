const mongoose = require('mongoose');
const Url = require('mongoose-type-url');

// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }



const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    fullName: {
        type: String,
        required: true,

    },
    logoLink: {
        type : String,
        required: true,    
        match:[/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,'Enter Valid Format of URL']    
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('collegeModel', collegeSchema)


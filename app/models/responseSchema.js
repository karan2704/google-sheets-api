const mongoose = require("mongoose")

const responseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    formID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    response: [{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }]
})

module.exports = mongoose.model('Response', responseSchema)

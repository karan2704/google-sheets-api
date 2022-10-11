const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    }, 
    date: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    queries: [{
        type: String
    }],
    spreadsheetId:{
        type: String
    }
})

module.exports = mongoose.model('Form', formSchema)
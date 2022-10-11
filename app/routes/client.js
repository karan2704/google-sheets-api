const express = require("express")
const Form = require("../models/formSchema")

const { createSheet, updateSheet } = require("../../plugins/gsheets/gsheets")

const clientRouter = express.Router()

clientRouter.post('/create', (req, res) => {
    //console.log("form creation")
    const {title, date, queries} = req.body
    let spreadsheetId = createSheet(title)
    const newForm = new Form({
        title, 
        date,
        queries,
        spreadsheetId
    })
    console.log(newForm)
    newForm.save((err) => {
        if(err){
            res.status(500).send({
                error: true,
                message: "Internal Server Error"
            })
        }else{
            res.status(200).send({
                error: false,
                message: "Form saved successfully"
            })
        }
    })
    updateSheet(queries, spreadsheetId)
})

module.exports = clientRouter
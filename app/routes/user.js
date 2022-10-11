const express = require("express")
const { updateSheet } = require("../../plugins/gsheets/gsheets")
const Response = require("../models/responseSchema")
const Form = require("../models/formSchema")
const {sendSMS} = require("../../plugins/sendsms/sendSMS")

const userRouter = express.Router()

userRouter.post("/response/:formID", (req, res) => {
    const {name, contact, date, response} = req.body
    const formID = req.params.formID

    Response.find({formID: formID}, {contact: contact}, (err, record) => {
        if(err){
            res.status(501).json({
                error: true,
                message: "Internal Server Error"
            })
        }else{
            if(record.length){
                console.log(record)
                res.status(404).json({
                    error: true,
                    message: "User has already responded"
                })
            }else{
                const newResponse = new Response({
                    name,
                    contact,
                    date,
                    formID,
                    response
                })
                
                newResponse.save((err) => {
                    if(err){
                        res.status(500).send({
                            error: true,
                            message: "Could not save response"
                        })
                    }else{
                        Form.findById(formID, (err, form) => {
                            if(err){
                                console.log(err)
                            }else{
                                if(form){
                                    let spreadsheetId = form.spreadsheetId
                                    updateSheet(response, spreadsheetId)
                                }
                            }
                        })
                        sendSMS(response, contact)

                        res.status(200).send({
                            error: false,
                            message: "Response saved successfully"
                        })
                    }
                })
            }
        }
    })
})

module.exports = userRouter
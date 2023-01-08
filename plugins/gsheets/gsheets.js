const {google} = require("googleapis");
//generate own credentials from google developer console
const keys = require("./keys.json")

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"],
  );

client.authorize((err, tokens) => {
    if(err){
        console.log(err)
        return
    }else{
        console.log("Connected to sheets")
    }
})

const service = google.sheets({version: 'v4', auth: client});

async function createSheet(title){
    const resource = {
        properties: {
        title,
        },
    };
    try{
        const spreadsheet = service.spreadsheets.create({
        resource,
        fields: 'spreadsheetId',
        });
        console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
        return spreadsheet.data.spreadsheetId;
    }catch(err){
        console.log(err)
        return null
    }
}

async function updateSheet(data, spreadsheetId){
    const row = await getFirstEmptyRow(spreadsheetId)
    if(!row){
        return null
    }
    console.log(data)
    const range = `A${row}`
    try{
        const result = service.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            resource: {values: [data]},
        });
        return result
    }catch(err){
        console.log(err)
        return null
    }    
}

async function getFirstEmptyRow(spreadsheetId){
    const request = {
        spreadsheetId,
        range: 'A1:Z100'
    };
    try{
        const sheet = await service.spreadsheets.values.get(request)
        console.log(sheet.data.values)
        return sheet.data.values.length + 1
    }catch(err){
        console.log(err)
        return null
    }
    
}


module.exports = { createSheet, updateSheet }


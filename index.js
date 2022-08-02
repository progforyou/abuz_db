const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./logger')
const expressWinston = require('express-winston');
const port = process.env.PORT || 8080;
const db_tools = require('./db_tools');
const cors = require('cors')
const axios = require("axios");
const  {config} = require('dotenv')
const {bot} = require("./bot")
const {getUser, checkUserByMachineID, writeUserAccess, writeRatData} = require("./db_tools");

const chatIDBosses = [473018697, 494127139]

bot.launch();



const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(
    express.urlencoded({
        extended: true
    })  
)

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/checkMachine', async (req, res) => {
    let machineID = req.body.machineID
    console.log(machineID)
    console.log(process.env.AUTHORIZATION)
    if (req.header("Authorization") === process.env.AUTHORIZATION){
        let user = await checkUserByMachineID(machineID)
        if (user){
            if (user.licenseExpired.getTime() > new Date().getTime()){
                return res.send({loginStatus: "2", userData: user})
            } else {
                return res.send({loginStatus: "1"})
            }
        }
    }

    return res.send({loginStatus: "0"})
})

app.post('/login', async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let machineID = req.body.machineID
    console.log(typeof process.env.AUTHORIZATION)
    console.log(req.header("Authorization") === process.env.AUTHORIZATION);
    console.log(req.header("Authorization"))
    if (req.header("Authorization") === process.env.AUTHORIZATION){
        let user = await getUser(name, password)
        console.log(user)
        if (user){
            if (user.machineID){
                return res.send({loginStatus: "99"})
            } else {
                await writeUserAccess(name, password, machineID)
                return res.send({loginStatus: "1"})   
            }
        }
    }
    
    return res.send({loginStatus: "0"})
})

app.post('/setRat', async (req, res) => {
    let ratData = req.body.ratData;
    //TODO CHANGE LOGIN TO NAME
    let name = req.body.login;
    let password = req.body.password;
    if (req.header("Authorization") === process.env.AUTHORIZATION){
        let user = await getUser(name, password)
        if (user.rat){
            chatIDBosses.map(e => {
                bot.telegram.sendMessage(e, `Rat detect: ${name} ${password}`)
            })
            await writeRatData(ratData, name, password)
        }
        return res.send({loginStatus: "1"})
    }

    return res.send({loginStatus: "0"})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
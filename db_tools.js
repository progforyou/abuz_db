const db = require('./models/index.js');

const getUser = async (name, password) => {
    let row = await db.Users.findOne({where: {name: name, password: password}});
    if (row) return row.dataValues;
    return null
}

const checkUserByMachineID = async (machineID) => {
    let row = await db.Users.findOne({where: {machineID: machineID}});
    if (row) return row.dataValues;
}

const createUser = async (name, password) => {
    await db.Users.create({name: name, password: password, createData: new Date(), licenseExpired: addDays(new Date(), 30), maxProfiles: 80});
}

const createUserRat = async (name, password) => {
    await db.Users.create({name: name, password: password, createData: new Date(), licenseExpired: addDays(new Date(), 30), rat: true, maxProfiles: 80});
}

const writeRatData = async (ratData, name, password) => {
    let row = await db.Users.findOne({where: {name: name, password: password}});
    if (row.rat){
        if (row.ratData){
            let oldData = JSON.parse(row.ratData);
            if (!oldData.includes(ratData)) {
                oldData.push(ratData);
            }
            await db.Users.update(
                { ratData: JSON.stringify(oldData)},
                {where: {
                    name: name, password: password
                    }});
        } else {
            let data = [];
            data.push(ratData);
            console.log(data)
            await db.Users.update(
                {ratData: JSON.stringify(data)},
                {where: {
                    name: name, password: password
                }});
        }
    }
    
}

const writeUserAccess = async (name, password, machineID, ownerIP) => {
   return await db.Users.update(
        {machineID: machineID, ownerIP: ownerIP}, 
        {where: {
            name: name, 
            password: password
        }});
}

const extendLicense = async (name, password) => {
    const updatedRows = await db.Users.update(
        {licenseExpired: addDays(new Date(), 30)},
        {where: {
                name: name,
                password: password
            }});
}

const getAllUsers = async () => {
    return await db.Users.findAll()
}

const deleteUser = async (name, password) => {
    return db.Users.destroy({
        where: {
            name: name,
            password: password
        }
    });
}

const writeDedicated = async (name, password) => {
    return await db.Users.update(
        {dedicated: true},
        {where: {
                name: name,
                password: password
            }});
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


module.exports = {
    getUser,
    createUser,
    checkUserByMachineID,
    writeUserAccess,
    writeRatData,
    extendLicense,
    createUserRat,
    getAllUsers,
    deleteUser,
    writeDedicated
}
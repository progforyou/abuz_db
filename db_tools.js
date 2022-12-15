const db = require('./models/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const MAX_PROFILES = 80

const getUser = async (name, password) => {
    let row = await db.Users.findOne({where: {name: name, password: password}});
    if (row) return row.dataValues;
    return null
}

const checkUserByMachineID = async (machineID) => {
    let row = await db.Users.findOne({where: {activeMachineIDs: {[Op.like]: `%${machineID};%`}}});
        if (row?.dataValues?.rat){
            await db.Users.update(
                {lastSeen: new Date()},
                {where: {activeMachineIDs: {[Op.like]: `%${machineID};%`}}});
        }
    if (row) return row.dataValues;
}

const createUser = async (name, password) => {
    await db.Users.create({name: name, password: password, createData: new Date(), licenseExpired: addDays(new Date(), 30), maxProfiles: MAX_PROFILES, maxMachines: 5});
}

const createCustomUser = async (name, password, maxProfiles, maxMachines, license) => {
    await db.Users.create({name: name, password: password, createData: new Date(), licenseExpired: addDays(new Date(), license), maxProfiles: maxProfiles, maxMachines: maxMachines});
}

const createUserRat = async (name, password) => {
    await db.Users.create({name: name, password: password, createData: new Date(), licenseExpired: addDays(new Date(), 30), rat: true, maxProfiles: MAX_PROFILES});
}

const writeRatData = async (ratData, name, password) => {
    let row = await db.Users.findOne({where: {name: name, password: password}});
    if (row.rat){
        if (row.ratData){
            let oldData = JSON.parse(row.ratData);
            if (!oldData.includes(ratData) && oldData.length < 2) {
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

const writeUser = async (user) => {
    return await db.Users.update(user, {where: {id: user.id}})
}

const writeUserAccess = async (name, password, machineID, ownerIP) => {
   return await db.Users.update(
        {machineID: machineID, ownerIP: ownerIP, lastSeen: new Date()}, 
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
    return true
}

const extendLicenseAll = async () => {
    const allRows = await db.Users.findAll()
    const allId = allRows.map(e => e["id"])
    const updatedRows = await db.Users.update(
        {licenseExpired: addDays(new Date(), 60)},
        {where: {
                id: allId,
            }});
    return true
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
    writeDedicated,
    extendLicenseAll,
    createCustomUser,
    writeUser
}
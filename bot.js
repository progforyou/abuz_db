const Telegraf = require('telegraf');
const {createUser, getUser, extendLicense, createUserRat, getAllUsers, deleteUser} = require("./db_tools");
//https://github.com/telegraf/telegraf/issues/705
/*const start = require("./controllers/start");
const getUser = require("./controllers/getUser");


const stage = new Telegraf.Scenes.Stage([
    start,
    getUser
]);*/

/*bot.use(stage.middleware());*/
const rootIds = [494127139, 473018697]
const bot = new Telegraf.Telegraf(process.env.TELEGRAM_API_TOKEN);

bot.command('start', ctx => {
    if (rootIds.includes(ctx.from.id)) {
        ctx.reply('hello boss! Enter command...')
    } else {
        ctx.reply('You are not a boss! Bye!')
    }
})

bot.command('createUser', ctx => {
    if (!rootIds.includes(ctx.from.id)) {
        ctx.reply('You are not a boss! Bye!')
        return
    }
    let name = Math.random().toString(36).slice(-8);
    let password = Math.random().toString(36).slice(-8);
    //create in db
    createUser(name, password).then(() =>{
        ctx.reply(`User created!\n name: ${name} \n password: ${password}`)  
    })
})

bot.command('createUserRat', ctx => {
    if (!rootIds.includes(ctx.from.id)) {
        ctx.reply('You are not a boss! Bye!')
        return
    }
    let name = Math.random().toString(36).slice(-8);
    let password = Math.random().toString(36).slice(-8);
    //create in db
    createUserRat(name, password).then(() =>{
        ctx.reply(`User created!\n name: ${name} \n password: ${password}`)
    })
})

bot.command('getAllUsers', ctx => {
    if (!rootIds.includes(ctx.from.id)) {
        ctx.reply('You are not a boss! Bye!')
        return
    }
    //create in db
    getAllUsers().then((r) =>{
        if (r) ctx.reply(`Found users !\n ${JSON.stringify(r)}`)
        else ctx.reply(`User not found!`)
    }).catch(e => {
        ctx.reply(`Error get user!`)
    })
})





bot.on('text', (ctx) => {
    if (!rootIds.includes(ctx.from.id)) {
        ctx.reply('You are not a boss! Bye!')
        return
    }
    if (ctx.message.text.split(" ").length !== 3){
        ctx.reply("Bad command")
        return
    }
    let func = ctx.message.text.split(" ")[0]
    let name = ctx.message.text.split(" ")[1]
    let password = ctx.message.text.split(" ")[2]
    switch (func) {
        case "get":
            getUser(name, password).then((r) =>{
                if (r) ctx.reply(`Found user !\n ${JSON.stringify(r)}`)
                else ctx.reply(`User not found!`)
            }).catch(e => {
                ctx.reply(`Error get user!`)
            })
            break;
        case "extend":
            extendLicense(name, password).then((r) =>{
                if (r) ctx.reply(`License extended!`)
                else ctx.reply(`User not found!`)
            }).catch(e => {
                ctx.reply(`Error extended!`)
            })
            break;
        case "delete":
            deleteUser(name, password).then((r) =>{
                if (r) ctx.reply(`User deleted!`)
                else ctx.reply(`User not found!`)
            }).catch(e => {
                ctx.reply(`Error extended!`)
            })
            break;
    }

});

const sendRatMessages = (ids, name, password) => {
    ids.map(e => {
        bot.sendMessage(e, `Rat detect ${name}, ${password}`)
    })
}


module.exports = {
    bot,
    sendRatMessages
}
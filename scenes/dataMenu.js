const {Scenes, Markup} = require("telegraf");
const {getAllUsers} = require("../db_tools");
const {SendJSON} = require("./tools");

const GO_TO_FIND_USER = "GO_TO_FIND_USER"
const GO_TO_ALL_USERS = "GO_TO_ALL_USERS"
const GO_TO_FILTER_USERS = "GO_TO_FILTER_USERS"

const DataMenuScene = new Scenes.WizardScene('dataMenu',
    (ctx) => {
        ctx.reply('Меню', Markup.inlineKeyboard([
            Markup.button.callback('Найти пользователя', GO_TO_FIND_USER),
            Markup.button.callback('Все пользователь', GO_TO_ALL_USERS),
            Markup.button.callback('Найти по фильтру', GO_TO_FILTER_USERS),
        ], {
            columns: 2
        }));
    }
);

DataMenuScene.action(GO_TO_FIND_USER, (ctx) => {
    return ctx.scene.enter('findUser');
})

DataMenuScene.action(GO_TO_FILTER_USERS, (ctx) => {
    ctx.reply("Пока пусто").then(r => {
        ctx.scene.enter('menu');
    })
})

DataMenuScene.action(GO_TO_ALL_USERS, (ctx) => {
    getAllUsers().then((users) =>{
        if (users.length) {
            ctx.reply(`Пользователи найдены!`).then(r => {
                let res = JSON.stringify(users, 2)
                SendJSON(res, ctx).then(r => {
                    return ctx.scene.enter('menu');
                })
            })
        } else {
            ctx.reply(`Пусто!`).then(r => {
                return ctx.scene.enter('menu');
            })
        }
    }).catch(e => {
        ctx.reply(`Ошибка!`).then(r => {
            return ctx.scene.enter('menu');
        })
    })
})

module.exports = DataMenuScene
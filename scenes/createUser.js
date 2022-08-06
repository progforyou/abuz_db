const { Scenes, Markup} = require('telegraf');
const {createUser, createUserRat} = require("../db_tools");

const CREATE_USER_RAT_ACTION = "CREATE_USER_RAT_ACTION"
const CREATE_USER_ACTION = "CREATE_USER_ACTION"
const GO_TO_MENU_ACTION = "GO_TO_MENU_ACTION"

const CreateUserScene = new Scenes.WizardScene('createUser',
    (ctx) => {
        ctx.reply('Нужно ли отслеживание?', Markup.inlineKeyboard([
            Markup.button.callback('Да', CREATE_USER_RAT_ACTION),
            Markup.button.callback('Нет', CREATE_USER_ACTION),
            Markup.button.callback('В меню', GO_TO_MENU_ACTION),
        ], {
            columns: 2
        }));
    }
);

CreateUserScene.action(CREATE_USER_ACTION, (ctx) => {
    let name = Math.random().toString(36).slice(-8);
    let password = Math.random().toString(36).slice(-8);
    //create in db
    createUser(name, password).then(() =>{
        ctx.reply(`Пользователь создан!`).then(r => {
            ctx.reply(`name: ${name} \n password: ${password}`).then(r => {
                return ctx.scene.enter('menu');
            })
        })
    }).catch(e => {
        ctx.reply(`Ошибка создания!`).then(r => {
            return ctx.scene.enter('menu');
        })
    })
});

CreateUserScene.action(CREATE_USER_RAT_ACTION, (ctx) => {
    let name = Math.random().toString(36).slice(-8);
    let password = Math.random().toString(36).slice(-8);
    //create in db
    createUserRat(name, password).then(() =>{
        ctx.reply(`Пользователь с отслеживанием создан!`).then(r => {
            ctx.reply(`name: ${name} \n password: ${password}`).then(r => {
                return ctx.scene.enter('menu');
            })
        })
    }).catch(e => {
        ctx.reply(`Ошибка создания!`).then(r => {
            return ctx.scene.enter('menu');
        })
    })
});

CreateUserScene.action(GO_TO_MENU_ACTION, (ctx) => {
    return ctx.scene.enter('menu');
})



module.exports = CreateUserScene

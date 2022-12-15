const { Scenes, Markup} = require('telegraf');
const {createUser, createUserRat} = require("../db_tools");

const GO_CREATE_USER_RAT_ACTION = "GO_CREATE_USER_RAT_ACTION"
const GO_CREATE_USER_ACTION = "GO_CREATE_USER_ACTION"
const GO_TO_MENU_ACTION = "GO_TO_MENU_ACTION"
const GO_CREATE_CUSTOM_USER_ACTION = "GO_CREATE_CUSTOM_USER_ACTION"

const CreateUserScene = new Scenes.WizardScene('createUser',
    (ctx) => {
        ctx.reply('Выберите тип', Markup.inlineKeyboard([
            Markup.button.callback('Кастомный', GO_CREATE_CUSTOM_USER_ACTION),
            Markup.button.callback('Обычный с отсл', GO_CREATE_USER_RAT_ACTION),
            Markup.button.callback('Обычный', GO_CREATE_USER_ACTION),
            Markup.button.callback('В меню', GO_TO_MENU_ACTION),
        ], {
            columns: 2
        }));
    }
);

CreateUserScene.action(GO_TO_MENU_ACTION, (ctx) => {
    return ctx.scene.enter('menu');
})

CreateUserScene.action(GO_CREATE_CUSTOM_USER_ACTION, (ctx) => {
    return ctx.scene.enter('createCustomUser');
})

CreateUserScene.action(GO_CREATE_USER_ACTION, (ctx) => {
    return ctx.scene.enter('createDefaultUser');
})
CreateUserScene.action(GO_CREATE_USER_RAT_ACTION, (ctx) => {
    return ctx.scene.enter('createRatUser');
})



module.exports = CreateUserScene

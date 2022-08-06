const { Scenes, Markup} = require('telegraf');

const GO_TO_CREATE_USER = "GO_TO_CREATE_USER"
const GO_TO_CHANGE_USER = "GO_TO_CHANGE_USER"
const GO_TO_DELETE_USER = "GO_TO_DELETE_USER"
const GO_TO_CHECK_DATA = "GO_TO_CHECK_DATA"

const MenuScene = new Scenes.WizardScene('menu',
    (ctx) => {
        ctx.reply('Меню', Markup.inlineKeyboard([
            Markup.button.callback('Создать юзера', GO_TO_CREATE_USER),
            Markup.button.callback('Изменить юзера', GO_TO_CHANGE_USER),
            Markup.button.callback('Удалить юзера', GO_TO_DELETE_USER),
            Markup.button.callback('Посмотреть данные', GO_TO_CHECK_DATA),
        ], {
            columns: 2
        }));
    }
);

MenuScene.action(GO_TO_CREATE_USER, (ctx) => {
    return ctx.scene.enter('createUser');
})

MenuScene.action(GO_TO_CHANGE_USER, (ctx) => {
    return ctx.scene.enter('editUser');
})

MenuScene.action(GO_TO_DELETE_USER, (ctx) => {
    return ctx.scene.enter('deleteUser');
})

MenuScene.action(GO_TO_CHECK_DATA, (ctx) => {
    return ctx.scene.enter('dataMenu');
})


module.exports = MenuScene

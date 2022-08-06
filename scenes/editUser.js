const { Scenes, Markup} = require('telegraf');

const EXTEND_LICENSE_ACTION = "EXTEND_LICENSE_ACTION"
const GO_TO_MENU_ACTION = "GO_TO_MENU_ACTION"

const EditUserScene = new Scenes.WizardScene('editUser',
    (ctx) => {
        ctx.reply('Что изменить?', Markup.inlineKeyboard([
            Markup.button.callback('Продлить лицензию', EXTEND_LICENSE_ACTION),
            Markup.button.callback('В меню', GO_TO_MENU_ACTION),
        ],{
            columns: 1
        }));
    }
);


EditUserScene.action(EXTEND_LICENSE_ACTION, (ctx) => {
    return ctx.scene.enter('extendLicense');
});

EditUserScene.action(GO_TO_MENU_ACTION, (ctx) => {
    return ctx.scene.enter('menu');
});




module.exports = EditUserScene

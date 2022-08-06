const { Scenes} = require('telegraf');
const {rootIds, } = require("./data");
const start = new Scenes.BaseScene('start');

const GO_TO_MENU_ACTION = "GO_TO_MENU_ACTION"

start.enter((ctx) => {
    if (!rootIds.includes(ctx.from.id)) {
        ctx.reply('Хорошая попытка, но нет').then(r => {
            return ctx.scene.leave();  
        })
    } else {
        ctx.reply('Добро пожаловать').then(r => {
            return ctx.scene.enter('menu');
        })
    }
});



start.action(GO_TO_MENU_ACTION, (ctx) => {
    return ctx.scene.enter('menu');
})


module.exports = start

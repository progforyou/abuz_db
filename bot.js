const Telegraf = require('telegraf');
//https://github.com/telegraf/telegraf/issues/705
const ExtendLicenseScene = require("./scenes/extendLicense");
const start = require("./scenes/start");
const MenuScene = require("./scenes/menu");
const CreateUserScene = require("./scenes/createUser");
const EditUserScene = require("./scenes/editUser");
const DeleteUserScene = require("./scenes/deleteUser");
const DataMenuScene = require("./scenes/dataMenu");
const FindUserScene = require("./scenes/findUser");


const stage = new Telegraf.Scenes.Stage([
    start,
    MenuScene,
    CreateUserScene,
    EditUserScene,
    DeleteUserScene,
    DataMenuScene,
    FindUserScene,
    ExtendLicenseScene
]);

const bot = new Telegraf.Telegraf(process.env.TELEGRAM_API_TOKEN);
bot.use(Telegraf.session())
bot.use(stage.middleware());

bot.command('start',(ctx) => ctx.scene.enter('start'));

bot.command('menu', (ctx) => ctx.scene.enter('menu'))



module.exports = {
    bot
}
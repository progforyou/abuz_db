/*
const { Scenes, Markup} = require('telegraf');
const start = new Scenes.BaseScene('start');

const LOGIN_ACTION = "MOVIE_ACTION"

start.enter((ctx) => {
    ctx.reply('What is your drug?', Markup.inlineKeyboard([
        Markup.callbackButton('Login', LOGIN_ACTION),
    ]).extra());
});

start.action(LOGIN_ACTION, (ctx) => {
    return ctx.scene.enter('getUser');
});

start.leave((ctx) => {
    ctx.reply('Thank you for your time!');
});

module.exports = start*/

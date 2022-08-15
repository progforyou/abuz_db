const { Scenes} = require('telegraf');
const {deleteUser, getUser} = require("../db_tools");
const {SendJSON} = require("./tools");
const FindUserScene = new Scenes.WizardScene('findUser',
    (ctx) => {
        ctx.wizard.state.userData = {};
        ctx.reply(`Введите логин`, {});
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.userData.name = ctx.message.text;
        ctx.reply(`Введите пароль`, {});
        return ctx.wizard.next();
    },
    (ctx) =>{
        ctx.wizard.state.userData.password = ctx.message.text;
        getUser(ctx.wizard.state.userData.name, ctx.wizard.state.userData.password).then((user) =>{
            if (user) {
                let res = JSON.stringify(user, 2)
                ctx.reply(`Пользователь найден!`).then(r => {
                    SendJSON(res, ctx).then(r => {
                        return ctx.scene.enter('menu');    
                    })
                })
            }
            else ctx.reply(`Пользователь не найден!`).then(r => {
                return ctx.scene.enter('menu');
            })
        }).catch(e => {
            ctx.reply(`Ошибка поиска!`).then(r => {
                return ctx.scene.enter('menu');
            })
        })
    }
);


module.exports = FindUserScene

const { Scenes} = require('telegraf');
const {extendLicense} = require("../db_tools");
const ExtendLicenseScene = new Scenes.WizardScene('extendLicense',
    (ctx) => {
        ctx.wizard.state.userData = {};
        ctx.reply(`Введите логин`, {});
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.message){
            if (ctx.message.text === "/menu"){
                return ctx.scene.enter('menu');
            }
            try{
                ctx.wizard.state.userData.name = ctx.message.text;
                ctx.reply(`Введите пароль`, {});
                return ctx.wizard.next();
            } catch (e) {
                ctx.reply(`${e.toString()}`).then(r => {
                    return ctx.scene.enter('menu');
                })
            }
        }
    },
    (ctx) =>{
        if (ctx.message){
            if (ctx.message.text === "/menu"){
                return ctx.scene.enter('menu');
            }
            try{
                ctx.wizard.state.userData.password = ctx.message.text;
                extendLicense( ctx.wizard.state.userData.name,  ctx.wizard.state.userData.password).then((r) =>{
                    if (r) ctx.reply(`Лицензия продлена!`).then(r => {
                        return ctx.scene.enter('menu');
                    })
                    else ctx.reply(`Пользователь не найден!`).then(r => {
                        return ctx.scene.enter('menu');
                    })
                }).catch(e => {
                    ctx.reply(`Ошибка продления!`).then(r => {
                        return ctx.scene.enter('menu');
                    })
                })
            } catch (e) {
                ctx.reply(`${e.toString()}`).then(r => {
                    return ctx.scene.enter('menu');
                })
            }
        }
    }
    );


module.exports = ExtendLicenseScene

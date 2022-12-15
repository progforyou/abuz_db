const { Scenes} = require('telegraf');
const {createUser, createCustomUser} = require("../../db_tools");
const CreateCustomUserScene = new Scenes.WizardScene('createCustomUser',
    (ctx) => {
        ctx.wizard.state.userData = {};
        ctx.reply(`Введите максимум профилей`, {});
        return ctx.wizard.next();
    },(ctx) => {
        ctx.wizard.state.userData.profiles = Number(ctx.message.text.replace(" ", ""));
        ctx.reply(`Введите максимум железа`, {});
        return ctx.wizard.next();
    },(ctx) => {
        ctx.wizard.state.userData.maxMachines = Number(ctx.message.text.replace(" ", ""));
        ctx.reply(`Введите срок действия лицензии (в днях)`, {});
        return ctx.wizard.next();
    },(ctx) => {
        ctx.wizard.state.userData.license = Number(ctx.message.text.replace(" ", ""));
        ctx.reply(`Введите количество`, {});
        return ctx.wizard.next();
    },
    (ctx) => {
        let count = Number(ctx.message.text.replace(" ", ""));
        let ps = []
        for (let i = 0; i < count; i++) {
            let name = Math.random().toString(36).slice(-8);
            let password = Math.random().toString(36).slice(-8);
            //create in db
            let p = createCustomUser(name, password, ctx.wizard.state.userData.profiles, ctx.wizard.state.userData.maxMachines, ctx.wizard.state.userData.license).then(() =>{
                ctx.reply(`name: ${name} \n password: ${password}`)
            }).catch(e => {
                ctx.reply(`Ошибка создания!`)
            })
            ps.push(p)
        }
        Promise.all(ps).then(r => {
            ctx.reply(`Готово!`).then(r => {
                return ctx.scene.enter('menu');
            })  
        })
    },
);


module.exports = CreateCustomUserScene

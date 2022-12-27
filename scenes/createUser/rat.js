const { Scenes} = require('telegraf');
const {createUser, createUserRat} = require("../../db_tools");
const CreateRatUserScene = new Scenes.WizardScene('createRatUser',
    (ctx) => {
        ctx.wizard.state.userData = {};
        ctx.reply(`Введите количество`, {});
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.message){
            if (ctx.message.text === "/menu"){
                return ctx.scene.enter('menu');
            }
            try{
                let count = Number(ctx.message.text.replace(" ", ""));
                if (isNaN(count)){
                    throw "bad number"
                }
                let ps = []
                for (let i = 0; i < count; i++) {
                    let name = Math.random().toString(36).slice(-8);
                    let password = Math.random().toString(36).slice(-8);
                    let p = createUserRat(name, password).then(() =>{
                        ctx.reply(`Пользователь с отслеживанием создан!`).then(r => {
                            ctx.reply(`name: ${name} \n password: ${password}`)
                        })
                    }).catch(e => {
                        ctx.reply(`Ошибка создания!`).then(r => {
                            return ctx.scene.enter('menu');
                        })
                    })
                    ps.push(p)
                }
                Promise.all(ps).then(r => {
                    ctx.reply(`Готово!`).then(r => {
                        return ctx.scene.enter('menu');
                    })
                })
            } catch (e) {
                ctx.reply(`${e.toString()}`).then(r => {
                    return ctx.scene.enter('menu');
                })
            }
        }
    },
);


module.exports = CreateRatUserScene

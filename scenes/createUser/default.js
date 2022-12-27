const { Scenes} = require('telegraf');
const {createUser} = require("../../db_tools");
const CreateDefaultUserScene = new Scenes.WizardScene('createDefaultUser',
    (ctx) => {
        ctx.wizard.state.userData = {};
        ctx.reply(`Введите количество`, {});
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.message){
            try{
                if (ctx.message.text === "/menu"){
                    return ctx.scene.enter('menu');
                }
                let count = Number(ctx.message.text.replace(" ", ""));
                if (isNaN(count)){
                    throw "bad number"
                }
                let ps = []
                for (let i = 0; i < count; i++) {
                    let name = Math.random().toString(36).slice(-8);
                    let password = Math.random().toString(36).slice(-8);
                    //create in db
                    let p = createUser(name, password).then(() =>{
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
            } catch (e) {
                ctx.reply(`${e.toString()}`).then(r => {
                    return ctx.scene.enter('menu');
                })
            }
        }
    },
);


module.exports = CreateDefaultUserScene

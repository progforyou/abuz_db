const { Scenes} = require('telegraf');
const {deleteUser} = require("../db_tools");
const DeleteUserScene = new Scenes.WizardScene('deleteUser',
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
        deleteUser(ctx.wizard.state.userData.name, ctx.wizard.state.userData.password).then((r) =>{
            if (r) ctx.reply(`Пользователь удален!`).then(r => {
                return ctx.scene.enter('menu');
            })
            else ctx.reply(`Пользователь не найден!`).then(r => {
                return ctx.scene.enter('menu');
            })
        }).catch(e => {
            ctx.reply(`Ошибка удаления!`).then(r => {
                return ctx.scene.enter('menu');
            })
        })
    }
);


module.exports = DeleteUserScene

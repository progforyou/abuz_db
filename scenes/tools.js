const {maxSize} = require("./data");


const SendJSON = async (message, ctx) => {
    let messagesArray = ToJSONMessages(message)
    for (let i = 0; i < messagesArray.length; i++) {
        await ctx.reply(messagesArray[i])
    }
}

const ToJSONMessages = (messageString) => {
    let amountSliced = messageString.length / maxSize
    let start = 0
    let end = maxSize
    let message
    let messagesArray = []
    for (let i = 0; i < amountSliced; i++) {
        message = messageString.slice(start, end)
        messagesArray.push(message)
        start = start + maxSize
        end = end + maxSize
    }
    return messagesArray
}

module.exports = {
    SendJSON,
}
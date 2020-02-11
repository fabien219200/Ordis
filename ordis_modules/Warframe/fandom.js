const Discord = require('discord.js')
const fonctions = require('../../ordis_bot')

module.exports.wiki = async function (message) {

    let embed = new Discord.RichEmbed()
        .setTitle("**__Wiki__**")
        .setColor('#0101F2')

    var msg = message.content.split(" ").slice(1).join(" ")
    var msgFr = msg.split("-").slice(2).join("").trim()
    if (!msgFr == "") {
        msgFr = fonctions.majuscule(msgFr, " ")
        msgFr2 = msgFr.split(" ").join("_")
        
        embed.addField("Lien de la page du wiki pour " + msgFr + " :", "https://translate.google.com/translate?client=tw-ob&depth=1&hl=fr&ie=UTF8&rurl=translate.google.com&sl=en&sp=nmt4&tl=fr&u=https://warframe.fandom.com/wiki/" + msgFr2)
    } else {
        msg = fonctions.majuscule(msg, " ")
        msg2 = msg.split(" ").join("_")
        
        embed.addField("Lien de la page du wiki pour " + msg + " :", "https://warframe.fandom.com/wiki/" + msg2)
    }
    
    message.channel.send(embed)
}

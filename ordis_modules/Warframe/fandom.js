const Discord = require('discord.js')
const fonctions = require('../../ordis')

module.exports.wiki = function (message) {
    var msg = ""
    msg = fonctions.majuscule(message.content, msg)
    msg2 = msg.split(" ").join("_")
    let embed = new Discord.RichEmbed()
        .setTitle("**__Wiki__**")
        .setColor('#0101F2')
        .addField("Lien de la page du wiki pour " + msg + " :", "https://warframe.fandom.com/wiki/" + msg2)
    message.channel.send(embed)
}

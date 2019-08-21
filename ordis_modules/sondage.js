const Discord = require('discord.js')

module.exports.question = function (message) {
    message.delete(1000)
        .then(function () {
            let args = message.content.split(" ").slice(1)
            let thingToEcho = args.join(" ")
            var embed = new Discord.RichEmbed()
                .setTitle("Sondage créé par " + message.author.username)
                .addField(thingToEcho, "Repondre avec :white_check_mark: ou :x:")
                .setColor("#FF0200")
                .setTimestamp()
            //message.channel.send("@here")
            message.channel.send(embed)
                .then(function (message) {
                    message.react("✅")
                        .then(function () {
                            message.react("❌")
                        }).catch(function () {
                    message.channel.send("Syntaxe error")
                })
                }).catch(function () {
                    message.channel.send("Syntaxe error")
                })
        }).catch(function () {
            let embed = new Discord.RichEmbed()
                .setTitle("Erreur de syntaxe !")
                //.setThumbnail("")
                .setDescription("Il faut un message derière **/sondage** pour executer la commande")
            message.channel.send(embed)
        })
}

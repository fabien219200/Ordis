const Discord = require('discord.js')

module.exports.question = async function (message) {
    try {
        if (message.content.split("-").length == 3) {
            var emote = message.content.split("-")[1].split(" ")
            var msg = message.content.split("-").slice(2)
            var desc = "Merci de réagir avec "
            for (var i = 0; i < emote.length; i++) {
                if (message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].toLowerCase())) {
                    console.log(message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].toLowerCase()))
                    desc = desc + " " + message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].toLowerCase())
                } else {
                    desc = desc + emote[i]
                }
            }
        } else {
            var msg = message.content.split(" ").slice(1)
            var desc = "Repondre avec :white_check_mark: ou :x:"
        }

        var embed = new Discord.RichEmbed()
            .setTitle("Sondage créé par " + message.author.username)
            .addField(msg, desc)
            .setColor("#FF0200")
            .setTimestamp()
        //message.channel.send("@here")
        message.channel.send(embed)
            .then(function (message) {
                reaction(message, emote)
                message.pin()
            }).catch(function (err) {
                console.log(err)
                message.channel.send("" + err)
            })
    } catch{
        let embed = new Discord.RichEmbed()
            .setTitle("Erreur de syntaxe !")
            //.setThumbnail("")
            .setDescription("Il faut un message derière **!sondage** pour executer la commande")
        message.channel.send(embed)
    }
}

async function reaction(message, emote) {
    //console.log(emote)
    if (emote) {
        for (var i = 0; i < emote.length; i++) {
            if (message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].toLowerCase())) {
                try {
                    await message.react(message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].toLowerCase()))
                } catch{
                    message.channel.send("Emoji \"" + emote[i] + "\" introuvable !")
                }
            } else {
                try {
                    await message.react(emote[i])
                } catch {
                    message.channel.send("Emoji \"" + emote[i] + "\" introuvable !")
                }
            }
        }
    } else {
        message.react("✅")
            .then(() => {
                message.react("❌")
            }).catch(function (err) {
                message.channel.send("" + err)
            })
    }
}

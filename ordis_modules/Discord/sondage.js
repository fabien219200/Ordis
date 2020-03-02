const Discord = require('discord.js')

module.exports.question = async function (message) {
    try {
        if (message.content.split("-").length == 3) {
            var emote = message.content.split("-")[1].split(" ")
            var msg = message.content.split("-").slice(2).join(" ").replace(/ *(<@(!|&))\d+>/g, "").trim()
            var emoteDesc = "Merci de réagir avec "
            for (var i = 0; i < emote.length; i++) {
                if (emote[i] == "") {
                    emote.splice(i, 1)
                    i--
                } else {
                    emote[i] = emote[i].replace(/<*:\d*>*/g, "")
                    if (message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].replace(/:/, "").toLowerCase())) {
                        emoteDesc = emoteDesc + " " + message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].replace(/:/, "").toLowerCase())
                    } else {
                        emoteDesc = emoteDesc + emote[i]
                    }
                }
            }
        } else {
            var msg = message.content.split(" ").slice(1).join(" ").replace(/ *(<@!)\d+>/g, "").trim()
            var emoteDesc = "Repondre avec :white_check_mark: ou :x:"
        }

        if (msg == "") {
            throw "Message vide !"
        }
        
        var embed = new Discord.RichEmbed()
            .setTitle(msg)
            .setDescription(emoteDesc)
            .setColor("#FF0200")
            .setFooter("Message créé par " + message.author.username)
            .setTimestamp()
        message.channel.send(embed)
            .then(function (message) {
                reaction(message, emote)
                message.pin()
            }).catch(function (err) {
                message.channel.send("" + err)
            })
    } catch (err) {
        var embed = new Discord.RichEmbed()
            .setTitle("Erreur !")
            .setDescription("Une erreur est survenue. Contactez un developpeur pour corriger ce probleme : " + err)
        message.channel.send(embed)
    }
}

async function reaction(message, emote) {
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
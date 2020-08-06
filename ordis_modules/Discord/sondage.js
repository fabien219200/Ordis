const Discord = require('discord.js')

module.exports = {
    name: 'Sondage',
    description: 'Makes a survey',
    async execute(message) {
        try {
            if (message.content.split(" ")[1].startsWith("-")) {
                var emote = message.content.split("-")[1].split(" ")
                console.log(emote)
                var msg = message.content.split("-").slice(2).join(" ").trim()
                var emoteDesc = "Merci de réagir avec "
                for (var i = 0; i < emote.length; i++) {
                    if (emote[i] == "") {
                        emote.splice(i, 1)
                        i--
                    } else {
                        emote[i] = emote[i].replace(/<*:\d*>*/g, "")
                        if (message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].replace(/:/, "").toLowerCase())) {
                            console.log(message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].toLowerCase()))
                            emoteDesc = emoteDesc + " " + message.guild.emojis.find(emoji => emoji.name.toLowerCase() === emote[i].replace(/:/, "").toLowerCase())
                        } else {
                            emoteDesc = emoteDesc + emote[i]
                        }
                    }
                }
            } else {
                var msg = message.content.split(" ").slice(1).join(" ").trim()
                var emoteDesc = "Repondre avec :white_check_mark: ou :x:"
            }

            if (msg == "") {
                throw "Message vide !"
            }
            if (emoteDesc == "Merci de réagir avec ") {
                throw "Emojis non spécifiés"
            }

            var embed = new Discord.MessageEmbed()
                .setTitle("Message créé par " + message.author.username)
                .setDescription("" + msg + "\n\n*" + emoteDesc + "*")
                .setFooter("PS -> Pour toute suggestion sur la mise en forme ou l'apparence des sondages, veuillez vous referer au salon #proposition-commandes.")
                .setTimestamp()
                .setColor("#FF0200")
            message.channel.send(embed)
                .then(function (message) {
                    reaction(message, emote)
                    //message.pin()
                }).catch(function (err) {
                    console.log(err)
                    message.channel.send("" + err)
                })
        } catch (err) {
            var embed = new Discord.MessageEmbed()
                .setTitle("Erreur !")
                .setDescription("Une erreur est survenue. Contactez un developpeur pour corriger ce probleme : " + err)
            message.channel.send(embed)
        }
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
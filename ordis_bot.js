const Discord = require('discord.js')
const bot = new Discord.Client()
bot.discordCommands = new Discord.Collection();
bot.warframeCommands = new Discord.Collection();

const axios = require('axios')
const fs = require('fs')

var config
var globalGuild

try {
    config = require('./configLocal')
    globalGuild = '477475842243428372'
} catch {
    try {
        config = require('./config')
        globalGuild = '623223246984052756'
    } catch (e) {
        console.error(e)
    }
}

const discordCommands = fs.readdirSync('./ordis_modules/Discord').filter(file => file.endsWith('.js'))
const warframeCommands = fs.readdirSync('./ordis_modules/Warframe').filter(file => file.endsWith('.js'))

for (const file of discordCommands) {
    const command = require(`./ordis_modules/Discord/${file}`);
    bot.discordCommands.set(command.name.toLowerCase(), command);
}

for (const file of warframeCommands) {
    const command = require(`./ordis_modules/Warframe/${file}`);
    bot.warframeCommands.set(command.name.toLowerCase(), command);
}

const rss = require('./Ressources/rss')
const lives = require('./Ressources/lives')

const event = require('./ordis_modules/Discord/event')

const prefixWarframe = "/"
const prefixDiscord = "!"

var tabEmbeds = []


bot.on('ready', () => {
    console.log("je suis connecté")
    //console.log(bot.guilds.cache)
    bot.user.setActivity(prefixDiscord + "info", { type: "WATCHING" })
    setInterval(cetusState, 60000)
    setInterval(function () { rss.rssFeed(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "patch-notes")) }, 300000)
    setInterval(function () { lives.checkLive(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "lives")) }, 60000)
    event.getEmbededMessages(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "events"))
})

function cetusState() {
    var message
    axios.get('https://api.warframestat.us/pc/cetusCycle')
        .then((response) => {
            if (response.data.isDay) {
                message = "☀: " + response.data.shortString.split(" ")[0] + " | "
            } else {
                message = "🌑: " + response.data.shortString.split(" ")[0] + " | "
            }
            axios.get('https://api.warframestat.us/pc/earthCycle')
                .then((response2) => {
                    if (response2.data.isDay) {
                        message = message + "☀(T): " + response2.data.timeLeft.split("m")[0] + "m"
                    } else {
                        message = message + "🌑(T): " + response2.data.timeLeft.split("m")[0] + "m"
                    }
                    bot.user.setActivity(message, { type: "WATCHING" })
                }).catch((err) => {
                    console.error("err dans cetusState earthCycle => " + err.message)
                })
        }).catch((err) => {
            console.error("err dans cetusState cetusCycle => " + err.message)
        })
}



bot.on('message', message => {

    if (message.content.toLowerCase().startsWith('salut ordis')) {
        message.reply("Salut cher ami")
    }

    if (message.content.startsWith(prefixDiscord) && !message.author.bot) {

        const discordArgs = message.content.slice(1).split(/ +/)
        const discordCommandName = discordArgs.shift().toLowerCase()
        //------------------------
        // console.log("Discord")
        // console.log(discordCommandName)
        // console.log(discordArgs)
        //------------------------
        if (!bot.discordCommands.has(discordCommandName)) return

        const discordCommand = bot.discordCommands.get(discordCommandName.toLowerCase())

        try {
            discordCommand.execute(message, discordArgs)
        } catch (e) {
            message.reply("Error : " + e)
        }
    }

    //----------------------------------------------------------------------------------------


    if (message.content.startsWith(prefixWarframe) && !message.author.bot) {

        const warframeArgs = message.content.slice(1).split(/ +/)
        const warframeCommandName = warframeArgs.shift().toLowerCase()
        //------------------------
        // console.log("Warframe")
        // console.log(warframeCommandName)
        // console.log(warframeArgs)
        //------------------------
        if (!bot.warframeCommands.has(warframeCommandName)) return

        const warframeCommand = bot.warframeCommands.get(warframeCommandName.toLowerCase())

        try {
            warframeCommand.execute(message, warframeArgs)
        } catch {
            message.reply("Error")
        }
    }

})


bot.on('raw', event => {
    var eventName = event.t
    if (eventName == 'MESSAGE_REACTION_ADD') {
        if (event.d.channel_id === '594550466109636609') {
            if (bot.channels.get(event.d.channel_id).messages.has(event.d.message_id)) {
                return
            } else {
                bot.channels.get(event.d.channel_id).messages.fetch(event.d.message_id)
                    .then(msg => {
                        var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
                        var user = bot.users.get(event.d.user_id)
                        bot.emit('messageReactionAdd', msgReaction, user)
                    })
            }
        }
    }

    if (eventName == 'MESSAGE_REACTION_REMOVE') {
        if (event.d.channel_id === '594550466109636609') {
            if (bot.channels.get(event.d.channel_id).messages.has(event.d.message_id)) {
                return
            } else {
                bot.channels.get(event.d.channel_id).messages.fetch(event.d.message_id)
                    .then(msg => {
                        var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
                        var user = bot.users.get(event.d.user_id)
                        bot.emit('messageReactionRemove', msgReaction, user)
                    })
            }
        }
    }
})

bot.on('voiceStateUpdate', (oldState, newState) => {
    console.log(oldState)
    if (newState.channel != null) {
        if (newState.channel.id == "623542114017345606") {
            bot.guilds.cache.find(guild => guild.id == globalGuild).channels.create(newState.member.user.username, {
                type: "voice",
            }).then(newVocalChannel => {
                newVocalChannel.setParent("Vocal")
                newState.member.edit({ channel: newVocalChannel })
            })
        }
    }

    if (oldState.channel != null) {
        if (oldState.channel.id != "623542114017345606" && oldState.channel.members.size == 0) {
            oldState.channel.delete()
        }
    }
})


bot.on('messageReactionAdd', (reaction, user) => {
    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase())
    var role_membre = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == "membres")
    if (role) {
        var member = reaction.message.guild.members.cache.find(member => member.id == user.id)
        if (member) {
            member.addRole(role.id)
            if (!member.roles.cache.find(role => role.name.toLowerCase() == "membres")) {
                member.addRole(role_membre.id)
            }
        }
    }
})

bot.on('messageReactionRemove', (reaction, user) => {
    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase())
    if (role) {
        var member = reaction.message.guild.members.cache.find(member => member.id == user.id)
        if (member) {
            member.removeRole(role.id)
        }
    }
})

bot.on("guildMemberRemove", member => {
    member.guild.channels.cache.find("name", "bienvenue").send(member + " vient de quitter le serveur :cry:. On ne l'oubliera jamais !\nIl etait un précieux partenaire :heart: !")
})

bot.login(config.login)

/**
 * Returns the message with an uppercase at the beginning of each word.
 * 
 * @param {string} string The original string.
 * @param  {string} joiner The string used to join each word of the original string.
 * @returns {string} The message with an uppercase to each word.
 */
module.exports.majuscule = function (string, joiner) {
    var words = string.split(" ")
    for (i = 0; i < words.length; i++) {
        var letter = words[i].split("")
        letter[0] = letter[0].toUpperCase()
        words[i] = letter.join("")
    }
    var msg = words.join(joiner)
    return msg
}

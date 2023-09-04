const Discord = require('discord.js')

const bot = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildVoiceStates,        
        Discord.GatewayIntentBits.GuildPresences,        
    ]
})


const axios = require('axios')
const fs = require('fs')
require('dotenv').config()

bot.commands = new Discord.Collection();
globalGuild = '350727122320359424'

const discordCommands = fs.readdirSync('./ordis_modules/Discord').filter(file => file.endsWith('.js'))
const warframeCommands = fs.readdirSync('./ordis_modules/Warframe').filter(file => file.endsWith('.js'))

for (const file of discordCommands) {
    const command = require(`./ordis_modules/Discord/${file}`);
    bot.commands.set(command.name.toLowerCase(), command);
}

for (const file of warframeCommands) {
    const command = require(`./ordis_modules/Warframe/${file}`);
    bot.commands.set(command.name.toLowerCase(), command);
}

const rss = require('./Ressources/rss')
const lives = require('./Ressources/lives')
const event = require('./ordis_modules/Discord/event')


bot.on('ready', () => {
    console.log("je suis connecté")
    //console.log(bot.guilds.cache)
    bot.user.setActivity("Initialisation", { type: Discord.ActivityType.Custom })
    setInterval(cetusState, 60000)
    setInterval(function () { rss.rssFeed(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "patch-notes")) }, 300000)
    setInterval(function () { lives.checkLive(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "lives")) }, 300000)
    //event.getEmbededMessages(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "events"))
})

function cetusState() {
    var message = "Cetus => "
    axios.get('https://api.warframestat.us/pc/cetusCycle')
        .then((response) => {
            if (response.data.isDay) {
                message += `☀:  ${(response.data.timeLeft.includes("m") ? response.data.timeLeft.match(/((\d*h )*(\d*m)*)/)[0] : response.data.timeLeft)}`
            } else {
                message += `🌑:  ${(response.data.timeLeft.includes("m") ? response.data.timeLeft.match(/((\d*h )*(\d*m)*)/)[0] : response.data.timeLeft)}`
            }
            bot.user.setActivity(message, { type: Discord.ActivityType.Custom })
        }).catch((err) => {
            console.error("err dans cetusState => " + err.message)
        })
}


bot.on(Discord.Events.InteractionCreate, async interaction => {
    // If the interaction isn't a slash command, return
    if (!interaction.isCommand()) return;
    console.log(interaction)
    if (interaction.commandName != "clear") {
        await interaction.deferReply()
    }
    try {
        bot.commands.get(interaction.commandName).execute(interaction)
    } catch (e) {
        console.log(e)
    }
})

// //PB DE CACHE
// bot.on('raw', event => {
//     var eventName = event.t
//     //console.log(event)
//     if (eventName == 'MESSAGE_REACTION_ADD') {
//         if (event.d.channel_id === '616684719710404645') {
//             console.log(bot.channels.cache.get(event.d.channel_id).messages)
//             if (bot.channels.cache.get(event.d.channel_id).messages.cache.has(event.d.message_id)) {
//                 return
//             } else {
//                 bot.channels.cache.get(event.d.channel_id).messages.fetch(event.d.message_id)
//                     .then(msg => {
//                         var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
//                         var user = bot.users.get(event.d.user_id)
//                         bot.emit('messageReactionAdd', msgReaction, user)
//                     })
//             }
//         }
//     }

//     if (eventName == 'MESSAGE_REACTION_REMOVE') {
//         if (event.d.channel_id === '616684719710404645') {
//             if (bot.channels.cache.get(event.d.channel_id).messages.cache.has(event.d.message_id)) {
//                 return
//             } else {
//                 bot.channels.cache.get(event.d.channel_id).messages.cache.fetch(event.d.message_id)
//                     .then(msg => {
//                         var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
//                         var user = bot.users.get(event.d.user_id)
//                         bot.emit('messageReactionRemove', msgReaction, user)
//                     })
//             }
//         }
//     }
// })

bot.on('voiceStateUpdate', async (oldState, newState) => {
    //console.log(oldState)
    if (newState.channel != null) {
        console.log("channel not null")
        if (newState.channel.name == "Creation de salon") {
            console.log("channel name is 'Creation de salon'")
            newState.guild.channels.create({
                name: newState.member.user.username, type: Discord.ChannelType.GuildVoice,
            }).then(newVocalChannel => {
                console.log("vocal created")
                newVocalChannel.setParent(newState.guild.channels.cache.find(channel => channel.name == "Creation de salon").parent)
                    .then(() => {
                        console.log("parent set")
                        newState.member.edit({ channel: newVocalChannel })
                        console.log("user state set")
                    }).catch(e => {
                        console.log(e)
                    })
            }).catch(e => {
                console.log(e)
            })
        }
    }

    if (oldState.channel != null) {
        if (oldState.channel.name != "Creation de salon" && oldState.channel.members.size == 0) {
            oldState.channel.delete()
        }
    }
})


bot.on('messageReactionAdd', (reaction, user) => {
    console.log("Add role initiated !")
    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase())
    var role_kalliance = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == "kalliance")
    if (role) {
        var member = reaction.message.guild.members.cache.find(member => member.id == user.id)
        if (member) {
            member.addRole(role.id)
            if (!member.roles.cache.find(role => role.name.toLowerCase() == "kalliance")) {
                member.addRole(role_kalliance.id)
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

bot.login(process.env.BOT_TOKEN)

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

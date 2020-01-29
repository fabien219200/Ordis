const Discord = require('discord.js')
const bot = new Discord.Client()
const axios = require('axios')

const config = require('./config')

const fandom = require('./ordis_modules/Warframe/fandom')
const infoBot = require('./ordis_modules/Discord/infoBot')
const sondage = require('./ordis_modules/Discord/sondage')
const clear = require('./ordis_modules/Discord/clear')
const cetus = require('./ordis_modules/Warframe/cetus')
const prix = require('./ordis_modules/Warframe/prix')
const fissures = require('./ordis_modules/Warframe/fissures')
const nightwaves = require('./ordis_modules/Warframe/nightwaves')
const sortie = require('./ordis_modules/Warframe/sortie')
const voidTrader = require('./ordis_modules/Warframe/voidTrader')
const invasions = require('./ordis_modules/Warframe/invasions')
const search = require('./ordis_modules/Warframe/search')
const userInfo = require('./ordis_modules/Discord/userInfo')
const sentient = require('./ordis_modules/Warframe/sentient')
const rss = require('./ordis_modules/Warframe/rss')


const prefixWarframe = "/"
const prefixDiscord = "!"

var tabEmbeds = []


bot.on('ready', () => {
    console.log("je suis connecté")
    bot.user.setActivity(prefixDiscord + "info", { type: "WATCHING" })
    setInterval(cetusState, 60000)
    setInterval(function () { sentient.tracker(bot.guilds.find(guild => guild.name == "Warframe Kalldrax").channels.find(channel => channel.name == "vaisseau-sentients")) }, 60000)
    setInterval(function () { rss.rssFeed("", bot.guilds.find(guild => guild.name == "Warframe Kalldrax").channels.find(channel => channel.name == "patch-notes")) }, 300000)
})

function cetusState() {
    var message
    //bot.user.setActivity("TEST1")
    axios.get('https://api.warframestat.us/pc/cetusCycle')
        .then((response) => {
            if (response.data.isDay) {
                message = "☀: " + response.data.timeLeft.split("m")[0] + "m | "
            } else {
                message = "🌑: " + response.data.timeLeft.split("m")[0] + "m | "
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
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })
}



bot.on('message', message => {

    if (message.content.startsWith('salut Ordis') | message.content.startsWith('Salut Ordis')) {
        message.reply("Salut cher ami")
    }

    if (message.content.startsWith(prefixDiscord + "info")) {
        infoBot.info(message)
    }

    if (message.content.startsWith(prefixDiscord + "sondage")) { //TODO resoudre pb .then
        sondage.question(message)
    }

    if (message.content.startsWith(prefixWarframe + "wiki")) {
        fandom.wiki(message)
    }

    if (message.content.startsWith(prefixDiscord + "clear")) {
        clear.suppr(message)
    }

    if (message.content.startsWith(prefixWarframe + "cetus")) {
        cetus.status(message)
    }

    if (message.content.startsWith(prefixWarframe + "prix")) { //TODO finir
        prix.platinum(message)
    }

    if (message.content.startsWith(prefixWarframe + "fissures")) {
        fissures.liste(message)
    }

    if (message.content.startsWith(prefixWarframe + "nightwaves")) {
        nightwaves.liste(message)
    }

    if (message.content.startsWith(prefixWarframe + "sortie")) {
        sortie.liste(message)
    }
    
    if(message.content.startsWith(prefixWarframe + "baro")){
        voidTrader.liste(message)
    }
    
    if(message.content.startsWith(prefixWarframe + "invasions")){
        invasions.liste(message)
    }
    
    if (message.content.startsWith(prefixWarframe + "search")) {
        search.infos(message)
    }

    if (message.content.startsWith(prefixDiscord + "user")) {
    userInfo.info(message)
    }

    if (message.content.startsWith(prefixWarframe + "rss")) {
        rss.rssFeed(message)
    }

//     if (message.embeds.length != 0) {
//         tabEmbeds.push(message.embeds[message.embeds.length - 1])
//     }
//     console.log(tabEmbeds)

})

bot.on('raw', event => {
    var eventName = event.t
    if (eventName == 'MESSAGE_REACTION_ADD') {
        if (event.d.channel_id === '594550466109636609') {
            if (bot.channels.get(event.d.channel_id).messages.has(event.d.message_id)) {
                return
            } else {
                bot.channels.get(event.d.channel_id).fetchMessage(event.d.message_id)
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
                bot.channels.get(event.d.channel_id).fetchMessage(event.d.message_id)
                    .then(msg => {
                        var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id)
                        var user = bot.users.get(event.d.user_id)
                        bot.emit('messageReactionRemove', msgReaction, user)
                    })
            }
        }
    }
})

bot.on('messageReactionAdd', (reaction, user) => {
    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
    var role_membre = reaction.message.guild.roles.find(role => role.name.toLowerCase() == "membres")
    if (role) {
        var member = reaction.message.guild.members.find(member => member.id == user.id)
        if (member) {
            member.addRole(role.id)
            if (!member.roles.find(role => role.name.toLowerCase() == "membres")) {
                member.addRole(role_membre.id)
            }
        }
    }
})

bot.on('messageReactionRemove', (reaction, user) => {
    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
    if (role) {
        var member = reaction.message.guild.members.find(member => member.id == user.id)
        if (member) {
            member.removeRole(role.id)
        }
    }
})

bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "bienvenue").send(member + " vient de quitter le serveur :cry:. On ne l'oubliera jamais !\nIl etait un précieux partenaire :heart: !")
})

bot.login(config.login)


module.exports.majuscule = function (message) {
    var words = message.split(" ")
    for (i = 0; i < words.length; i++) {
        var letter = words[i].split("")
        letter[0] = letter[0].toUpperCase()
        words[i] = letter.join("")
    }
    var msg = words.join(" ")
    console.log(msg)
    return msg
}

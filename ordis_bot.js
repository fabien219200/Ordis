const Discord = require('discord.js')
const bot = new Discord.Client()
const axios = require('axios')
const xmlParser = require('xml2js')

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
const primes = require('./ordis_modules/Warframe/primes')



const prefixWarframe = "/"
const prefixDiscord = "!"

var tabEmbeds = []
var linkActualPost = "Initialisation"


bot.on('ready', () => {
    console.log("je suis connecté")
    bot.user.setActivity(prefixDiscord + "info", { type: "WATCHING" })
    setInterval(cetusState, 60000)
    setInterval(function () { sentient.tracker(bot.guilds.find(guild => guild.name == "Warframe Kalldrax").channels.find(channel => channel.name == "vaisseau-sentients")) }, 60000)
    setInterval(function () {
        axios.get("https://forums.warframe.com/forum/3-pc-update-notes.xml/")
            .then(response => {
                xmlParser.parseString(response.data, (err, result) => {
                    var data = result.rss.channel[0]
                    var maxDate = 0
                    for (var i = 0; i < data.item.length; i++) {
                        if (new Date(data.item[i].pubDate[0]).valueOf() > maxDate) {
                            maxDate = new Date(data.item[i].pubDate[0]).valueOf()
                            var indexLastPost = i
                        }
                    }
                    topicLastPost = data.item[indexLastPost]
                    var linkLastPost = topicLastPost.link[0]

                    var desc = topicLastPost.description[0].replace(/<[^>]*>?/gm, '').replace(/(\n|\t)+/gm, '\n').trim()

                    if (linkLastPost != linkActualPost) {
                        bot.guilds.find(guild => guild.name == "Warframe Kalldrax").channels.find(channel => channel.name == "patch-notes").send("Liens differents : Dernier lien => " + linkActualPost + " | Lien actuel => " + linkLastPost)
                        if (desc.split('').length > 2048) {
                            desc = desc.split('').slice(0, 2037).join('') + " **[...]**"
                        }
                        var embed = new Discord.RichEmbed()
                            .setTitle("**__Nouveau Patch Note__** : " + topicLastPost.title[0])
                            .setURL(topicLastPost.link[0])
                            .setDescription(desc)
                            .setTimestamp(topicLastPost.pubDate[0])
                        bot.guilds.find(guild => guild.name == "Warframe Kalldrax").channels.find(channel => channel.name == "patch-notes").send(embed)
                        linkActualPost = topicLastPost.link[0]
                    }
                })
            })
    }, 300000)
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

    if (message.content.startsWith(prefixDiscord + "sondage")) {
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

    if (message.content.startsWith(prefixWarframe + "prix")) {
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

    if (message.content.startsWith(prefixWarframe + "baro")) {
        voidTrader.liste(message)
    }

    if (message.content.startsWith(prefixWarframe + "invasions")) {
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

    if (message.content.startsWith(prefixWarframe + "prime")) {
        primes.liste(message)
    }

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

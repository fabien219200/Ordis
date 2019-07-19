const Discord = require('discord.js')
const bot = new Discord.Client()
const axios = require('axios')
const fandom = require('./ordis_modules/fandom')
const infoBot = require('./ordis_modules/infoBot')
const sondage = require('./ordis_modules/sondage')
const clear = require('./ordis_modules/clear')
const cetus = require('./ordis_modules/cetus')
const prix = require('./ordis_modules/prix')
const fissures = require('./ordis_modules/fissures')
const nightwaves = require('./ordis_modules/nightwaves')
const sortie = require('./ordis_modules/sortie')
const voidTrader = require('./ordis_modules/voidTrader')

const prefix = "//"

bot.on('ready', () => {
    console.log("je suis connecté")
    bot.user.setActivity(prefix + "info", { type: "WATCHING" })
})


bot.on('message', message => {

    if (message.content.startsWith('salut Ordis') | message.content.startsWith('Salut Ordis')) {
        message.reply("Salut cher ami")
    }

    if (message.content.startsWith(prefix + "info")) {
        infoBot.info(message)
    }

    if (message.content.startsWith(prefix + "sondage")) { //TODO resoudre pb .then
        sondage.question(message)
    }

    if (message.content.startsWith(prefix + "wiki")) {
        fandom.wiki(message)
    }

    if (message.content.startsWith(prefix + "clear")) {
        clear.suppr(message)
    }

    if (message.content.startsWith(prefix + "cetus")) {
        cetus.status(message)
    }

    if (message.content.startsWith(prefix + "prix")) { //TODO finir
        prix.platinum(message)
    }

    if (message.content.startsWith(prefix + "fissures")) {
        fissures.liste(message)
    }

    if (message.content.startsWith(prefix + "nightwaves")) {
        nightwaves.liste(message)
    }

    if (message.content.startsWith(prefix + "sortie")) {
        sortie.liste(message)
    }
    
    if(message.content.startsWith(prefix + "baro")){
        voidTrader.liste(message)
    }

    if (message.content.startsWith(prefix + "drops")) { //TODO 
        axios.get("https://api.warframestat.us/drops/search/survival")
            .then((response) => {
                console.log(response.data[1000])
            })
    }

})

bot.on('raw', event => {
    var eventName = event.t
    if (eventName == 'MESSAGE_REACTION_ADD') {
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

    if (eventName == 'MESSAGE_REACTION_REMOVE') {
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
})

bot.on('messageReactionAdd', (reaction, user) => {
    switch (reaction.emoji.name) {
        case "TheDivision":
            var roleName = "The Division 2"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.addRole(role.id)
                }
            }
            break;

        case "RocketLeague":
            var roleName = "Rocket League"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.addRole(role.id)
                }
            }
            break;

        case "Warframe":
            var roleName = "Warframe"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.addRole(role.id)
                }
            }
            break;

        case "Trine":
            var roleName = "Trine"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.addRole(role.id)
                }
            }
            break;

        case "LoL":
            var roleName = "League of Legends"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.addRole(role.id)
                }
            }
            break;

        case "Satisfactory":
            var roleName = "Satisfactory"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.addRole(role.id)
                }
            }
            break;

        case "Dauntless":
            var roleName = "Dauntless"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.addRole(role.id)
                }
            }
            break;
    }
})

bot.on('messageReactionRemove', (reaction, user) => {
    //console.log(reaction)
    switch (reaction.emoji.name) {
        case "TheDivision":
            var roleName = "The Division 2"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.removeRole(role.id)
                }
            }
            break;

        case "RocketLeague":
            var roleName = "Rocket League"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.removeRole(role.id)
                }
            }
            break;

        case "Warframe":
            var roleName = "Warframe"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.removeRole(role.id)
                }
            }
            break;

        case "Trine":
            var roleName = "Trine"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.removeRole(role.id)
                }
            }
            break;

        case "LoL":
            var roleName = "League of Legends"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.removeRole(role.id)
                }
            }
            break;

        case "Satisfactory":
            var roleName = "Satisfactory"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.removeRole(role.id)
                }
            }
            break;

        case "Dauntless":
            var roleName = "Dauntless"
            var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
            if (role) {
                var member = reaction.message.guild.members.find(member => member.id == user.id)
                if (member) {
                    member.removeRole(role.id)
                }
            }
            break;
    }
})

bot.on('guildMemberAdd', (member) => {
    var role = member.guild.roles.find(role => role.name.toLowerCase() == "membres")
    member.addRole(role.id)
})

bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "bienvenue").send(member + " vient de quitter le serveur :cry:. On ne l'oubliera jamais !\nIl etait un valeureux Tenno !")
})

bot.login(process.env.BOT_TOKEN)


module.exports.majuscule = function(originalMessage, msg) {
    var array = originalMessage.split(" ")
    for (i = 1; i < array.length; i++) {
        if (array[i] != "") {
            array[i] = array[i].toLowerCase()
            var char = array[i].split("")
            char[0] = char[0].toUpperCase()
            for (j = 0; j < char.length; j++) {
                msg = msg + char[j]
                if (i != array.length - 1) {
                    if (j == char.length - 1) {
                        msg = msg + " "
                    }
                }
            }
        }
    }
    return msg
}

const Discord = require('discord.js')

const emotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

var oldEmbedTab = []

module.exports = {
    name: 'Event',
    description: 'Generates an event',
    async execute(message, args) {


        //On recupere la liste de tous les events
        var events = message.content.replace(/!\w+ +/, "").replace(/ {2,}/g, " ")

        //Pour chaque event, on recupere la liste des parametres 
        var descMessage = ""
        var parametersCount = 0
        //
        events = events.split(/(?=(?: -(i|d))) | -h\d /g)

        //On creer un nouvel Embed
        var embed = new Discord.MessageEmbed()
            .setTitle("__Nouvel event : **" + events[0] + "**__")

        for (var j = 1; j < events.length; j = j + 2) {
            events.splice(j, 1)
            j = j - 1
        }

        if (events.find(element => element.startsWith("-d"))) {
            descMessage += "**Durée** => " + events.find(element => element.startsWith("-d")).slice(3) + "\n\n"
            parametersCount++
        }

        if (events.find(element => element.startsWith("-i"))) {
            descMessage += "**Fin d'inscription** => " + events.find(element => element.startsWith("-i")).slice(3) + "\n"
            var split = events.find(element => element.startsWith("-i")).split("-i ").join("").split(" ")
            console.log(split[0].match(/^(\d{2}\/\d{2}\/)(\d{4})$/))
            if (!split[0].match(/^(\d{2}\/\d{2}\/)(\d{4})$/) || !split[1].match(/^(\d{2}:)(\d{2})$/)) {
                message.channel.send("<@" + message.author + ">, merci de respecter le format JJ/MM/AAAA pour la date et HH:MM pour l'heure.\n*ex : 01/01/2020 12:00*")
                return
            }
            var date = split[0].split("/"), time = split[1].split(/:|h/)
            if (date.length != 3 || time.length != 2) {
                message.channel.send("<@" + message.author + ">, merci de respecter le format JJ/MM/AAAA pour la date et HH:MM pour l'heure.\n*ex : 01/01/2020 12:00*")
                return
            }
            var dateObj = new Date(date[2], parseInt(date[1] - 1), date[0], time[0], time[1]).valueOf()
            parametersCount++
        } else {
            message.channel.send("<@" + message.author + ">, merci de preciser une fin d'inscription avec le parametre '-i'.")
            return
        }

        embed.setDescription(descMessage)

        if (events.slice(parametersCount + 1).length == 0) {
            message.channel.send("<@" + message.author + ">, merci de specifier au moins un horaire avec le parametre '-h1'.")
            return
        }

        for (var j = parametersCount + 1; j < events.length; j++) {
            embed.addField("Horaire " + emotes[j - (parametersCount + 1)] + " : ", "```" + events[j] + "```", true)
        }
        //message.channel.send()
        message.channel.send(embed)
            .then(async function (sentMessage) {
                for (var i = 0; i < events.slice(parametersCount + 1).length; i++) {
                    await sentMessage.react(emotes[i])
                }
                setInterval(checkDate, 10000, message.channel, sentMessage.id, dateObj, sentMessage.embeds[0].fields)
            })
    }, async getEmbededMessages(channel) {
        oldEmbedTab = await channel.messages.fetch()
        oldEmbedTab = oldEmbedTab.filter(message => message.embeds.length > 0)
        console.log(oldEmbedTab)
        oldEmbedTab.forEach(embed => {
            var endSignIn = embed.embeds[0].description.split("**Fin d'inscription** => ").slice(1).toString()
            var split = endSignIn.split(" ")
            console.log(split)
            var date = split[0].split("/"), time = split[1].split(/:|h/)
            var dateObj = new Date(date[2], parseInt(date[1] - 1), date[0], time[0], time[1]).valueOf()
            console.log(dateObj)
            setInterval(checkDate, 10000, channel, embed.id, dateObj, embed.embeds[0].fields)
        })
    }

}

async function checkDate(channel, messageID, date, horaires) {
    console.log(date - Date.now())
    if (date <= Date.now()) {
        var message = channel.messages.cache.find(message => message.id == messageID)
        var reactions = message.reactions.cache.map(element => element)
        var title = "**Event : " + message.embeds[0].title.split("__Nouvel event : **").join("").split("**__").join("") + "**"
        var messageToSend = ""
        for (var i = 0; i < reactions.length; i++) {
            var users = await reactions[i].users.fetch()
            users = users.filter(user => user.username != "Ordis" || user.username != "BOT TEST").map(element => element)
            if (users.length == 0) {
                continue
            }
            messageToSend += "\n" + horaires[i].value
            users.forEach(user => {
                messageToSend += "<@" + user.id + ">, "
            })
            messageToSend = messageToSend.slice(0, -2)
        }
        if (messageToSend == "") {
            channel.send("Aucune réaction n'a été enregistré")
        } else {
            channel.send(title + messageToSend)
        }
        message.delete()
        clearInterval(this)
    }
}
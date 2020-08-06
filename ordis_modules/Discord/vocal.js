//const Discord = require('discord.js')
//PB : user.voice.channel => lecture seule (je crois)

var intervals = []

module.exports = {
    name: 'Vocal',
    description: 'Sets a new name and a limit for a channel',
    async execute(message) {
        var user = message.guild.members.cache.find(member => member.user.username.toLowerCase() == message.author.username.toLowerCase())
        let isAdaptable = false

        //console.log(user.voice.channel.id)
        console.log(message.guild.channels.cache.find(channel => channel.id == user.voice.channel.id))

        if (user.voice.channel != null) {
            let vocalChannel = message.guild.channels.cache.find(channel => channel.id == user.voice.channel.id)
            var args = message.content.replace(/!\w+ +/, "").replace(/ +/, " ").split(" ")

            if (args[1] == "-a" && !isNaN(parseInt(args[0].trim()))) {
                isAdaptable = true
                vocalChannel = await vocalChannel.setUserLimit(parseInt(args[0].trim()))
                vocalChannel = await vocalChannel.setName(args.slice(2).join(" "))
            } else if (args[0] == "-a") {
                isAdaptable = true
                vocalChannel = await vocalChannel.setUserLimit(vocalChannel.members.size)
                vocalChannel = await vocalChannel.setName(args.slice(1).join(" "))
            } else if (!isNaN(parseInt(args[0].trim()))) {
                vocalChannel = await vocalChannel.setUserLimit(args[0].trim())
                console.log(args.slice(1).join(" "))
                vocalChannel = await vocalChannel.setName(args.slice(1).join(" "))
            } else {
                vocalChannel = await vocalChannel.setUserLimit(0)
                vocalChannel = await vocalChannel.setName(args.join(" "))
            }

            for (var i = 0; i < intervals.length; i++) {
                if (intervals[i][1] == vocalChannel.id) {
                    clearInterval(intervals[i][0])
                }
            }
            intervals.push([setInterval(function () { checkVocal(vocalChannel.id, isAdaptable, message) }, 10000), vocalChannel.id])
        }


    }
}

async function checkVocal(vocalId, isAdaptable, message) {
    let vocalChannel = message.guild.channels.cache.find(channel => channel.id == vocalId)
    console.log(vocalChannel)
    console.log(isAdaptable)


    if (isAdaptable) {
        if (vocalChannel.members.size < vocalChannel.userLimit) {
            vocalChannel = await vocalChannel.setUserLimit(vocalChannel.members.size)
        }
    }

    if ((vocalChannel.members.size == 0) || ((vocalChannel.members.size <= 1) && isAdaptable)) {
        vocalChannel = await vocalChannel.setName("Vocal")
        vocalChannel = await vocalChannel.setUserLimit(0)
        for (var i = 0; i < intervals.length; i++) {
            if (intervals[i][1] == vocalId) {
                clearInterval(intervals[i][0])
                intervals.splice(i, 1)
            }
        }
    }
}
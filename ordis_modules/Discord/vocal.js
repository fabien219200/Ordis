//const Discord = require('discord.js')

var intervals = []

module.exports.accessController = function (message) {
    var user = message.guild.members.find(member => member.user.username.toLowerCase() == message.author.username.toLowerCase())
    let isAdaptable = false

    if (user.voiceChannel != undefined) {
        let vocalChannel = user.voiceChannel
        console.log(vocalChannel)
        var args = message.content.replace(/!\w+ +/, "").replace(/ +/, " ").split(" ")

        console.log(isNaN(parseInt(args[0])))

        if (args[1] == "-a" && !isNaN(parseInt(args[0].trim()))) {
            isAdaptable = true
            vocalChannel.setUserLimit(parseInt(args[0].trim()))
                .then(() => {
                    vocalChannel.setName(args.slice(2).join(" "))
                })
        } else if (args[0] == "-a") {
            isAdaptable = true
            vocalChannel.setUserLimit(vocalChannel.members.size)
                .then(() => {
                    vocalChannel.setName(args.slice(1).join(" "))
                })
        } else if (!isNaN(parseInt(args[0].trim()))) {
            vocalChannel.setUserLimit(args[0].trim())
                .then(() => {
                    vocalChannel.setName(args.slice(1).join(" "))
                })
        } else {
            vocalChannel.setUserLimit(0)
                .then(() => {
                    vocalChannel.setName(args.join(" "))
                })
        }

        for (var i = 0; i < intervals.length; i++) {
            if (intervals[i][1] == vocalChannel.id) {
                clearInterval(intervals[i][0])
            }
        }
        intervals.push([setInterval(function () { checkVocal(vocalChannel.id, isAdaptable) }, 60000), vocalChannel.id])
    }

    function checkVocal(vocalId, isAdaptable) {
        console.log(vocalId)
        console.log(isAdaptable)
        let vocalChannel = message.guild.channels.find(channel => channel.id == vocalId)
        if (isAdaptable) {
            console.log(vocalChannel)
            if (vocalChannel.members.size < vocalChannel.userLimit) {
                vocalChannel.setUserLimit(vocalChannel.members.size)
            }
        }

        if ((vocalChannel.members.size == 0) || ((vocalChannel.members.size <= 1) && isAdaptable)) {
            vocalChannel.setName("Vocal")
                .then(() => {
                    vocalChannel.setUserLimit(0)
                        .then(() => {
                            for (var i = 0; i < intervals.length; i++) {
                                if (intervals[i][1] == vocalId) {
                                    clearInterval(intervals[i][0])
                                    intervals.splice(i, 1)
                                }
                            }
                        })

                })
        }
    }
}
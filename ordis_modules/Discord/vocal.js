//const Discord = require('discord.js')
//PB : user.voice.channel => lecture seule (je crois)

var intervals = []

module.exports = {
    name: 'Vocal',
    description: 'Sets a new name and/or a limit for a channel',
    async execute(message) {
        var user = message.guild.members.cache.find(member => member.user.username.toLowerCase() == message.author.username.toLowerCase())

        if (user.voice.channel != null) {
            let vocalChannel = message.guild.channels.cache.find(channel => channel.id == user.voice.channel.id)
            var args = message.content.replace(/!\w+ +/, "").replace(/ +/, " ").split(" ")

            if (!isNaN(parseInt(args[0].trim()))) {
                vocalChannel = await vocalChannel.setUserLimit(args[0].trim())
                if (args[1]) {
                    vocalChannel = await vocalChannel.setName(args.slice(1).join(" "))
                }
            } else if (true) {
                vocalChannel = await vocalChannel.setUserLimit(0)
                vocalChannel = await vocalChannel.setName(args.join(" "))
            }

        } else {
            message.reply("Veuillez utiliser cette commande dans un salon vocal !")
        }
    }

}

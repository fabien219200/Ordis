const Discord = require('discord.js')

module.exports = {
    name: 'GuildInfo',
    description: 'Gets guild infos',
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle("Info du bot")
            .setColor('#0101F2')
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/90px-Question_mark_alternate.svg.png")
            .setAuthor(message.author.tag, message.author.avatarURL)
            .addField("Nombre de membres sur le discord : ", message.guild.memberCount)
            .addField("Nombre de rôles : ", message.guild.roles.cache.size + " => " + message.guild.roles.cache.map(roles => "  " + roles.name))
            .setFooter(message.author.tag + ", vous êtes sur le salon " + message.channel.name)
            .setTimestamp()
        message.channel.send(embed)
    },
};

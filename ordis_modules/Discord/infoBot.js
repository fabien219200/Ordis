const Discord = require('discord.js')

module.exports = {
    name: 'GuildInfo',
    description: 'Gets guild infos',
    execute(interaction) {
        let embed = new Discord.MessageEmbed()
            .setTitle("Info du bot")
            .setColor('#0101F2')
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/90px-Question_mark_alternate.svg.png")
            .addField("Nombre de membres sur le discord : ", interaction.guild.memberCount)
            .addField("Nombre de rôles : " + interaction.guild.roles.cache.size, interaction.guild.roles.cache.map(roles => ":white_small_square:" + roles.name))
            .setFooter(interaction.member.user.tag + ", vous êtes sur le salon " + interaction.channel.name)
            .setTimestamp()
        interaction.editReply(embed)
    },
}
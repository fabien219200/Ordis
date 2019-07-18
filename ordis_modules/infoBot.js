const Discord = require('discord.js')

module.exports.info = function (message) {
    let embed = new Discord.RichEmbed()
        .setTitle("Info du bot")
        .setColor('#0101F2')
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/90px-Question_mark_alternate.svg.png")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("Pour voir toutes mes commandes, refererez-vous au google docs suivant : ", "https://docs.google.com/document/d/12dcfb8q3u0O6nMirGLv3KgONro0eTcFpO7vux3bS_Jw/edit?usp=sharing")
        .addField("Nombre de membres sur le discord : ", message.guild.memberCount)
        .addField("Nombre de rôles : ", message.guild.roles.size + " => " + message.guild.roles.map(roles => "  " + roles.name))
        .setFooter(message.author.tag + ", vous êtes sur le salon " + message.channel.name)
        .setTimestamp()
    message.channel.send(embed)
}
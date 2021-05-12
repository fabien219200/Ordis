const Discord = require('discord.js')

module.exports = {
    name: 'Info',
    description: 'Gets info',
    execute(interaction) {
        var authorUser = interaction.member

        if (interaction.options.find(option => option.name == "user")) {
            if (!authorUser.permissionsIn(interaction.channel).has("MANAGE_ROLES")) {
                interaction.reply("Vous n'avez pas la permission d'effectuer cette commande. Veuillez vous référer aux membres ayant la permission \"Gérer les roles\".")
                return
            }
            var option = interaction.options.find(option => option.name == "user").options.find(option => option.name == "user")
            var member = option.member
            var user = option.user
            if (member.presence.activities.length == 0) {
                var presence = "Ne joue actuellement a **aucun jeu**, ou l'utilisateur **ne l'affiche pas**."
            } else {
                var presence = "**" + user.presence.activities[0].name + "**\n" + user.presence.activities[0].details + "\n" + user.presence.activities[0].state
            }

            var date = new Date(member.joinedAt)
            var embed = new Discord.MessageEmbed()
                .setTitle("Informations de __" + member.displayName + "__")
                .setThumbnail(member.avatarURL)
                .addField("Pseudo original : ", user.tag)
                .addField("Roles : ", member.roles.cache.map(roles => ":white_small_square:" + roles.name))
                .addField("Rôle le plus élevé : ", member.roles.highest.name)
                //.addField("Dernier message envoyé : ", member.lastMessage || "**Aucun message envoyé pour le moment**")
                .addField("Date d'entrée sur le serveur : ", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
                .addField("Status : ", user.presence.status)
                .addField("Jeu : ", presence)
                .setFooter(user.tag + ", vous êtes sur le salon " + interaction.channel.name)

            interaction.editReply(embed)
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle("Info du bot")
                .setColor('#0101F2')
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/90px-Question_mark_alternate.svg.png")
                .addField("Nombre de membres sur le discord : ", interaction.guild.memberCount)
                .addField("Nombre de rôles : " + interaction.guild.roles.cache.size, interaction.guild.roles.cache.map(roles => ":white_small_square:" + roles.name))
                .setFooter(interaction.member.user.tag + ", vous êtes sur le salon " + interaction.channel.name)
                .setTimestamp()
            interaction.editReply(embed)
        }
    }
}
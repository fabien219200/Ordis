const Discord = require('discord.js')

module.exports.info = function (message) {
    var authorUser = message.guild.members.find(member => member.user.username.toLowerCase() == message.author.username.toLowerCase())
    if (!authorUser.roles.find(roles => roles.name.toLowerCase() == "moderateur")) {
        message.channel.send("Permission denied")
    } else {
        if (message.content.split(" ").slice(1).join(" ") == "") {
            var user = message.guild.members.find(member => member.user.username.toLowerCase() == message.author.username.toLowerCase())
        } else {
            var user = message.guild.members.find(member => member.displayName.toLowerCase() == message.content.split(" ").slice(1).join(" ").toLowerCase())
            if (!user) {
                user = message.guild.members.find(member => member.user.username.toLowerCase() == message.content.split(" ").slice(1).join(" ").toLowerCase())
            }
        }
        if (user) {
            console.log("\n\n")
            console.log(user)
            if (!user.user.lastMessage) {
                var lastMessageInfo = "**Aucun message envoyé pour le moment**"
            } else {
                var editsNumber = user.user.lastMessage.edits.length - 1
                var lastMessageInfo = '**Contenu** : "' + user.user.lastMessage.content + '"\n**Effacé** : ' + user.user.lastMessage.deleted + '\n**Epinglé** : ' + user.user.lastMessage.pinned + '\n**Nombre de modifications** : ' + editsNumber
            }
            if (!user.user.presence.game) {
                var presence = "Ne joue actuellement a **aucun jeu**, ou l'utilisateur **ne l'affiche pas**."
            } else {
                var presence = "**" + user.user.presence.game.name + "**\n" + user.user.presence.game.details + "\n" + user.user.presence.game.state
            }
            var date = new Date(user.joinedAt)
            var embed = new Discord.RichEmbed()
                .setTitle("Informations de " + user.displayName)
                .setThumbnail(user.user.avatarURL)
                .addField("Pseudo original : ", user.user.tag)
                .addField("Roles : ", user.roles.map(roles => ":white_small_square:" + roles))
                .addField("Rôle le plus élevé : ", user.highestRole)
                .addField("Dernier message envoyé : ", lastMessageInfo)
                .addField("Date d'entrée sur le serveur : ", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
                .addField("Status : ", user.user.presence.status)
                .addField("Jeu : ", presence)
                .setFooter(message.author.tag + ", vous êtes sur le salon " + message.channel.name)

            message.channel.send(embed)
        } else {
            message.channel.send("Le nom d'utilisateur est introuvable. Merci de verifier qu'il est bien **sur ce serveur Discord** et qu'il est **correctement orthographié**.")
        }
    }
}

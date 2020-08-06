//TODO test with message.delete after "await channel.messages.fetch({ limit: 1 })"

module.exports = {
    name: 'Clear',
    description: 'Clears messages',
    execute(message) {
        //On check s'il ne s'agit pas d'un message privé
        if (message.guild) {
            //On check si l'utilisateur a les permissions
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel.send("Vous n'avez pas la permission d'effectuer cette commande. Veuillez vous référer aux membres ayant la permission \"Gerer les messages\".")
            } else {
                //On recupere le nombre de messages a effacer
                var effacer = message.content.split(" ")
                //On verifie si le nombre specifié ne depasse pas 100. Si oui, on efface 100 et on recommence avec le meme nombre - 100
                if (parseInt(effacer[1]) > 99) {
                    message.channel.bulkDelete(100)
                    effacer[1] = effacer[1] - 100
                } else {
                    message.channel.bulkDelete(parseInt(effacer[1]) + 1)
                }
            }
        } else {
            message.channel.send("Vous n'etes actellement pas sur un serveur")
        }
    }
}
//TODO test with message.delete after "await channel.messages.fetch({ limit: 1 })"

module.exports = {
    name: 'Clear',
    description: 'Clears messages',
    async execute(interaction) {
        //On check s'il ne s'agit pas d'un message privé
        if (interaction.guild) {
            //On check si l'utilisateur a les permissions
            if (!interaction.member.permissionsIn(interaction.channel).has("MANAGE_MESSAGES")) {
                interaction.reply("Vous n'avez pas la permission d'effectuer cette commande. Veuillez vous référer aux membres ayant la permission \"Gerer les messages\".")
            } else {
                //On recupere le nombre de messages a effacer
                var nbDeleteRequest = interaction.options.find(option => option.name == "number").value
                //On verifie si le nombre specifié ne depasse pas 100. Si oui, on efface 100 et on recommence avec le meme nombre - 100
                var isError = false
                while (nbDeleteRequest > 99 && !isError) {
                    await interaction.channel.bulkDelete(100).catch(error => {
                        interaction.reply(`Une erreur est survenue pour la raison suivante : \n\`\`\`${error}\`\`\``)
                        isError = true
                    })
                    nbDeleteRequest = nbDeleteRequest - 100
                }
                if (!isError) {
                    await interaction.channel.bulkDelete(nbDeleteRequest).catch(error => {
                        interaction.reply(`Une erreur est survenue pour la raison suivante : \n\`\`\`${error}\`\`\``)
                        isError = true
                    })
                    if (!isError) {
                        interaction.reply(`${nbDeleteRequest} message(s) supprimé(s) !`)
                    }
                }
                // interaction.channel.messages.fetch({ limit: parseInt(nbDeleteRequest) + 1 })
                //     .then(messagesArray => {
                //         messagesArray.forEach(currentMessage => {
                //             currentMessage.delete()
                //         })
                //         //Return "Messages deleted"
                //     }).catch(err => {
                //         //Return "Deletion failed"
                //     })
            }
        } else {
            interaction.channel.send("Vous n'etes actellement pas sur un serveur")
        }
    }
}
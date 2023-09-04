const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'Cetus',
    description: 'Gets Cetus state',
    execute(interaction) {
        axios.get('https://api.warframestat.us/pc/cetusCycle')
            .then((response) => {
                var chaine = response.data.shortString.split(" ")
                if (response.data.isDay == true) {
                    let embed = new Discord.EmbedBuilder()
                        .setTitle("Cycle Cetus : **Jour**")
                        .setColor("#ffe387")
                        .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/3/32/OstronSyndicateFlag.png/revision/latest?cb=20171017012540")
                        .addFields({name: "Il fait actuellement jour sur Cetus.", value: `Temps restant : ${chaine[0]}.`})
                    interaction.editReply({embeds: [embed]})
                } else {
                    let embed = new Discord.EmbedBuilder()
                        .setTitle("Cycle Cetus : **Nuit**")
                        .setColor("#0c0963")
                        .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/3/32/OstronSyndicateFlag.png/revision/latest?cb=20171017012540")
                        .addFields({name: "Il fait actuellement nuit sur Cetus.", value: `Temps restant : ${chaine[0]}.`})
                    interaction.editReply({embeds: [embed]})
                }
            }).catch(function (err) {
                interaction.editReply(`Une erreur est survenue pour la raison suivante : \n\`\`\`${err}\`\`\``)
            })
    }
}

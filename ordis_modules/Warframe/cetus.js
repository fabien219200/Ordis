const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'Cetus',
    description: 'Gets Cetus state',
    execute(message) {
        console.log("Cetus function")
        axios.get('https://api.warframestat.us/pc/cetusCycle')
        .then((response) => {
            var chaine = response.data.shortString.split(" ")
            if (response.data.isDay == true) {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Cycle Cetus : **Jour**")
                    .setColor("#ffe387")
                    .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/3/32/OstronSyndicateFlag.png/revision/latest?cb=20171017012540")
                    .addField("Il fait actuellement jour sur Cetus.", "Temps restant : " + chaine[0] + ".")
                message.channel.send(embed)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Cycle Cetus : **Nuit**")
                    .setColor("#0c0963")
                    .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/3/32/OstronSyndicateFlag.png/revision/latest?cb=20171017012540")
                    .addField("Il fait actuellement nuit sur Cetus", "Temps restant : " + chaine[0] + ".")
                message.channel.send(embed)
            }
        }).catch(function (err) {
            console.error("err dans status => " + err.message)
        })
    }
}

const Discord = require('discord.js')
const axios = require('axios')
const fonctions = require('../ordis_bot')

module.exports.platinum = function (message) {
    var string = fonctions.majuscule(message.content, "")
    var wiki = string.split(" ").join("_")
    stringWfNexus = string.trim()
    stringWfMarket = wiki.toLowerCase().trim()

    axios.get('https://api.warframe.market/v1/items/' + stringWfMarket + '/statistics')
        .then((response) => {
            console.log("\n\n")
            console.log(response)
            var res = response.data.payload.statistics_closed["48hours"]
            var taille = res.length
            var prix_moyen = res[taille - 1].avg_price
            let embed = new Discord.RichEmbed()
                .setTitle("Prix (warframe.market)")
                .setURL("https://warframe.market/items/" + stringWfMarket)
                .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/e/e7/PlatinumLarge.png/revision/latest?cb=20130728181159")
                .setColor('#0101F2')
                .addField(string, "Vous pouvez espérer vendre **" + string + "** pour environ **" + prix_moyen + " Pl** sur le __tchat d'Echange__ InGame")
            message.channel.send(embed)
            //TODO embeds
        }).catch(function () {
            message.channel.send("L'item est introuvable")
        })
}

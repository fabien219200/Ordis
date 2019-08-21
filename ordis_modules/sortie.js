const Discord = require('discord.js')
const axios = require('axios')

module.exports.liste = function (message) {
    axios.get("https://api.warframestat.us/pc/sortie")
        .then((response) => {
            console.log(response)
            var sortie = response.data
            let embed = new Discord.RichEmbed()
                .setTitle("**Sortie actuelle : " + sortie.faction + "\nBoss actuel : " + sortie.boss + "** ")
                .setURL("https://warframe.fandom.com/wiki/Sortie")
                .setColor('#ffd642')
                .addField("Mission 1 : " + sortie.variants[0].missionType + ", " + sortie.variants[0].node, sortie.variants[0].modifier + "\n**__Description__** : " + sortie.variants[0].modifierDescription)
                .addField("Mission 2 : " + sortie.variants[1].missionType + ", " + sortie.variants[1].node, sortie.variants[1].modifier + "\n**__Description__** : " + sortie.variants[1].modifierDescription)
                .addField("Mission 3 : " + sortie.variants[2].missionType + ", " + sortie.variants[2].node, sortie.variants[2].modifier + "\n**__Description__** : " + sortie.variants[2].modifierDescription)
                .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/1/15/Sortie_b.png/revision/latest?cb=20151217134250")
                .setFooter("Expire dans " + sortie.eta)
            message.channel.send(embed)
        }).catch(function (err){
            message.channel.send("" + err)
        })
}

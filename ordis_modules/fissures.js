const Discord = require('discord.js')
const axios = require('axios')

module.exports.liste = function (message) {
    axios.get("https://api.warframestat.us/pc/fissures")
        .then((response) => {
            console.log("\n\n")
            console.log(response)
            msg = ""
            for (i = 0; i < response.data.length; i++) {
                ennemie = response.data[i].enemy
                mission = response.data[i].missionType
                if (response.data[i].missionType != "Extermination") {
                    wiki = mission.split(" ").join("_")
                } else {
                    wiki = "Exterminate"
                }
                nom = response.data[i].node
                tmpRestant = response.data[i].eta
                tier = response.data[i].tier
                msg = msg + "[" + tier + " " + ennemie + " " + mission + "](https://warframe.fandom.com/wiki/" + wiki + "), " + nom + ".\nExpire dans " + tmpRestant + "\n"
            }
            let embed = new Discord.RichEmbed()
                .setTitle("Fissures")
                .setURL("https://warframe.fandom.com/wiki/Void_Fissure")
                .setColor('#ffd642')
                .setDescription(msg)
                .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/5/57/VoidTearIcon_b.png/revision/latest?cb=20160713085454")
            message.channel.send(embed)
        }).catch(function () {
            let embed = new Discord.RichEmbed()
                .setTitle("Une erreur est survenue !")
                .setDescription("Contactez un " + message.guild.roles.find("name", "Developper").name + " pour corriger ce problème.")
            message.channel.send(embed)
        })
}
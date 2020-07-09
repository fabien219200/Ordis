const Discord = require('discord.js')
const axios = require('axios')

module.exports.liste = function (message) {
    axios.get("https://api.warframestat.us/pc/fr/fissures")
        .then((response) => {
            let embed = new Discord.RichEmbed()
                .setTitle("Fissures")
                .setURL("https://warframe.fandom.com/wiki/Void_Fissure")
                .setColor('#ffd642')
            for (var i = 0; i < response.data.length || i > 25; i++) {
                embed.addField("**" + response.data[i].missionType + " " + response.data[i].tier + " (" + response.data[i].enemy + "**) *" + response.data[i].node + "*", "Expire dans " + response.data[i].eta)
            }
            embed.setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/5/57/VoidTearIcon_b.png/revision/latest?cb=20160713085454")
            message.channel.send(embed)
        }).catch(function (err) {
            console.log("err dans liste => " + err.message)
        })
}

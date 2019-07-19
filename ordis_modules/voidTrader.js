const Discord = require('discord.js')
const axios = require('axios')

module.exports.liste = function (message) {
    axios.get("https://api.warframestat.us/pc/voidTrader")
        .then((response) => {
            console.log("\n\n")
            console.log(response)
            var baro = response.data
            //var active = false
            if (baro.active) {
                let embed = new Discord.RichEmbed()
                    .setTitle("Void trader (" + baro.character + ")")
                    .setURL("https://warframe.fandom.com/wiki/Baro_Ki%27Teer")
                    .setDescription("Baro est sur : **" + baro.location + "**")
                    .setThumbnail("https://images-ext-1.discordapp.net/external/ox8-csb1P1dgk0KnMGDVIDjh8zeGHzGtGKq1vxvVdCI/https/cdn.warframestat.us/genesis/img/baro.png?width=328&height=670")
                    .addField(baro.inventory[0].item, baro.inventory[0].ducats + " Ducats | " + baro.inventory[0].credits + " Credits", true)
                    .addField(baro.inventory[1].item, baro.inventory[1].ducats + " Ducats | " + baro.inventory[1].credits + " Credits", true)
                    .addField(baro.inventory[2].item, baro.inventory[2].ducats + " Ducats | " + baro.inventory[2].credits + " Credits", true)
                    .addField(baro.inventory[3].item, baro.inventory[3].ducats + " Ducats | " + baro.inventory[3].credits + " Credits", true)
                    .addField(baro.inventory[4].item, baro.inventory[4].ducats + " Ducats | " + baro.inventory[4].credits + " Credits", true)
                    .addField(baro.inventory[5].item, baro.inventory[5].ducats + " Ducats | " + baro.inventory[5].credits + " Credits", true)
                    .addField(baro.inventory[6].item, baro.inventory[6].ducats + " Ducats | " + baro.inventory[6].credits + " Credits", true)
                    .addField(baro.inventory[7].item, baro.inventory[7].ducats + " Ducats | " + baro.inventory[7].credits + " Credits", true)
                    .addField(baro.inventory[8].item, baro.inventory[8].ducats + " Ducats | " + baro.inventory[8].credits + " Credits", true)
                    .addField(baro.inventory[9].item, baro.inventory[9].ducats + " Ducats | " + baro.inventory[9].credits + " Credits", true)
                    .addField(baro.inventory[10].item, baro.inventory[10].ducats + " Ducats | " + baro.inventory[10].credits + " Credits", true)
                    .addField(baro.inventory[11].item, baro.inventory[11].ducats + " Ducats | " + baro.inventory[11].credits + " Credits", true)
                    .addField(baro.inventory[12].item, baro.inventory[12].ducats + " Ducats | " + baro.inventory[12].credits + " Credits", true)
                    .addField(baro.inventory[13].item, baro.inventory[13].ducats + " Ducats | " + baro.inventory[13].credits + " Credits", true)
                    .addField(baro.inventory[14].item, baro.inventory[14].ducats + " Ducats | " + baro.inventory[14].credits + " Credits", true)
                    .addField(baro.inventory[15].item, baro.inventory[15].ducats + " Ducats | " + baro.inventory[15].credits + " Credits", true)
                    .addField(baro.inventory[16].item, baro.inventory[16].ducats + " Ducats | " + baro.inventory[16].credits + " Credits", true)
                    .addField(baro.inventory[17].item, baro.inventory[17].ducats + " Ducats | " + baro.inventory[17].credits + " Credits", true)
                    .addField(baro.inventory[18].item, baro.inventory[18].ducats + " Ducats | " + baro.inventory[18].credits + " Credits", true)
                    .addField(baro.inventory[19].item, baro.inventory[19].ducats + " Ducats | " + baro.inventory[19].credits + " Credits", true)
                    .addField(baro.inventory[20].item, baro.inventory[20].ducats + " Ducats | " + baro.inventory[20].credits + " Credits", true)
                    .addField(baro.inventory[21].item, baro.inventory[21].ducats + " Ducats | " + baro.inventory[21].credits + " Credits", true)
                    .addField(baro.inventory[22].item, baro.inventory[22].ducats + " Ducats | " + baro.inventory[22].credits + " Credits", true)
                    .addField(baro.inventory[23].item, baro.inventory[23].ducats + " Ducats | " + baro.inventory[23].credits + " Credits", true)
                    .addField(baro.inventory[24].item, baro.inventory[24].ducats + " Ducats | " + baro.inventory[24].credits + " Credits", true)
                    .setFooter("S'en va dans " + baro.endString)
                message.channel.send(embed)
            }else{
                message.channel.send("Commande incomplète\n@fabien219200#2000 VIENS FINIR TON CODE (Tu peux copier-coller ça pour moi stp ? Merci :grin:)")
            }
        }).catch(function(err) {
            message.channel.send("Une erreur est survenue, merci de contacter fabien219200 pour resoudre le soucis ;)\n" + err)
            console.log(err)
        })
}
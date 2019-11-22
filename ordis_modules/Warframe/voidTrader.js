const Discord = require('discord.js')
const axios = require('axios')

module.exports.liste = function (message) {
    axios.get("https://api.warframestat.us/pc/voidTrader")
        .then((response) => {
            console.log("\n\n")
            console.log(response)
            var baro = response.data
            if (baro.active) {
                var embed = new Discord.RichEmbed()
                    .setTitle("Void trader (" + baro.character + ")")
                    .setURL("https://warframe.fandom.com/wiki/Baro_Ki%27Teer")
                    .setDescription("Baro est sur : **" + baro.location + "**")
                    .setThumbnail("https://images-ext-1.discordapp.net/external/ox8-csb1P1dgk0KnMGDVIDjh8zeGHzGtGKq1vxvVdCI/https/cdn.warframestat.us/genesis/img/baro.png?width=328&height=670")
                    for(var i = 0; i < baro.inventory.length || i > 25; i++){
                        embed.addField(baro.inventory[i].item, baro.inventory[i].ducats + " Ducats | " + baro.inventory[i].credits + " Credits", true)
                    }
                    embed.setFooter("S'en va dans " + baro.endString)
                    .setTimestamp(baro.expiry)
                message.channel.send(embed)
            }else{
                let embed = new Discord.RichEmbed()
                    .setTitle("Void trader (" + baro.character + ")")
                    .setURL("https://warframe.fandom.com/wiki/Baro_Ki%27Teer")
                    .setDescription("Baro arrive sur : **" + baro.location + "**")
                    .setFooter("Arrive dans " + baro.startString)
                    .setTimestamp(baro.activation)
                message.channel.send(embed)
            }
        }).catch(function (err){
            message.channel.send("" + err)
        })
}

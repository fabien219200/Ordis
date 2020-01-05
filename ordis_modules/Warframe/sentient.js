const Discord = require('discord.js')
const axios = require('axios')

const proximaNodes = require('../../Ressources/ProximaNodes')

var isInitialized = 0
var lastDate = 0

module.exports.tracker = function (channel) {
    axios.get("https://api.warframestat.us/pc/sentientOutposts")
        .then(response => {
            var data = response.data
            console.log(data)
            if (data.mission != null && (lastDate + 1800000 < Date.now() || isInitialized == 0)) {
                var date = new Date(Date.now()).toLocaleTimeString("fr-FR")
                var nextDate = new Date(Date.now() + 1800000).toLocaleTimeString("fr-FR")
                var embed = new Discord.RichEmbed()
                    .setTitle("Anomalie sentient")
                    .setURL("https://warframe.fandom.com/wiki/Veil_Proxima")
                    .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/5/5a/SentientFactionIcon_b.png")
                    .setDescription("L'anomalie sentient se trouve actuellement sur :\n**__" + ConvertIdToNodeName(data.id) + "__**\n\n***Arrivé à " + date + " *** **|** *** Repart à " + nextDate + "***")
                //.setFooter("Se termine ")
                //.setTimestamp(Date.now() + 1800000)
                channel.send(embed)
                console.log(lastDate)
                lastDate = Date.now()

                if (isInitialized == 0) {
                    isInitialized = 1
                }

            }
        })
}

function ConvertIdToNodeName(nodeNumber) {
    nodeNumber = nodeNumber.split("Node")[1].split(":")[0]
    nodeName = proximaNodes.nodeList.filter(node => node.value == nodeNumber)
    return nodeName[0].name
}

const Discord = require('discord.js')
const axios = require('axios')
const xmlParser = require('xml2js')

prevDatePN = 0
prevDateWS = 0

module.exports.rssFeed = function (rssChannel) {

    axios.get("https://forums.warframe.com/forum/3-pc-update-notes.xml/")
        .then(response => {
            xmlParser.parseString(response.data, (err, result) => {
                var data = result.rss.channel[0]
                var maxDatePN = 0
                for (var iPN = 0; iPN < data.item.length; iPN++) {
                    if (new Date(data.item[iPN].pubDate[0]).valueOf() > maxDatePN) {
                        maxDatePN = new Date(data.item[iPN].pubDate[0]).valueOf()
                        var indexLastPostPN = iPN
                    }
                }
                var topicLastPostPN = data.item[indexLastPostPN]

                if (maxDatePN != prevDatePN && prevDatePN != 0) {
                    var desc = topicLastPostPN.description[0].replace(/<[^>]*>?/gm, '').replace(/(\n|\t)+/gm, '\n').trim()
                    if (desc.split('').length > 2048) {
                        desc = desc.split('').slice(0, 2037).join('') + " **[...]**"
                    }
                    var embedPN = new Discord.RichEmbed()
                        .setTitle("**__Nouveau Patch Note__** : " + topicLastPostPN.title[0])
                        .setURL(topicLastPostPN.link[0])
                        .setColor("4360F7")
                        .setDescription(desc)
                        .setTimestamp(topicLastPostPN.pubDate[0])
                    rssChannel.send(embedPN)
                    prevDatePN = maxDatePN
                }
            })
        })
    axios.get("https://forums.warframe.com/forum/123-developer-workshop-update-notes.xml/")
        .then(response => {
            xmlParser.parseString(response.data, (err, result) => {
                var data = result.rss.channel[0]
                var maxDateWS = 0
                for (var iWS = 0; iWS < data.item.length; iWS++) {
                    if (new Date(data.item[iWS].pubDate[0]).valueOf() > maxDateWS) {
                        maxDateWS = new Date(data.item[iWS].pubDate[0]).valueOf()
                        var indexLastPost = iWS
                    }
                }
                var topicLastPostWS = data.item[indexLastPost]

                if (maxDateWS != prevDateWS && prevDateWS != 0) {
                    var desc = topicLastPostWS.description[0].replace(/<[^>]*>?/gm, '').replace(/(\n|\t)+/gm, '\n').trim()
                    if (desc.split('').length > 2048) {
                        desc = desc.split('').slice(0, 2037).join('') + " **[...]**"
                    }

                    var embedWS = new Discord.RichEmbed()
                        .setTitle("**__Nouveau Workshop__** : " + topicLastPostWS.title[0])
                        .setURL(topicLastPostWS.link[0])
                        .setColor("EC6826")
                        .setDescription(desc)
                        .setTimestamp(topicLastPostWS.pubDate[0])
                    rssChannel.send(embedWS)
                    prevDateWS = maxDateWS
                }
            })
        })
}
const Discord = require('discord.js')
const axios = require('axios')
const xmlParser = require('xml2js')

var linkActualPost = ""

module.exports.rssFeed = function (message, rssChannel) {
    axios.get("https://forums.warframe.com/forum/3-pc-update-notes.xml/")
        .then(response => {
            xmlParser.parseString(response.data, (err, result) => {
                var data = result.rss.channel[0]
                var maxDate = 0
                for (var i = 0; i < data.item.length; i++) {
                    if (new Date(data.item[i].pubDate[0]).valueOf() > maxDate) {
                        maxDate = new Date(data.item[i].pubDate[0]).valueOf()
                        var indexLastPost = i
                    }
                }
                topicLastPost = data.item[indexLastPost]
                var linkLastPost = topicLastPost.link[0]
                if (message != "") {
                    var desc = topicLastPost.description[0].replace(/(\n)*?<[^>]*>?(\n)*/gm, '').trim()
                    var msgSend = message.channel
                } else {
                    var desc = topicLastPost.description[0].replace(/<[^>]*>?/gm, '').replace(/(\n|\t)+/gm, '\n').trim()
                    var msgSend = rssChannel
                }
                if (linkLastPost != linkActualPost) {
                    linkActualPost = linkLastPost
                    if (desc.split('').length > 2048) {
                        desc = desc.split('').slice(0, 2037).join('') + " **[...]**"
                    }
                    var embed = new Discord.RichEmbed()
                        .setTitle("**__Nouveau Patch Note__** : " + topicLastPost.title[0])
                        .setURL(topicLastPost.link[0])
                        .setDescription(desc)
                        .setTimestamp(topicLastPost.pubDate[0])
                    msgSend.send(embed)
                }
            })
        })
}
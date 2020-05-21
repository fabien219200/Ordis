const Discord = require('discord.js')
const axios = require('axios')

var token = null

const SECRET = process.env.SECRET_TWITCH
const CLIENT = process.env.CLIENT_TWITCH
const STREAMER_ID = 31557216

module.exports.checkLive = async function (channel) {
    if (token == null) {
        token = await getTwitchToken()
    }

    var lastStreamDate = await getLastStreamDate(channel)

    axios.get("https://api.twitch.tv/helix/streams?user_id=" + STREAMER_ID, { "headers": { "Authorization": "Bearer " + token, "Client-ID": CLIENT } })
        .then(response => {
            if (response.data.data.length != 0) {
                if (new Date(response.data.data[0].started_at).valueOf() != lastStreamDate) {
                    lastStreamDate = response.data.data[0].started_at
                    var embed = new Discord.RichEmbed()
                        .setTitle('**' + response.data.data[0].user_name + ' est en stream :**')
                        .setDescription('***' + response.data.data[0].title + '***')
                        .setFooter('N\'oubliez pas de recuperer le twitch drop en regardant 30min du live.')
                        .setTimestamp(response.data.data[0].started_at)
                        .setURL('https://www.twitch.tv/warframe')
                        .setColor('ba59ff')
                        .setImage(response.data.data[0].thumbnail_url)
                    channel.send(embed)
                }
            }
        }).catch(err => {
            console.log(err)
        })
}

async function getTwitchToken() {
    response = await axios.post("https://id.twitch.tv/oauth2/token?client_id=z60mz80m2bixejlevar26039p4qh3n&client_secret=" + SECRET + "&grant_type=client_credentials")
    return response.data.access_token
}

async function getLastStreamDate(channel) {
    message = await channel.fetchMessages({ limit: 1 })
    var lastMessage = message.first()
    if (lastMessage.embeds.length != 0) {
        return new Date(lastMessage.embeds[0].timestamp).valueOf()
    } else {
        return 0
    }

}
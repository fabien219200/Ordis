const Discord = require('discord.js')
const axios = require('axios')

module.exports.liste = function(message) {
    axios.get("https://api.warframestat.us/pc/fr/nightwave")
        .then((response) => {
            let embed = new Discord.RichEmbed()
                .setTitle("**__Nightwaves__**")
                .setURL("https://semlar.com/challenges")
                .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/e/e0/NightwaveSyndicate.png/revision/latest?cb=20190228190906")
                .addField("Actes journaliers :" , ":white_small_square: (expire aujourd'hui à 02h) **" + response.data.activeChallenges[0].title + " (" + response.data.activeChallenges[0].reputation + ")** :\n" + response.data.activeChallenges[0].desc + "\n:white_small_square: (expire demain à 02h)** " + response.data.activeChallenges[1].title + " (" + response.data.activeChallenges[1].reputation + ")** :\n" + response.data.activeChallenges[1].desc + "\n:white_small_square: (expire après-demain à 02h)** " + response.data.activeChallenges[2].title + " (" + response.data.activeChallenges[2].reputation + ")** :\n" + response.data.activeChallenges[2].desc)
                .addBlankField()
                .addField("Actes hebdomadaires :", ":white_small_square:**" + response.data.activeChallenges[3].title + " (" + response.data.activeChallenges[3].reputation + ")** :\n" + response.data.activeChallenges[3].desc + "\n:white_small_square:**" + response.data.activeChallenges[4].title + " (" + response.data.activeChallenges[4].reputation + ")** :\n" + response.data.activeChallenges[4].desc + "\n:white_small_square:**" + response.data.activeChallenges[5].title + " (" + response.data.activeChallenges[5].reputation + ")** :\n" + response.data.activeChallenges[5].desc + "\n:white_small_square:**" + response.data.activeChallenges[6].title + " (" + response.data.activeChallenges[6].reputation + ")** :\n" + response.data.activeChallenges[6].desc + "\n:white_small_square:**" + response.data.activeChallenges[7].title + " (" + response.data.activeChallenges[7].reputation + ")** :\n" + response.data.activeChallenges[7].desc)
                .addBlankField()
                .addField("Actes hebdomadaires élites :", ":white_small_square:**" + response.data.activeChallenges[8].title + " (" + response.data.activeChallenges[8].reputation + ")** :\n" + response.data.activeChallenges[8].desc + "\n:white_small_square:**" + response.data.activeChallenges[9].title + " (" + response.data.activeChallenges[9].reputation + ")** :\n" + response.data.activeChallenges[9].desc)
                .setFooter("Actes hebdomadaires expirent ")
                .setTimestamp(response.data.activeChallenges[4].expiry)
            message.channel.send(embed)
        }).catch(function (err){
            message.channel.send("" + err)
        })
}

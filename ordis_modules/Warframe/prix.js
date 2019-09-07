const Discord = require('discord.js')
const axios = require('axios')
const fonctions = require('../../ordis_bot')

module.exports.platinum = function (message) {
    var string = fonctions.majuscule(message.content, "")
    var wiki = string.split(" ").join("_")
    stringWfNexus = string.trim()
    stringWfMarket = wiki.toLowerCase().trim()

    var returnValues

    axios.get("https://api.warframe.market/v1/items/" + stringWfMarket + "/orders?include=%5B%22item%22%5D")
        .then((response) => {
            returnValues = prixMin(response)
            console.log("\n\n")
            console.log(response)
            let embed = new Discord.RichEmbed()
                .setTitle("Prix (warframe.market)")
                .setURL("https://warframe.market/items/" + stringWfMarket)
                .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/e/e7/PlatinumLarge.png/revision/latest?cb=20130728181159")
                .setColor('#0101F2')
                .addField("Prix de vente minimum de " + string, ":white_small_square: Online in game : " + returnValues[0] + " (``/w " + returnValues[3] + "``)\n:white_small_square: Offline : " + returnValues[1] + " (``/w " + returnValues[4] + "``)")
                .addBlankField()
                .addField("Prix d'achat maximum de " + string, ":white_small_square: Online in game : " + returnValues[2] + " (``/w " + returnValues[5] + "``)")
            message.channel.send(embed)
        }).catch(function (err){
            message.channel.send("" + err)
        })
}

function prixMin(response) {
    var prix = [10000000, 10000000, 0] //[0] = prixmin, [1] = prixminoffline, [2] = prixmax
    var user = ["", "", ""] //[0] = usersell, [1] = userselloffline, [2] = usermax
    console.log(response)
    var orders = response.data.payload.orders
    //var returnValue = [user, prix]
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].platform == "pc") {
            if (orders[i].order_type === "sell") {
                if (orders[i].user.status == "ingame") {
                    if (orders[i].platinum < prix[0]) {
                        prix[0] = orders[i].platinum
                        user[0] = orders[i].user.ingame_name
                    }
                } else if (orders[i].user.status == "offline") {
                    if (orders[i].platinum < prix[1]) {
                        prix[1] = orders[i].platinum
                        user[1] = orders[i].user.ingame_name
                    }
                }
            } else if (orders[i].order_type === "buy") {
                if (orders[i].user.status == "ingame") {
                    if (orders[i].platinum > prix[2]) {
                        prix[2] = orders[i].platinum
                        user[2] = orders[i].user.ingame_name
                    }
                }
            }
        }
    }
    return [prix[0], prix[1], prix[2], user[0], user[1], user[2]]
}

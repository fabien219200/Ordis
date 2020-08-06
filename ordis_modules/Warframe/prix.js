const Discord = require('discord.js')
const axios = require('axios')
const fonctions = require('../../ordis_bot')

module.exports = {
    name: 'Prix',
    description: 'Gets price of an Item from https://warframe.market/',
    execute(message) {
        var string = message.content.split(" ").slice(1).join(" ")
        string = fonctions.majuscule(string, " ")
        var wiki = string.split(" ").join("_")
        stringWfNexus = string.trim()
        stringWfMarket = wiki.toLowerCase().trim()

        axios.get("https://api.warframe.market/v1/items/" + stringWfMarket + "/orders?include=%5B%22item%22%5D")
            .then((response) => {
                var returnValues = prixMin(response)
                let embed = new Discord.MessageEmbed()
                    .setTitle("Prix (warframe.market)")
                    .setURL("https://warframe.market/items/" + stringWfMarket)
                    .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/e/e7/PlatinumLarge.png/revision/latest?cb=20130728181159")
                    .setColor('#0101F2')
                    .addField("Prix de vente minimum de " + string, ":white_small_square: Online in game : " + returnValues[0] + " (``/w " + returnValues[3] + "``)\n:white_small_square: Offline : " + returnValues[1] + " (``/w " + returnValues[4] + "``)")
                    .addField("Prix d'achat maximum de " + string, ":white_small_square: Online in game : " + returnValues[2] + " (``/w " + returnValues[5] + "``)")
                message.channel.send(embed)
            }).catch(function (err) {
                console.error("err dans platinum => " + err.message)
            })
    }
}

function prixMin(response) {
    var orders = response.data.payload.orders
    var prix1init, prix2init, prix3init, user1init, user2init, user3init, i = 0
    while ((!prix1init || !prix2init || !prix3init) && i != orders.length) {
        if (orders[i].platform == "pc" && orders[i].region === "en") {
            if (orders[i].order_type === "sell") {
                if (orders[i].user.status == "ingame" && !prix1init) {
                    prix1init = orders[i].platinum
                    user1init = orders[i].user.ingame_name
                } else if (orders[i].user.status == "offline" && !prix2init) {
                    prix2init = orders[i].platinum
                    user2init = orders[i].user.ingame_name
                }
            } else if (orders[i].order_type === "buy" && !prix3init) {
                if (orders[i].user.status == "ingame") {
                    prix3init = orders[i].platinum
                    user3init = orders[i].user.ingame_name
                }
            }
        }
        i++
    }

    var prix = [prix1init, prix2init, prix3init] //[0] = prixmin, [1] = prixminoffline, [2] = prixmax
    var user = [user1init, user2init, user3init] //[0] = usersell, [1] = userselloffline, [2] = userbuy

    for (var i = 0; i < orders.length; i++) {
        if (orders[i].platform == "pc" && orders[i].region === "en") {
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

const Discord = require('discord.js')
const axios = require('axios')
const fonctions = require('../../ordis_bot')

var stringWfMarket
var displayString
module.exports = {
    name: 'Prix',
    description: 'Gets price of an Item from https://warframe.market/',
    async execute(message) {
        var string = message.content.split(" ").slice(1).join(" ")
        if (string.match(/\w+ \w\d/)) {
            string += " Intact"
        }
        string = fonctions.majuscule(string, " ")
        var wiki = string.split(" ").join("_")
        displayString = string.trim()
        stringWfMarket = wiki.toLowerCase().trim()
        var primeResult = null

        console.log(displayString)

        primeResult = await getItemType(displayString.toLowerCase())
        console.log(primeResult)
        var type = primeResult[0]
        var maxRank = primeResult[2]
        var components = primeResult[1]

        var prixArray = []

        if (components != null) {
            if (type == "SpaceGuns" && components.filter(component => component.uniqueName.includes("Gameplay")).length != 0) {
                //Check if displayName is in component.name
                components = components.filter(item => item.uniqueName.match(/Gameplay/))
                components.push({ name: "Set" })
                console.log(components)
                for (var i = 0; i < components.length; i++) {
                    if (components[i].name.toLowerCase().includes(displayString.toLowerCase())) {
                        var stringWfMarketComponent = components[i].name.replace(" ", "_").toLowerCase()
                    } else {
                        var stringWfMarketComponent = stringWfMarket + "_" + components[i].name.toLowerCase().split(" ").join("_")
                    }
                    await axios.get("https://api.warframe.market/v1/items/" + stringWfMarketComponent + "/orders?include=%5B%22item%22%5D")
                        .then(response => {
                            prixArray.push(prixMin(response, null, fonctions.majuscule(stringWfMarketComponent.split("_").join(" "), " ")))
                        }).catch(e => {
                            console.log(e)
                        })
                }
            } else {
                components = components.filter(item => item.uniqueName.match(/Recipes/))
                components.push({ name: "Set" })
                console.log(components)
                for (var i = 0; i < components.length; i++) {
                    var stringWfMarketComponent = stringWfMarket + "_" + components[i].name.toLowerCase().replace(" ", "_")
                    await axios.get("https://api.warframe.market/v1/items/" + stringWfMarketComponent + "/orders?include=%5B%22item%22%5D")
                        .then(response => {
                            prixArray.push(prixMin(response, null, fonctions.majuscule(stringWfMarketComponent.split("_").join(" "), " ")))
                        }).catch(e => {
                            console.log(e)
                        })
                }
            }
        } else if (type == "Upgrade") {
            if (displayString.includes("Riven")) {
                await axios.get("https://api.warframe.market/v1/items/" + stringWfMarket + "/orders?include=%5B%22item%22%5D")
                    .then(response => {
                        prixArray.push(prixMin(response, null, `${displayString}`))
                    }).catch(e => {
                        console.log(e)
                    })
            } else {
                for (var i = 0; i <= 1; i++) {
                    var rank = i * maxRank
                    await axios.get("https://api.warframe.market/v1/items/" + stringWfMarket + "/orders?include=%5B%22item%22%5D")
                        .then(response => {
                            prixArray.push(prixMin(response, rank, `${displayString} (rank ${rank})`))
                        }).catch(e => {
                            console.log(e)
                        })

                }
            }
        } else {
            await axios.get("https://api.warframe.market/v1/items/" + stringWfMarket + "/orders?include=%5B%22item%22%5D")
                .then(response => {
                    prixArray.push(prixMin(response, rank, displayString))
                }).catch(e => {
                    console.log(e)
                })
        }
        console.log(prixArray)
        let embed = new Discord.MessageEmbed()
        if (prixArray.length != 0) {
            embed = new Discord.MessageEmbed()
                .setTitle("Prix (warframe.market)")
                .setURL("https://warframe.market/")
                .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/e/e7/PlatinumLarge.png/revision/latest?cb=20130728181159")
                .setColor('#0101F2')
            prixArray.forEach(element => {
                if (element[0] == null || element[1] == null) {
                    embed.addField(element[2], "```No online ingame orders found !\nTry again later :)```")
                } else {
                    embed.addField(element[2], element[1].replace("_", "\\_") + " : " + element[0] + ` PL\n\`\`\`/w ${element[1]} Hi! I want to buy: ${element[2]} for ${element[0]} platinum. (warframe.market)\`\`\``)
                }
            })
        } else {
            embed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setURL("https://warframe.market/")
                .setThumbnail("https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png")
                .setColor('Red')
                .addField("Une erreur est survenue", "Verifiez si l'item renseigné est tradeable, et si il a été correctement orthographié.\nSi oui, mentionnez un <@&" + message.guild.roles.cache.find(role => role.name == "Developper") + ">")
        }
        message.channel.send(embed)
    }
}

async function getItemType(query) {
    var response = await axios.get("https://api.warframestat.us/items/search/" + query)
    var { data } = response
    var type = null
    var components = null
    var maxRank = null
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].productCategory)
    }
    if (data.filter(entry => entry.category != "Skins" && entry.category != 'Relics' && entry.uniqueName.includes("Prime")).length != 0) {
        if (!stringWfMarket.includes("prime")) {
            stringWfMarket += "_prime"
            displayString += " Prime"
        }
    } else if (data.filter(entry => entry.category != "Skins" && entry.uniqueName.includes("Vandal")).length != 0) {
        if (!stringWfMarket.includes("vandal")) {
            stringWfMarket += "_vandal"
            displayString += " Vandal"
        }
    } else if (data.filter(entry => entry.category != "Skins" && entry.uniqueName.includes("Wraith")).length != 0) {
        if (!stringWfMarket.includes("wraith")) {
            stringWfMarket += "_wraith"
            displayString += " Wraith"
        }
    } else if (data.filter(entry => entry.category != "Skins" && entry.uniqueName.match(/VoidTrader|Prisma/)).length != 0) {
        if (!stringWfMarket.includes("prisma")) {
            stringWfMarket = "prisma_" + stringWfMarket
            displayString = "Prisma " + displayString
        }
    }
    if (data.filter(entry => entry.hasOwnProperty("productCategory") && entry.productCategory.includes("SpaceGuns")).length != 0) {
        var dataProductCategory = data.filter(entry => entry.hasOwnProperty("productCategory") && entry.productCategory.includes("SpaceGuns"))
        if (dataProductCategory.filter(entry => entry.productCategory.match(/SpaceGuns/) && entry.name.includes(displayString)).length != 0) {
            entry = dataProductCategory.filter(entry => entry.productCategory.match(/SpaceGuns/) && entry.name.includes(displayString))[0]
            type = "SpaceGuns"
            var { components } = entry
        }
    } else if (data.filter(entry => entry.category.match(/Warframes|Archwing|Sentinels/) && entry.name.includes(displayString)).length != 0) {
        var entry = data.filter(entry => entry.category.match(/Warframes|Archwing|Sentinels/) && entry.name.includes(displayString))[0]
        type = "Warframe"
        var { components } = entry
    } else if (data.filter(entry => entry.category.match(/Primary|Secondary|Melee|Arch-Melee/) && entry.name.includes(displayString)).length != 0) {
        var entry = data.filter(entry => entry.category.match(/Primary|Secondary|Melee|Arch-Melee/) && entry.name.includes(displayString))[0]
        type = "Arme"
        var { components } = entry
    } else if (data.filter(entry => (entry.category.match(/Arcanes|Mods/) && entry.name.includes(displayString))).length != 0) {
        var entry = data.filter(entry => (!entry.uniqueName.includes("/Beginner/") && (entry.category.match(/Arcanes|Mods/) && entry.name.includes(displayString))))[0]
        type = "Upgrade"
        if (entry.name.includes("Riven")) {
            stringWfMarket += "_(veiled)"
            displayString += " (Veiled)"
        } else {
            if (entry.category.match(/Arcanes/)) {
                maxRank = entry.levelStats.length - 1
            } else if (entry.category.match(/Mods/)) {
                maxRank = entry.fusionLimit
            }
        }
    } else {
        type = "None"
    }
    return [type, components, maxRank]
}

function prixMin(response, rank, itemName) {
    var orders = response.data.payload.orders
    var prix = null
    var user = null
    orders = orders.filter(order => order.platform == "pc" && order.region == "en" && order.order_type == "sell" && order.user.status == "ingame")
    if (rank != null) {
        orders = orders.filter(order => order.mod_rank == rank)
    }
    for (var i = 0; i < orders.length; i++) {
        if ((orders[i].platinum < prix && orders[i]) || prix == null) {
            //console.log(orders[i])
            prix = orders[i].platinum
            user = orders[i].user.ingame_name
        }
    }
    return [prix, user, itemName]
}
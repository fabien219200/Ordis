const Discord = require('discord.js')
const axios = require('axios')
const fonctions = require('../../ordis_bot')

module.exports.liste = function (message) {
    var msg = message.content.replace(/\/+[^ ]* */, "")
    msg = msg.replace(/( +prime)( .*)*/gim, "")
    msg = msg.split(' ')
    msg[msg.length] = "p."
    var wfTab = ["Ash", "Atlas", "Banshee", "Baruuk", "Chroma", "Ember", "Equinox", "Excalibur", "Frost", "Gara", "Garuda", "Gauss", "Grendel", "Harrow", "Hildryn", "Hydroid", "Inaros", "Ivara", "Khora", "Limbo", "Loki", "Mag", "Mesa", "Mirage", "Nekros", "Nezha", "Nidus", "Nova", "Nyx", "Frost", "Oberon", "Octavia", "Odonata", "Revenant", "Rhino", "Saryn", "Titania", "Trinity", "Valkyr", "Vauban", "Volt", "Wisp", "Wukong", "Zephyr"]
    for (var i = 0; i < wfTab.length; i++) {
        if (msg[0].toLowerCase() == wfTab[i].toLowerCase()) {
            var isWf = true
        }
    }
    if (isWf == undefined) {
        var isWeapon = true
    }
    msg = msg.join(' ')
    msg = msg.toLowerCase()
    var relics = []
    var part1 = "", part2 = "", part3 = "", part4 = ""
    var msgBp = "", msgPart1 = "", msgPart2 = "", msgPart3 = "", msgPart4 = ""

    axios.get("https://api.warframestat.us/drops/search/" + msg)
        .then(response => {
            var data = response.data
            for (var i = 0; i < data.length; i++) {
                if (!(data[i].place.includes("(")) && data[i].item.split(' ')[0].toLowerCase() == msg.split(' ')[0].toLowerCase()) {
                    relics.push(data[i])
                    if (data[i].item.split(' ')[data[i].item.split(' ').length - 1] == "Limb") {
                        part1 = "Lower Limb"
                        part2 = "Upper Limb"
                    }
                    if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] == 'P.') || (isWeapon == true && data[i].item.split(' ')[data[i].item.split(' ').length - 1] == 'BP')) {
                        msgBp = msgBp + data[i].place.replace(" Relic", "") + " (" + data[i].chance + "%)" + '\n'
                    } else if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] != part1) || (isWeapon == true && (data[i].item.split(' ')[data[i].item.split(' ').length - 1] != part1) && data[i].item.split(' ')[data[i].item.split(' ').length - 1] != "Limb")) {
                        if (part1 == "") {
                            part1 = isWf ? data[i].item.split(' ')[data[i].item.split(' ').length - 2] : data[i].item.split(' ')[data[i].item.split(' ').length - 1]
                        } else if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] != part2) || (isWeapon == true && (data[i].item.split(' ')[data[i].item.split(' ').length - 1] != part2) && data[i].item.split(' ')[data[i].item.split(' ').length - 1] != "Limb")) {
                            if (part2 == "") {
                                part2 = isWf ? data[i].item.split(' ')[data[i].item.split(' ').length - 2] : data[i].item.split(' ')[data[i].item.split(' ').length - 1]
                            } else if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] != part3) || (isWeapon == true && data[i].item.split(' ')[data[i].item.split(' ').length - 1] != part3 && data[i].item.split(' ')[data[i].item.split(' ').length - 1] != "Limb")) {
                                if (part3 == "") {
                                    part3 = isWf ? data[i].item.split(' ')[data[i].item.split(' ').length - 2] : data[i].item.split(' ')[data[i].item.split(' ').length - 1]
                                } else if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] != part4) || (isWeapon == true && data[i].item.split(' ')[data[i].item.split(' ').length - 1] != part4 && data[i].item.split(' ')[data[i].item.split(' ').length - 1] != "Limb")) {
                                    if (part4 == "") {
                                        part4 = isWf ? data[i].item.split(' ')[data[i].item.split(' ').length - 2] : data[i].item.split(' ')[data[i].item.split(' ').length - 1]
                                    }
                                }
                            }
                        }
                    }
                    if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] == part1) || (isWeapon == true && (data[i].item.split(' ')[data[i].item.split(' ').length - 1] == part1) || data[i].item.split(' ')[data[i].item.split(' ').length - 2] + " " + data[i].item.split(' ')[data[i].item.split(' ').length - 1] == "Lower Limb")) {
                        msgPart1 = msgPart1 + data[i].place.replace(" Relic", "") + " (" + data[i].chance + "%)" + '\n'
                    } else if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] == part2) || (isWeapon == true && (data[i].item.split(' ')[data[i].item.split(' ').length - 1] == part2) || data[i].item.split(' ')[data[i].item.split(' ').length - 2] + " " + data[i].item.split(' ')[data[i].item.split(' ').length - 1] == "Upper Limb")) {
                        msgPart2 = msgPart2 + data[i].place.replace(" Relic", "") + " (" + data[i].chance + "%)" + '\n'
                    } else if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] == part3) || (isWeapon == true && data[i].item.split(' ')[data[i].item.split(' ').length - 1] == part3)) {
                        msgPart3 = msgPart3 + data[i].place.replace(" Relic", "") + " (" + data[i].chance + "%)" + '\n'
                    } else if ((isWf == true && data[i].item.split(' ')[data[i].item.split(' ').length - 2] == part4) || (isWeapon == true && data[i].item.split(' ')[data[i].item.split(' ').length - 1] == part4)) {
                        msgPart4 = msgPart4 + data[i].place.replace(" Relic", "") + " (" + data[i].chance + "%)" + '\n'
                    }
                }
            }
            var embed = new Discord.RichEmbed()
                .setTitle("Reliques")
                .setThumbnail("https://vignette.wikia.nocookie.net/warframe/images/0/0e/VoidProjectionsGoldD.png/revision/latest/scale-to-width-down/350?cb=20160709035734")
                .addField("Blueprint :", "```\n" + msgBp + "```", true)
                .addField(part1 + " :", "```\n" + msgPart1 + "```", true)
            if (part2.trim() != "") {
                embed.addField(part2 + " :", "```\n" + msgPart2 + "```", true)
            }
            if (part3.trim() != "") {
                embed.addField(part3 + " :", "```\n" + msgPart3 + "```", true)
            }
            if (part4.trim() != "") {
                embed.addField(part4 + " :", "```\n" + msgPart4 + "```", true)
            }
            if (msg.split(' ')[1] == "p.") {
                embed.setURL("https://warframe.fandom.com/wiki/" + fonctions.majuscule(msg.split(' ')[0], " ") + "_Prime")
            } else {
                embed.setURL("https://warframe.fandom.com/wiki/" + fonctions.majuscule(msg.split(' ')[0] + " " + msg.split(' ')[1], "_") + "_Prime")
            }
            message.channel.send(embed)
        }).catch(err => {
            console.error("err dans liste => " + err.message)
        })
}
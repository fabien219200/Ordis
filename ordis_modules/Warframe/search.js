const Discord = require('discord.js')
const axios = require('axios')
const fs = require('fs')
const fonctions = require('../../ordis_bot')

module.exports.infos = function (message) {
    var query = message.content.split(" ").slice(1).join(" ")
    var category, desc, released, mastery, name, type, image, recepie
    var data
        axios.get("https://api.warframestat.us/weapons/search/" + query)
            .then((response) => {
                if (response.data.length != 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        if (query.toLowerCase() === response.data[i].name.toLowerCase()) {
                            data = response.data[i]
                            if (data.name.split(" ")[data.name.split(" ").length - 1] == "Prime") {
                                category = data.category
                                desc = data.description
                                released = modifyDate(data.releaseDate)
                                mastery = data.masteryReq
                                name = data.name
                                type = data.type
                                image = data.wikiaThumbnail
                                var embed = new Discord.RichEmbed()
                                    .setTitle("Données de " + name)
                                    .setDescription("```fix\nEn cas de problème (infos incorrectes), merci de me le faire savoir pour que je puisse modifier le fichier source.\n```")
                                    .setColor('#0101F2')
                                    .setURL("https://warframe.fandom.com/wiki/" + fonctions.majuscule(query).split(" ").join("_"))
                                    .setThumbnail(image)
                                    .addField("Categorie", category)
                                    .addField("Type", type)
                                    .addField("Description", desc)
                                    .addField("Date de sortie", released)
                                    .addField("Rang de maîtrise nécessaire", mastery)
                                message.channel.send(embed)
                            } else {
                                category = data.category
                                desc = data.description
                                //released = modifyDate(data.releaseDate)
                                mastery = data.masteryReq
                                name = data.name
                                type = data.type
                                image = data.wikiaThumbnail
                                recipe = getRecipe(data.components)
                                var embed = new Discord.RichEmbed()
                                    .setTitle("Données de " + name)
                                    .setDescription("```fix\nEn cas de problème (infos incorrectes), merci de me le faire savoir pour que je puisse modifier le fichier source.\n```")
                                    .setColor('#0101F2')
                                    .setURL("https://warframe.fandom.com/wiki/" + fonctions.majuscule(query).split(" ").join("_"))
                                    .setThumbnail(image)
                                    .addField("Categorie", category)
                                    .addField("Type", type)
                                    .addField("Description", desc)
                                    //.addField("Date de sortie", released)
                                    .addField("Rang de maîtrise nécessaire", mastery)
                                    .addField("Recette pour crafter : *" + name + "*", recipe)
                                message.channel.send(embed)
                            }
                        }
                    }
                } else {
                    axios.get("https://api.warframestat.us/warframes/search/" + query)
                        .then((response2) => {
                            if (response2.data.length != 0) {
                                for (var i = 0; i < response2.data.length; i++) {
                                    if (query.toLowerCase() === response2.data[i].name.toLowerCase()) {
                                        data = response2.data[i]
                                        if (data.name.split(" ")[data.name.split(" ").length - 1] == "Prime") {
                                            category = data.category
                                            desc = data.description
                                            released = modifyDate(data.releaseDate)
                                            mastery = data.masteryReq
                                            name = data.name
                                            type = data.type
                                            image = data.wikiaThumbnail
                                            var embed = new Discord.RichEmbed()
                                                .setTitle("Données de " + name)
                                                .setDescription("```fix\nEn cas de problème (infos incorrectes), merci de me le faire savoir pour que je puisse modifier le fichier source.\n```")
                                                .setColor('#0101F2')
                                                .setURL("https://warframe.fandom.com/wiki/" + fonctions.majuscule(query).split(" ").join("_"))
                                                .setThumbnail(image)
                                                .addField("Categorie", category)
                                                .addField("Type", type)
                                                .addField("Description", desc)
                                                .addField("Date de sortie", released)
                                                .addField("Rang de maîtrise nécessaire", mastery)
                                            message.channel.send(embed)
                                        } else {
                                            category = data.category
                                            desc = data.description
                                            //released = modifyDate(data.releaseDate)
                                            mastery = data.masteryReq
                                            name = data.name
                                            type = data.type
                                            image = data.wikiaThumbnail
                                            var embed = new Discord.RichEmbed()
                                                .setTitle("Données de " + name)
                                                .setDescription("```fix\nEn cas de problème (infos incorrectes), merci de me le faire savoir pour que je puisse modifier le fichier source.\n```")
                                                .setColor('#0101F2')
                                                .setURL("https://warframe.fandom.com/wiki/" + fonctions.majuscule(query).split(" ").join("_"))
                                                .setThumbnail(image)
                                                .addField("Categorie", category)
                                                .addField("Type", type)
                                                .addField("Description", desc)
                                                //.addField("Date de sortie", released)
                                                .addField("Rang de maîtrise nécessaire", mastery)
                                            message.channel.send(embed)
                                        }
                                    }
                                }
                            } else {
                                message.channel.send("La recherche n'a donnée aucun résultat !\n")
                            }
                        }).catch(function (err) {
                            message.channel.send("La recherche n'a donnée aucun résultat !\n" + err)
                            console.log(err)
                        })
                }
            }).catch(function (err) {
                message.channel.send("La recherche n'a donnée aucun résultat !\n" + err)
                console.log(err)
            })
}


function modifyDate(dateAnglais) {
    if (dateAnglais == undefined) {
        return
    } else {
        var date = dateAnglais.split(" ")
        var dateFrancais = ""
        for (var i = date.length - 1; i >= 0; i--) {
            if (i != 0) {
                dateFrancais = dateFrancais + date[i] + "/"
            } else {
                dateFrancais = dateFrancais + date[i]
            }
        }
        return dateFrancais
    }
}

function getRecipe(components) {
    if (components == undefined) {
        return "**Pas de recette pour cette arme !**"
    } else {
        var recipe = ""
        for (var i = 0; i < components.length; i++) {
            console.log(components[i])
            recipe = recipe + ":white_small_square:" + components[i].name + " : " + components[i].itemCount + "\n"
        }
        return recipe
    }
}

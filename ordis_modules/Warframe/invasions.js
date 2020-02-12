const Discord = require('discord.js')
const axios = require('axios')

module.exports.liste = function (message) {
    axios.get("https://api.warframestat.us/pc/invasions")
        .then((response) => {
            invasion = response.data
            var Earth = "", Venus = "", Mercury = "", Mars = "", Phobos = "", Ceres = "", Jupiter = "", Europe = "", Saturn = "", Uranus = "", Neptune = "", Pluto = "", Sedna = ""

            for (var i = 0; i < invasion.length; i++) {
                if (!invasion[i].completed) {
                    if (!invasion[i].vsInfestation) {
                        switch (invasion[i].node.split("(")[1].split(")")[0]) {
                            case "Earth":
                                Earth = Earth + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Venus":
                                Venus = Venus + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Mercury":
                                Mercury = Mercury + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Mars":
                                Mars = Mars + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Phobos":
                                Phobos = Phobos + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Ceres":
                                Ceres = Ceres + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Jupiter":
                                Jupiter = Jupiter + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Europa":
                                Europe = Europe + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + " | **Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Saturn":
                                Saturn = Saturn + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Uranus":
                                Uranus = Uranus + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Neptune":
                                Neptune = Neptune + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Pluto":
                                Pluto = Pluto + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Sedna":
                                Sedna = Sedna + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense attaquants** : " + invasion[i].attackerReward.itemString + "\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break
                        }
                    } else {
                        switch (invasion[i].node.split("(")[1].split(")")[0]) {
                            case "Earth":
                                Earth = Earth + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Venus":
                                Venus = Venus + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Mercury":
                                Mercury = Mercury + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Mars":
                                Mars = Mars + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Phobos":
                                Phobos = Phobos + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Ceres":
                                Ceres = Ceres + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Jupiter":
                                Jupiter = Jupiter + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Europa":
                                Europe = Europe + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Saturn":
                                Saturn = Saturn + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Uranus":
                                Uranus = Uranus + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Neptune":
                                Neptune = Neptune + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Pluto":
                                Pluto = Pluto + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break

                            case "Sedna":
                                Sedna = Sedna + "__**" + invasion[i].desc + "**__ _" + invasion[i].node + "_\n**Récompense défenseurs** : " + invasion[i].defenderReward.itemString + "\nTemps restant éstimé : " + invasion[i].eta + "\n\n"
                                break
                        }
                    }
                }
            }
            var msg = Earth + Venus + Mercury + Mars + Phobos + Ceres + Jupiter + Europe + Saturn + Uranus + Neptune + Pluto + Sedna
            let embed = new Discord.RichEmbed()
                .setTitle("Invasions")
                .setURL("https://warframe.fandom.com/wiki/Invasion")
                .setDescription(msg)
            message.channel.send(embed)
        }).catch(function (err){
            message.channel.send("" + err)
        })
}

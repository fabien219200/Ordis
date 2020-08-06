const Discord = require('discord.js')
const axios = require('axios')

var tabInvasion = []

module.exports = {
    name: 'Track',
    description: 'WIP',
    execute(message) {
        var invasionCount = 0

        axios.get("https://api.warframestat.us/pc/invasions")
            .then(response => {
                var invasion = response.data
                for (var i = 0; i < invasion.length; i++) {
                    if (!invasion[i].completed) {
                        if (!invasion[i].vsInfestation) {
                            if (invasion[i].attackerReward.countedItems[0].type == item) {
                                //console.log("Detonite Injector")
                                invasionCount++
                                console.log(invasion[i])
                            }
                        } else {
                            if (invasion[i].defenderReward.countedItems[0].type == item) {
                                //console.log("Mutagen Mass")
                                invasionCount++
                            }
                        }
                    }
                }
                console.log(invasionCount + " " + item)
            }).catch(err => {
                console.error("err dans track => " + err.message)
            })
    }
}
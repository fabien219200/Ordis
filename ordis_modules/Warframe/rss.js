const axios = require('axios')

module.exports.rssFeed = function (message, rssChannel) {

        return axios.get("https://forums.warframe.com/forum/3-pc-update-notes.xml/")
            
}
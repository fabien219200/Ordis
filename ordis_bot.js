
// Import required dependencies
const Discord = require('discord.js')
const axios = require('axios')
const fs = require('fs')

// Load environment variables
require('dotenv').config()


// Create a new Discord client instance
const bot = new Discord.Client({
    intents: [
        // Specify the bot's intents to listen for
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildPresences,
    ]
})

// Create a collection to store bot commands
bot.commands = new Discord.Collection();
// Define a global guild ID
globalGuild = '350727122320359424'

// Load Discord and Warframe commands from their respective directories
const discordCommands = fs.readdirSync('./ordis_modules/Discord').filter(file => file.endsWith('.js'))
const warframeCommands = fs.readdirSync('./ordis_modules/Warframe').filter(file => file.endsWith('.js'))

// Add loaded commands to the bot.commands collection
for (const file of discordCommands) {
    const command = require(`./ordis_modules/Discord/${file}`);
    bot.commands.set(command.name.toLowerCase(), command);
}

for (const file of warframeCommands) {
    const command = require(`./ordis_modules/Warframe/${file}`);
    bot.commands.set(command.name.toLowerCase(), command);
}

// Load custom required modules
const rss = require('./Ressources/rss')
const lives = require('./Ressources/lives')
const event = require('./ordis_modules/Discord/event')


// Handle 'ready' event
bot.on('ready', () => {
    console.log("je suis connecté")
    //console.log(bot.guilds.cache)
    bot.user.setActivity("Initialisation", { type: Discord.ActivityType.Custom })

    // Set up periodic actions using intervals
    setInterval(cetusState, 60000)
    setInterval(function () { rss.rssFeed(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "patch-notes")) }, 300000)
    setInterval(function () { lives.checkLive(bot.guilds.cache.find(guild => guild.id == globalGuild).channels.cache.find(channel => channel.name == "lives")) }, 300000)
})

/**
 * Function to update Cetus cycle state
 */
function cetusState() {
    var message = "Cetus => "
    axios.get('https://api.warframestat.us/pc/cetusCycle')
        .then((response) => {
            if (response.data.isDay) {
                message += `☀:  ${(response.data.timeLeft.includes("m") ? response.data.timeLeft.match(/((\d*h )*(\d*m)*)/)[0] : response.data.timeLeft)}`
            } else {
                message += `🌑:  ${(response.data.timeLeft.includes("m") ? response.data.timeLeft.match(/((\d*h )*(\d*m)*)/)[0] : response.data.timeLeft)}`
            }
            bot.user.setActivity(message, { type: Discord.ActivityType.Custom })
        }).catch((err) => {
            console.error("err dans cetusState => " + err.message)
        })
}


// Handle interaction (slash command) creation
bot.on(Discord.Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return // Skip if not a slash command
    console.log(interaction)
    if (interaction.commandName != "clear") {
        await interaction.deferReply() // Defer reply for non-"clear" commands
    }
    try {
        bot.commands.get(interaction.commandName).execute(interaction)
    } catch (e) {
        console.log(e)
    }
})


// Handle voice state updates
bot.on(Discord.Events.VoiceStateUpdate, async (oldState, newState) => {
    // Logic for handling voice state updates, such as creating and deleting voice channels
    if (newState.channel != null) {
        console.log("User joined a channel")
        if (newState.channel.name == "Creation de salon") {
            console.log("User joined channel named 'Creation de salon'")
            // Create a new voice channel with the user's name and set it as their destination
            newState.guild.channels.create({
                name: newState.member.user.username,
                type: Discord.ChannelType.GuildVoice,
            }).then(newVocalChannel => {
                console.log("Voice channel created")
                newVocalChannel.setParent(newState.guild.channels.cache.find(channel => channel.name == "Creation de salon").parent)
                    .then(() => {
                        console.log("Parent set")
                        newState.member.edit({ channel: newVocalChannel })
                        console.log("User state set")
                    }).catch(e => {
                        console.log(e)
                    })
            }).catch(e => {
                console.log(e)
            })
        }
    }

    if (oldState.channel != null) {
        if (oldState.channel.name != "Creation de salon" && oldState.channel.members.size == 0) {
            oldState.channel.delete(); // Delete the channel if empty and not named "Creation de salon"
        }
    }
});


// Handle message reaction addition
bot.on(Discord.Events.MessageReactionAdd, (reaction, user) => {
    console.log("Add role initiated !")
    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase())
    var role_kalliance = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == "kalliance")
    if (role) {
        var member = reaction.message.guild.members.cache.find(member => member.id == user.id)
        if (member) {
            member.addRole(role.id)
            if (!member.roles.cache.find(role => role.name.toLowerCase() == "kalliance")) {
                member.addRole(role_kalliance.id)
            }
        }
    }
})


// Handle message reaction removal
bot.on(Discord.Events.MessageReactionRemove, (reaction, user) => {
    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase())
    if (role) {
        var member = reaction.message.guild.members.cache.find(member => member.id == user.id)
        if (member) {
            member.removeRole(role.id)
        }
    }
})


// Handle guild member departure
// bot.on(Discord.Events.GuildMemberRemove, member => {
//     //Send a farewell message when a member leaves the guild
//     member.guild.channels.cache.find("name", "bienvenue").send(member + " vient de quitter le serveur :cry:. On ne l'oubliera jamais !\nIl etait un précieux partenaire :heart: !")
// })


// Log in the bot using the provided token from environment variables
bot.login(process.env.BOT_TOKEN)

/**
 * Utility function to capitalize the first letter of each word in a string.
 * @param {string} string - The original string.
 * @param {string} joiner - The string used to join each word.
 * @returns {string} - The modified string with capitalized words.
 */
module.exports.majuscule = function (string, joiner) {
    var words = string.split(" ")
    for (i = 0; i < words.length; i++) {
        var letter = words[i].split("")
        letter[0] = letter[0].toUpperCase()
        words[i] = letter.join("")
    }
    var msg = words.join(joiner)
    return msg
}

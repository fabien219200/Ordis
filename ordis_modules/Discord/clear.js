module.exports.suppr = function (message) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("Vous n'avez pas la permission d'effectuer cette commande. Veuillez vous référer aux membres ayant la permission \"Gerer les messages\".")
    } else {
        var effacer = message.content.split(" ")
        if (parseInt(effacer[1]) > 99) {
            message.channel.bulkDelete(100)
            effacer[1] = effacer[1] - 100
        } else {
            message.channel.bulkDelete(parseInt(effacer[1]) + 1)
        }
    }
}

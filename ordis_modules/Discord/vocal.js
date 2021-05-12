module.exports = {
    name: 'Vocal',
    description: 'Sets a new name and/or a limit for a channel',
    async execute(interaction) {
        var member = interaction.member
        if (member.voice.channel != null) {
            let vocalChannel = interaction.guild.channels.cache.find(channel => channel.id == member.voice.channel.id)
            if(interaction.options.find(option => option.name == "limite")) {
                var limit = interaction.options.find(option => option.name == "limite").value || null
                if(limit > 99) {
                    interaction.editReply("Veuillez entrer une limite inferieure ou egale a **99**!")
                    return
                }
            }
            if(interaction.options.find(option => option.name == "nom")) {
                var name = interaction.options.find(option => option.name == "nom").value || null
            }
            vocalChannel = await vocalChannel.setUserLimit(limit).catch(e => {
                console.log(e)
            })
            vocalChannel = await vocalChannel.setName(name).catch(e => {
                console.log(e)
            })
            interaction.editReply(`Le salon s'appelle desormais ${vocalChannel.name} avec comme limite ${vocalChannel.userLimit}`)
        } else {
            interaction.editReply("Veuillez utiliser cette commande dans un salon vocal !")
        }
    }
}

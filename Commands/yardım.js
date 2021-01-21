const { Discord, MessageEmbed } = require("discord.js")
const db = require("quick.db")
const Settings = require("../Settings/Settings.json")
const Other = require("../Settings/Other.json")
const prefix = Settings.BotSettings.prefix
exports.run = async(client, message, args) => {

    const embed = new MessageEmbed()
    .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
    .addField(`\`${prefix}erkek\``, `Erkek Üye Kaydı Yapar.`)
    .addField(`\`${prefix}kadın\``, `Kadın Üye Kaydı Yapar.`)
    .addField(`\`${prefix}isimler\``, `Üyenin İsimlerini Gösterir.`)
    .addField(`\`${prefix}stat\``, `Üyenin Statsını Gösterir.`)
    .setColor(Settings.Colors.Red)
    .setTimestamp()
    .setFooter(`Losint ♥ Development`)
    message.channel.send(embed)

}
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["yardım"],
        permLevel: 0
    };
    
    exports.help = {
        name: "yardım"
    }
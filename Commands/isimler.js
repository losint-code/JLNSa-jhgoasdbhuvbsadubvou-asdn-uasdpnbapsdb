const { Discord, MessageEmbed } = require("discord.js")
const db = require("quick.db")
const Settings = require("../Settings/Settings.json")
const Other = require("../Settings/Other.json")
exports.run = async(client, message, args) => {
  
  const yetkili = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(yetkili)) {
    return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));
  }

  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send(new MessageEmbed().setDescription("Bir Üye Etiketle Lütfen.").setTimestamp().setFooter("Losint ♥ Development").setColor(Settings.Colors.Red).setAuthor(user.user.avatarURL({ dynamic: true })))
  const check = await db.has(`isimler.${user.id}`)
  if (check === false) return message.channel.send(new MessageEmbed().setDescription("Bu üyenin herhangi bir ismine ulaşamadım.").setTimestamp().setFooter("Losint ♥ Development").setColor(Settings.Colors.Red).setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })))

  const fetch = await db.get(`isimler.${user.id}`)
  const isimler = fetch.length > 0 ? fetch.map((value, index) => `• No: **${index + 1}**\n• Yetkili: <@${value.Yetkili}>\n• Adı: \`${Settings.ServerSettings.Tag} ${value.İsim} | ${value.Yaş}\`\n• Rolü: <@&${value.Rol}>`).join(`\n\n`) : "Bu Üyenin Herhangi Bir İsim Verisi Bulunmamaktadır.";
  
  const embed = new MessageEmbed()
  .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setDescription(`${isimler}`)
  .setTimestamp()
  .setFooter(`Losint ♥ Development`)
  .setColor(Settings.Colors.Blue)
  message.channel.send(embed)
  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["isimler"],
    permLevel: 0
};

exports.help = {
    name: "isimler"
}
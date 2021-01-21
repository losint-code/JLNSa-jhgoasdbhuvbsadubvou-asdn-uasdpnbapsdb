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
  const check = await db.has(`${message.author.id}.toplam`)
  if (check === false) return message.channel.send(new MessageEmbed().setDescription("Bu üyenin herhangi bir stat bilgisine ulaşamadım.").setTimestamp().setFooter("Losint ♥ Development").setColor(Settings.Colors.Red).setAuthor(user.user.username, user.user.avatarURL({ dynamic: true })))

  const toplam = db.get(`${message.author.id}.toplam`)
  const erkek = db.get(`${message.author.id}.erkek`)
  const kadın = db.get(`${message.author.id}.kadın`)
  
  const embed = new MessageEmbed()
  .setTitle(`${user.user.username} Kullanıcısının Stat Bilgisi`)
  .setThumbnail(user.user.avatarURL({ dynamic: true }))
  .setDescription(`• Toplam Kayıt Sayısı: \`${toplam}\`
  • Erkek Kayıt Sayısı: \`${erkek}\`
  • Kadın Kayıt Sayısı: \`${kadın}\``)
  .setTimestamp()
  .setFooter(`Losint ♥ Development`)
  .setColor(Settings.Colors.Blue)
  message.channel.send(embed)
  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["stat"],
    permLevel: 0
};

exports.help = {
    name: "stat"
}
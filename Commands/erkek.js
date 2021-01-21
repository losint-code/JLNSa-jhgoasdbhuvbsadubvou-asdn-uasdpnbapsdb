const { Discord, MessageEmbed } = require("discord.js")
const db = require("quick.db")
const Settings = require("../Settings/Settings.json")
const Other = require("../Settings/Other.json")
exports.run = async(client, message, args) => {
  
  if(![(Settings.Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)

  const chat = Settings.Channels.GeneralChat
  const emoji = message.guild.emojis.cache.get(r => r.name (Settings.Other.Emoji5))
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
  let yaş = args[2]
  if (yaş < 13) return message.channel.send(new MessageEmbed().setDescription(`İsmini değiştiğin üyenin yaşı 13'ten küçük olamaz.`).setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }).setColor(Settings.Colors.Red).setTimestamp().setFooter(`Losint ♥ Development`)))

  if (!user) return message.channel.send(new MessageEmbed.setDescription("Bir Üye Etiketlemen Gerek Dostum.").setColor(Settings.Colors.Red).setFooter("Losint ♥ Development").setTimestamp())
  if (!isim) return message.channel.send(new MessageEmbed.setDescription("Bir İsim Girmelisin Dostum.").setColor(Settings.Colors.Red).setFooter("Losint ♥ Development").setTimestamp())
  if (!yaş) return message.channel.send(new MessageEmbed.setDescription("Bir Yaş Girmelisin Dostum.").setColor(Settings.Colors.Red).setFooter("Losint ♥ Development").setTimestamp())
  
  if (user.user.tag.includes(Settings.ServerSettings.Tag)) {
    user.setNickname(`${Settings.ServerSettings.Tag} ${isim} | ${yaş}`)
  } else {
    user.setNickname(`${Settings.ServerSettings.UnTag} ${isim} | ${yaş}`)
  }
  user.roles.add(Settings.Roles.BoyRole1)
  user.roles.add(Settings.Roles.BoyRole2)
  user.roles.remove(Settings.Roles.Unregister)
  
await db.push(`isimler.${user.id}`, {
    Yetkili: message.author.id,
    İsim: isim,
    Yaş: yaş,
    Rol: Settings.Roles.BoyRole1
  })
  
db.add(`${message.author.id}.erkek`, +1)
db.add(`${message.author.id}.toplam`, +1)
const toplam = await db.get(`${message.author.id}.toplam`)
const erkek = await db.get(`${message.author.id}.erkek`)
  
const embed = new MessageEmbed()
.setTitle(`Kaydın Tamamalandı ${user.user.username} !`)
.setThumbnail(user.user.avatarURL({ dynamic: true }))
.setDescription(`${Other.EmojiGeneral.Emoji1} • ${user}, ${message.author} Tarafından Kayıt Edildi.
${Other.EmojiGeneral.Emoji2} • İsmi \`${isim} | ${yaş}\` Olarak Değiştirildi.
${Other.EmojiGeneral.Emoji3} • Kullanıcıya <@&${Settings.Roles.BoyRole1}>, <@&${Settings.Roles.BoyRole2}> Rolleri Verildi.
${Other.EmojiGeneral.Emoji4} • ${message.author} Yetkilisinin Toplam \`${toplam}\` Kaydı Oldu.
`)
.setFooter(`Kullanıcının İsimlerine Bakmak İçin "${Settings.BotSettings.prefix}isimler" Yazabilirsiniz.`)
.setColor(Settings.Colors.Blue)
message.channel.send(embed)

const chatembed = new MessageEmbed()
.setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
.setDescription(`• ${user} Aramıza Hoşgeldin Dostum, Keyifli Vakit Geçirmeni Dilerim.`)
.setFooter(`${Settings.ServerSettings.ServerName}`)
.setTimestamp()
.setColor(Settings.Colors.Gold)
client.channels.cache.get(Settings.Channels.GeneralChat).send(chatembed)
  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}
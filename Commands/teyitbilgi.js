const { MessageEmbed, Client, Message } = require("discord.js");
const db = require("quick.db");
const Settings = require("../Settings/Settings.json");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  let cezarolu = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cezarolu)) {
    return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));
  }

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send("Bir üyeyi etiketlemelisin.")
  let check = await db.has(`kayıt.yetkilibilgiler.${message.author.id}`)
  if (check === false) return message.channel.send("Bu üyenin herhangi bir kayıt verisine ulaşamadım.")


  let fetch = await db.get(`kayıt.yetkilibilgiler.${message.author.id}`)
  let toplam = await db.get(`kayıt.${message.author.id}.toplam`) || 0
  let kadınsayı = await db.get(`kayıt.${message.author.id}.kadın`) || 0
  let erkeksayı = await db.get(`kayıt.${message.author.id}.erkek`) || 0

  let embed = new MessageEmbed()
    .setAuthor(user.user.tag, user.user.avatarURL({ dynamic: true }))
    .setTitle("Teyit Bilgisi")
    .setThumbnail(user.user.avatarURL({ dynamic: true }))
    .setDescription(`• **Toplam Kayıt:** \`${toplam}\`
• Kadın Kayıt: \`${kadınsayı || "0"}\`
• Erkek Kayıt: \`${erkeksayı || "0"}\`

**İlk Kayıt Ettiği Kişi**
• **No:** 1
• ID: \`${fetch[0].Registered}\` (<@${fetch[0].Registered}>) 
• Ad: \`${fetch[0].Name}\`
• Yaş: \`${fetch[0].Age}\`
• Cinsiyet: **${fetch[0].Rol}**

**Son Kayıt Ettiği Kişi**
• **No:** ${fetch.length}
• ID: \`${fetch[fetch.length - 1].Registered}\` (<@${fetch[fetch.length - 1].Registered}>)
• Ad: \`${fetch[fetch.length - 1].Name}\`
• Yaş: \`${fetch[fetch.length - 1].Age}\`
• Cinsiyet: **${fetch[fetch.length - 1].Rol}**
`)
.setColor(Settings.Colors.Gold)
message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["teyitbilgi"  , "teyit-bilgi", "tbilgi", "bilgi"]
};

module.exports.help = {
  name: 'teyitbilgi'
};
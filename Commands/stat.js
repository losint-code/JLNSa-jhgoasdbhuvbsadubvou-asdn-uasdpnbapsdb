const { MessageEmbed, Client, Message } = require("discord.js");
const db = require("quick.db");
const Settings = require("../Settings/Settings.json");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  let cezarolu = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cezarolu)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send("Bir üyeyi etiketlemelisin.")
  let check = await db.has(`kayıt.yetkili.bilgiler.${message.author.id}`)
  if (check === false) return message.channel.send("Bu üyenin herhangi bir kayıt verisine ulaşamadım.")

  let fetch = await db.get(`kayıt.yetkili.bilgiler.${message.author.id}`)
  let isimler = fetch.length > 0 ? fetch.map((value, index) => `• No: **${index + 1}** \n• Yetkili: <@${value.Registerer}> \n• Adı: \`${Settings.ServerSettings.Tag} ${value.Name} | ${value.Age}\` \n• Cinsiyeti: **${value.Rol}**`).join(`\n\n`) : "Bu üyenin geçmiş isimleri bulunamadı!";
  let kadınsayı = await db.get(`kayıt.${message.author.id}.kadın`)
  let erkeksayı = await db.get(`kayıt.${message.author.id}.erkek`)
  let toplam = await db.get(`kayıt.${message.author.id}.toplam`)

  const embed = new MessageEmbed()
  .setTimestamp()
  .setColor(Settings.Colors.Gold)
  .setFooter(`Losint ♥ Development`)
  .setDescription(`[+] ${user.user.username} Yetkilisinin Kaydettiği Kişiler [+] \n\n• Toplam Kaydettiği Kişi: ${toplam} \nToplam Kaydettiği Kadın: ${kadınsayı || "0"} \nToplam Kaydettiği Erkek: ${erkeksayı || "0"} \n\n${isimler}`, { code: 'yaml', split: true })
  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["stat", "stats"]
};

module.exports.help = {
  name: 'stat'
};
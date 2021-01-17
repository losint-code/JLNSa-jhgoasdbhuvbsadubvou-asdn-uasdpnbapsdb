const { MessageEmbed, Client, Message } = require("discord.js");
const Settings = require("../Settings/Settings.json")
module.exports.run = async (client, message, args) => {

  let cezarolu = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cezarolu)) return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetki").setDescription(`**\`»\`** Bu komutu kullanabilmek için \`Admin\` veya \`Kayıt Sorumlusu\` yetkisine sahip olman gerekmekte.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  if (message.channel.id !== Settings.Channels.RegisterChat) return message.channel.send(`Burası bir kayıt kanalı değil. Kayıt kanalı: <#${Settings.Channels.RegisterChat}>`)

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!args[1]) return message.channel.send("Bir isim girmelisin. Eğer boşluk bırakmak istersen `_` işaretini kullanabilirsin.")
  if (!args[2]) return message.channel.send("Bir yaş girmelisin.")
  let name = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
  let age = args[2]
  if (age < 13) return message.channel.send(`İsmini değiştiğin üyenin yaşı 13'ten küçük olamaz.`)

  if (!user) return message.channel.send("İsmini değiştireceğin kişiyi etiketlemelisin.")
  if (!name) return message.channel.send("İsmini değiştireceğin kişinin ismini yazmalısın.")
  if (!age) return message.channel.send("İsmini değiştireceğin kişinin yaşını yazmalısın.")

  user.setNickname(`${Settings.ServerSettings.Tag} ${name} | ${age}`)

  const embed = new MessageEmbed()
  .setDescription(`Başarıyla ${user} üyesinin ismi değişti.`)
  .setColor(Settings.Colors.Gold)
  .setTimestamp()
.setFooter("Losint ♥ Development")
  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim", "i"]
};

module.exports.help = {
  name: 'isim'
};
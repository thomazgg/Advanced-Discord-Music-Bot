const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "membercount",
  category: "🔰 Info",
  aliases: ["members"],
  cooldown: 2,
  usage: "membercount",
  description: "Mostra o total de membros no servidor",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`${message.author.username}, Neste momento temos \`${message.guild.memberCount}\` Membros no servidor.`)
        .setFooter(`${message.author.tag} • Informacão`, message.author.displayAvatarURL())
        .setTimestamp()
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Erro: Um erro ocorreu`)
      );
    }
  }
}

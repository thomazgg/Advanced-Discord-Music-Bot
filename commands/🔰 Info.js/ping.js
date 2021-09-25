const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "ping",
  category: "🔰 Info",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Dá informações sobre a velocidade(ping) com que o Bot pode te responder",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ping} Pingando....`)
      ).then(msg => {
        msg.edit(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ping} Ping: \`${Math.round(Date.now() - message.createdTimestamp)}ms\`\n\n${emoji.msg.ping} Latência Api: \`${Math.round(client.ws.ping)}ms\``)
        );
      })
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

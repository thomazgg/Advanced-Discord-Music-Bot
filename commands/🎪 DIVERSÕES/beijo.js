const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "beijo",
  category: "🎪 DIVERSÕES",
  aliases: ["beijos"],
  cooldown: 2,
  usage: "beijo",
  description: "Dá informações sobre seu cu",
  run: async (client, message, args, user, text, prefix) => {
    try {
        var list = [
          'https://imgur.com/NH8oqjK.gif',
          'https://i.imgur.com/sGVgr74.gif',
          'https://i.imgur.com/8LKPbOf.gif',
          'https://i.imgur.com/TItLfqh.gif'
        ];
      
        var rand = list[Math.floor(Math.random() * list.length)];
        let pessoa = message.mentions.user || client.user.cache.get(args[0]);
        
        if (!pessoa) return message.channel.send(`:x: | ${message.author} Mencione alguém para beijar!`);
      
        let ferinha = new Discord.MessageEmbed()
        .setTitle(`💋 Beijo 😘`)
        .setDescription(`💓 ${message.author} beijou ${pessoa}!`)
        .setImage(rand)
        .setTimestamp()
        .setColor("YELLOW")
        .setThumbnail(message.author.displayAvatarURL({format:"png"}))
        .setFooter(`Comando feito por: Ferinha :>`, message.author.displayAvatarURL({format:"png"}));
      
        message.channel.send(ferinha)
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

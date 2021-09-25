const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `prefix`,
  aliases: [`prefix`],
  category: `⚙️ Settings`,
  description: `Muda o prefixo do BOT`,
  usage: `prefix <NEW PREFIX>`,
  memberpermissions: [`ADMINISTRATOR`],
  run: async (client, message, args) => {
    try {
      //get the current prefix from the database
      let prefix = client.settings.get(message.guild.id, `prefix`);
      //if not in the database for some reason use the default prefix
      if (prefix === null) prefix = config.prefix;
      //if no args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro: Forneça um novo prefixo!`)
          .setDescription(`Current prefix: \`${prefix}\``)
        );
      //if there are multiple arguments
      if (args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro: O prefixo não pode ter dois espaços`)
        );
      //if the prefix is too long
      if (args[0].length > 5)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro: O prefixo não pode ser mais longo do que \`5\``)
        );
      //set the new prefix
      client.settings.set(message.guild.id, args[0], `prefix`);
      //return success embed
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Erro: Novo prefixo definido para **\`${args[0]}\`**`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Erro: Um erro ocorreu`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};

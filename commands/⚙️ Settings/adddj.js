const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `adddj`,
  aliases: [`adddjrole`],
  category: `⚙️ Settings`,
  description: `Defini um cargo de DJ (como um array, ou seja, você pode ter vários)`,
  usage: `adddj @role`,
  memberpermissions: [`ADMINISTRATOR`],
  run: async (client, message, args) => {
    try {
      //get the role of the mention
      let role = message.mentions.roles.first();
      //if no pinged role return error
      if (!role)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro: Adicione um cargo, @role!`)
        );
      //try to find the role in the guild just incase he pings a role of a different server
      try {
        message.guild.roles.cache.get(role.id);
      } catch {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro: Parece que esse cargo não existe neste Servidor!`)
        );
      }
      //if ther role is already in the Database, return error
      if (client.settings.get(message.guild.id, `djroles`).includes(role.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro: Este cargo já está na lista!`)
        );
      //push it into the database
      client.settings.push(message.guild.id, role.id, `djroles`);
      //these lines creates a string with all djroles
      let leftb = ``;
      if (client.settings.get(message.guild.id, `djroles`).join(``) === ``) leftb = `Nenhum cargo de Dj, ou seja, todos os usuários são Djs`
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          leftb += `<@&` + client.settings.get(message.guild.id, `djroles`)[i] + `> | `
        }

      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Sucesso: Adicionado o cargo de DJ \`${role.name}\``)
        .setDescription(`All Dj Roles:\n> ${leftb.substr(0, leftb.length - 3)}`)
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

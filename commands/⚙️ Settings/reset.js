const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `reset`,
  aliases: [`hardreset`],
  category: `⚙️ Settings`,
  description: `Redefine / exclui todas as configurações e o prefixo!`,
  usage: `reset`,
  memberpermissions: [`ADMINISTRATOR`],
  run: async (client, message, args) => {
    try {
      //if not enough permissions aka not the guild owner, return error
      if (message.member.guild.owner.id !== message.author.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error: Você não tem permissão para este comando! *Apenas um adm pode fazer isso*`)
        );
      //ask for second yes
      let themsg = message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`Tem certeza de que deseja redefinir todas as CONFIGURAÇÕES?`)
        .setDescription(`*Reply with:* **__\`yes\`__**`)
      ).then((msg) => {
        //wait for answer of the right user
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 30 * 1000,
            errors: ['time']
          })
          //after right user answered
          .then(async collected => {
            //and if its yes
            if (collected.first().content.toLowerCase() === `yes`) {
              //reset the database of the setup
              client.setups.set(message.guild.id, {
                textchannel: `0`,
                voicechannel: `0`,
                category: `0`,
                message_cmd_info: `0`,
                message_queue_info: `0`,
                message_track_info: `0`
              });
              //reset the settings like prefix djroles and botchannels
              client.settings.set(message.guild.id, {
                prefix: config.prefix,
                djroles: [],
                botchannel: [],
              });
              //send the success message
              return message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.SUCCESS} Success | Resetted everything!`)
                .setDescription(`O prefixo agora é novamente: \`${config.prefix}\`\nFoi redefinido a configuração, excluido os cargos de DJ e apagado chats de bot`)
              );
            }
            //if an error happens, reply
          }).catch(e => {
            console.log(String(e.stack).yellow)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Erro: CANCELADO PQ NÃO É A PALAVRA CERTA / TEMPO ESGOTADO!`)
            );
          })
      });
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

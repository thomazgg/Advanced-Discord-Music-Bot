const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "settings",
  category: "⚙️ Settings",
  aliases: ["musicsettings", "config"],
  cooldown: 10,
  usage: "settings",
  description: "Mostra as configurações atuais, como Premium, quais comandos estão APENAS no DJ, cargos de DJ e chats de bot ....",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      //these lines creates the string for all botchannels
      let leftb = "";
      if (client.settings.get(message.guild.id, `botchannel`).join("") === "") leftb = "Nenhum canal"
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
          leftb += "<#" + client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
        }
      //these lines creates a string with all djroles
      let leftd = "";
      if (client.settings.get(message.guild.id, `djroles`).join("") === "") leftd = "Nenhum cargo"
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          leftd += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
        }
      //these lines creates a string with all dj-only-cmds
      let leftdj = "";
      if (client.settings.get(message.guild.id, `djonlycmds`).sort(function (a, b) {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        }).join("") === "") leftdj = "Nenhum DJonlyCommands"
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djonlycmds`).length; i++) {
          leftdj += "`" + client.settings.get(message.guild.id, `djonlycmds`)[i] + "` | "
        }

      let ownerstringarray = "";
      for (let i = 0; i < config.ownerIDS.length; i++) {
        try {
          let user = await client.users.fetch(config.ownerIDS[i]);
          ownerstringarray += `${user.tag} /`
        } catch {}
      }

      ownerstringarray = ownerstringarray.substr(0, ownerstringarray.length - 2);

      let db = client.setups.get(message.guild.id)

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setThumbnail(message.guild.iconURL({
          dynamic: true
        }))
        .addField(`${emoji.msg.bot} Bot Channels`, leftb.substr(0, leftb.length - 3).substr(0, 1024), true)
        .addField(`${emoji.msg.dj} DJ Roles`, leftd.substr(0, leftb.length - 3).substr(0, 1024), true)
        .addField(`${emoji.msg.setup} Setup`, `VoiceChannel: ${db.voicechannel != 0 ? message.guild.channels.cache.get(db.voicechannel).name  : `${emoji.msg.ERROR} Disabled`}\nTextChannel: ${db.textchannel != 0 ? message.guild.channels.cache.get(db.textchannel).name  : `${emoji.msg.disabled} Disabled`}`, true)
        .addField(`${emoji.msg.dj} DJ-Only-Commands`, leftdj.substr(0, leftdj.length - 3).substr(0, 1024), true)
      )
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Erro: Um erro ocorreu`)
        .setDescription(`${e.message}`)
      );
    }
  },
};
const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "djmode",
  category: "🔰 Info",
  aliases: ["djonlymode"],
  cooldown: 5,
  usage: "djmode",
  description: "Mostra se existe um modo somente DJ / não e todas as configurações de DJ..",
  run: async (client, message, args, user, text, prefix) => {
    try {
      //create the string of all djs and if he is a dj then set it to true
      let isdj = false;
      let leftb = "";
      if (client.settings.get(message.guild.id, `djroles`).join("") === "")
        leftb = "Nenhum cargo de Dj, ou seja, todos os usuários são Djs"
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          if (message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
          if (!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
          leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + ">\n"
        }

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle("💢 Dj Mode")
        .setDescription("Se um comando estiver listado aqui, e pelo menos um cargo existir, isso significa que você deve ter este cargo, a fim de ser capaz de usar esses comandos listados")
        .addField("⚠️ Dj Only Commands active for:", `\`${client.settings.get(message.guild.id, `djonlycmds`).sort(function(a, b){if(a < b) { return -1; }if(a > b) { return 1; }  return 0;}).join("`, `")}\``.substr(0, 1024))
        .addField("🎧 Dj Roles", `${leftb ? leftb.length < 0 ? "Nenhum cargo de Dj, ou seja, todos os usuários são Djs" : leftb.substr(0, leftb.length-2) : "Nenhum cargo de Dj, ou seja, todos os usuários são Djs"}`, true)
        .setFooter(ee.footertext, ee.footericon)
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
}

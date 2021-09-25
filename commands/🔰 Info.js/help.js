const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo, ajuda"],
  cooldown: 4,
  usage: "help [Command]",
  description: "Retorna todos os comandos ou um comando específico",
  run: async (client, message, args, user, text, prefix) => {
    try {
      if (args[0]) {
        const embed = new MessageEmbed();
        const cmd =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (!cmd) {
          cat = client.categories.find((cat) =>
            cat.toLowerCase().includes(args[0].toLowerCase())
          );
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(
            embed
              .setColor(ee.wrongcolor)
              .setDescription(
                `Nenhuma informação encontrada para o comando **${args[0].toLowerCase()}**`
              )
          );
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``);
          const n = 3;
          const result = [[], [], []];
          const wordsPerLine = Math.ceil(items.length / 3);
          for (let line = 0; line < n; line++) {
            for (let i = 0; i < wordsPerLine; i++) {
              const value = items[i + line * wordsPerLine];
              if (!value) continue;
              result[line].push(value);
            }
          }

          const embed = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(
              `Para ver as descrições e informações dos comandos, digite: ${config.prefix}help [CMD NAME]`,
              client.user.displayAvatarURL()
            );

          if (category.toLowerCase().includes("custom")) {
            const cmd =
              client.commands.get(items[0].split("`").join("").toLowerCase()) ||
              client.commands.get(
                client.aliases.get(items[0].split("`").join("").toLowerCase())
              );
            try {
              embed.addField(
                `**${category.toUpperCase()} [${items.length}]**`,
                `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``
              );
            } catch {}
          } else {
            try {
              embed.addField(`\u200b`, `> ${result[0].join("\n> ")}`, true);
            } catch {}
            try {
              embed.addField(
                `\u200b`,
                `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`,
                true
              );
            } catch {}
            try {
              embed.addField(
                `\u200b`,
                `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`,
                true
              );
            } catch {}
          }
          return message.channel.send(embed);
        }
        if (cmd.name) embed.addField("**Nome do comando**", `\`${cmd.name}\``);
        if (cmd.name)
          embed.setTitle(`Informações detalhadas sobre: \`${cmd.name}\``);
        if (cmd.description)
          embed.addField("**Descrição**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases)
          try {
            embed.addField(
              "**Aliases**",
              `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``
            );
          } catch {}
        if (cmd.cooldown)
          embed.addField("**Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField(
            "**Usage**",
            `\`\`\`${config.prefix}${cmd.usage}\`\`\``
          );
          embed.setFooter(
            "Syntax: <> = required, [] = optional",
            ee.footericon
          );
        }
        if (cmd.useage) {
          embed.addField(
            "**Useage**",
            `\`\`\`${config.prefix}${cmd.useage}\`\`\``
          );
          embed.setFooter(
            "Syntax: <> = required, [] = optional",
            ee.footericon
          );
        }
        return message.channel.send(embed);
      } else {
        let userperms = message.member.hasPermission("ADMINISTRATOR");
        let owner = config.ownerIDS.includes(message.author.id);
        let cmduser = message.author.id;

        //  OLD HELP COMMAND
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle("☕ ✦ Menu de Ajuda ୨୧ Comandos Principais")
          .addField(
            "• Developer",
            `\`\`\`yml\nName: thomaz#5472 [ID:356335506151178242]\`\`\``
          )
          .addField(
            "• Links importantes",
            `**[Link para convidar o bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Discord Server](https://discord.gg/DJuK4KGa94)\`|\`[Youtube](https://www.youtube.com/c/uthomaz/videos)**`
          )
          .setFooter(
            `Para ver as descrições e informações dos comandos, digite: ${config.prefix}help [CMD NAME]`,
            client.user.displayAvatarURL()
          );
        const embed2 = new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle("🎶 ✦ Menu de Ajuda ୨୧ Comandos de Musica")
          .setFooter(
            `Para ver as descrições e informações dos comandos, digite: ${config.prefix}help [CMD NAME]`,
            client.user.displayAvatarURL()
          );
        const commands = (category) => {
          return client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``);
        };
        try {
          for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i];
            const items = commands(current);
            const n = 3;
            const result = [[], [], []];
            const wordsPerLine = Math.ceil(items.length / 3);
            for (let line = 0; line < n; line++) {
              for (let i = 0; i < wordsPerLine; i++) {
                const value = items[i + line * wordsPerLine];
                if (!value) continue;
                result[line].push(value);
              }
            }
            if (current.toLowerCase().includes("administration")) {
              if (!message.member.hasPermission("ADMINISTRATOR")) continue;
            }
            if (current.toLowerCase().includes("owner")) {
              if (!config.ownerIDS.includes(message.author.id)) continue;
            }
            if (
              current.toLowerCase().includes("music") ||
              current.toLowerCase().includes("filter")
            ) {
              try {
                embed2.addField(
                  `**${current.toUpperCase()} [${items.length}]**`,
                  `> ${result[0].join("\n> ")}`,
                  true
                );
              } catch {}
              try {
                embed2.addField(
                  `\u200b`,
                  `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`,
                  true
                );
              } catch {}
              try {
                embed2.addField(
                  `\u200b`,
                  `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`,
                  true
                );
              } catch {}
              continue;
            }
            if (current.toLowerCase().includes("custom")) {
              const cmd =
                client.commands.get(
                  items[0].split("`").join("").toLowerCase()
                ) ||
                client.commands.get(
                  client.aliases.get(items[0].split("`").join("").toLowerCase())
                );
              if (!cmd) {
                continue;
              }
              try {
                embed2.addField(
                  `**${current.toUpperCase()} [${items.length}]**`,
                  `> \`${items[0]}\`\n**Usage:**\n> \`${cmd.usage}\``
                );
              } catch {}
              continue;
            }
            try {
              embed.addField(
                `**${current.toUpperCase()} [${items.length}]**`,
                `> ${result[0].join("\n> ")}`,
                true
              );
            } catch {}
            try {
              embed.addField(
                `\u200b`,
                `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`,
                true
              );
            } catch {}
            try {
              embed.addField(
                `\u200b`,
                `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`,
                true
              );
            } catch {}
          }
        } catch (e) {
          console.log(String(e.stack).red);
        }
        message.channel.send(embed);
        return message.channel.send(embed2);
      }
    } catch (e) {
      console.log(String(e.stack).bgRed);
      return message.channel.send(
        new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro: Um erro ocorreu`)
          .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};

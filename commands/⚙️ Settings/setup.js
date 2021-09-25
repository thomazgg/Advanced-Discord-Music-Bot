const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");

module.exports = {
  name: "setup",
  category: "⚙️ Settings",
  aliases: ["musicsetup"],
  cooldown: 10,
  usage: "setup",
  description: "Cria uma configuração de música exclusiva para solicitar músicas!",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      let musiccmds = [];
      const commands = (category) => {
        return client.commands
          .filter((cmd) => cmd.category.toLowerCase().includes("music"))
          .map((cmd) => `\`${cmd.name}\``);
      };
      for (let i = 0; i < client.categories.length; i += 1) {
        if (client.categories[i].toLowerCase().includes("music")) {
          musiccmds = commands(client.categories[i]);
        }
      }
      //get the old setup
      let oldsetup = client.setups.get(message.guild.id);
      //try to delete every single entry if there is a setup
      if (oldsetup.textchannel != "0") {
        try {
          message.guild.channels.cache
            .get(oldsetup.textchannel)
            .delete()
            .catch((e) =>
              console.log(
                "Não foi possível excluir a mensagem (isso é para evitar um bug)".gray
              )
            );
        } catch { }
        try {
          message.guild.channels.cache
            .get(oldsetup.voicechannel)
            .delete()
            .catch((e) =>
              console.log(
                "Não foi possível excluir a mensagem (isso é para evitar um bug)".gray
              )
            );
        } catch { }
        try {
          message.guild.channels.cache
            .get(oldsetup.category)
            .delete()
            .catch((e) =>
              console.log(
                "Não foi possível excluir a mensagem (isso é para evitar um bug)".gray
              )
            );
        } catch { }
      }
      //create a new Cateogry
      message.guild.channels
        .create(`╭──── 🍷  ✦ boate`, {
          type: "category",
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: ["VIEW_CHANNEL"],
            },
          ],
        })
        .then((channel1) => {
          try {
            //set the maximumbitrate limit
            let maxbitrate = 96000;
            //get the boosts amount
            let boosts = message.guild.premiumSubscriptionCount;
            //change the bitrate limit regarding too boost level from https://support.discord.com/hc/de/articles/360028038352-Server-Boosting-
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;

            message.guild.channels
              .create(`🎧｜Music`, {
                type: "voice", //voice Channel
                bitrate: maxbitrate, //set the bitrate to the maximum possible
                userLimit: 10, //set the limit for voice users
                parent: channel1.id, //ADMINISTRATOR
                permissionOverwrites: [
                  {
                    id: message.guild.id,
                    allow: ["VIEW_CHANNEL", "CONNECT"],
                  },
                ],
              })
              .then((channel2) => {
                try {
                  message.guild.channels
                    .create(`🎵╺╸playlist`, {
                      type: "text", // text channel
                      rateLimitPerUser: 6, //set chat delay
                      topic: `Para solicitar uma faixa, simplesmente digite o ** SONG NAME ** no canal ou a ** URL ** e o bot irá reproduzi-la! Certifique-se de que está no Canal de Voz ** certo ** (🎧 ｜ Música)!\n\n`,
                      parent: channel1.id,
                      permissionOverwrites: [
                        {
                          id: message.guild.id,
                          allow: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "ADD_REACTIONS",
                          ],
                        },
                        {
                          //giving the Bot himself permissions
                          id: client.user.id,
                          allow: [
                            "MANAGE_MESSAGES",
                            "MANAGE_CHANNELS",
                            "ADD_REACTIONS",
                            "SEND_MESSAGES",
                            "MANAGE_ROLES",
                          ],
                        },
                      ],
                    })
                    .then(async (channel3) => {
                      message.reply(`Setting up in <#${channel3.id}>`);
                      let embed1 = new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle("🔎 ┃ Guia")
                        .setDescription(
                          `Digite o nome da música ou URL para tocar uma música\n\nVocê também pode digitar \`${prefix}command <Parameters>\``
                        )
                        .addField(`Comandos`, musiccmds.join(", "))
                        .addField(
                          `Reactions`,
                          `${emoji.msg.rewind} Retroceder 20s\n${emoji.msg.forward} Avançar 20s\n${emoji.msg.pause_resume} Pausar / Retomar\n${emoji.msg.stop} Parar fila\n${emoji.msg.previous_track} Tocar anterior\n`,
                          true
                        )
                        .addField(
                          `\u200b`,
                          `${emoji.msg.skip_track} Pular / Avançar\n${emoji.msg.replay_track} Repetir faixa\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Volume mudo`,
                          true
                        )
                        .addField(
                          `\u200b`,
                          `${emoji.msg.repeat_mode} Modo de repetição\n${emoji.msg.autoplay_mode} Reprodução automática\n${emoji.msg.shuffle} Ordem aleatória\n${emoji.msg.show_queue} Mostrar a fila\n${emoji.msg.show_current_track} Mostra a fila atual`,
                          true
                        );
                      let embed2 = new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle("Bot de Música Avançado | Fila de música")
                        .setDescription(
                          `Empty\nEntre em um canal de voz e coloque músicas na fila por nome ou url aqui.`
                        )
                        .setImage("https://static.wixstatic.com/media/f93e5a_743546c08b32481dbdea1b484f3ac673~mv2.gif")
                      let embed3 = new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(
                          "Bot de Música Avançado | Atualmente nenhuma música está tocando!"
                        )
                        .setDescription(
                          `Entre em um canal de voz e digite o nome da música ou url para tocar.\n**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/KRX2tgNA7R)\`|\`[Youtube](https://www.youtube.com/channel/UCINCfgiBYCykOemiuVhqtIQ/)**`
                        )
                        .setImage("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")

                      //send a temp message
                      channel3
                        .send(
                          new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription("Configurando..")
                        )
                        .then((msg) => {
                          //react with embed 1
                          msg.edit(embed1);
                          //save it in the database
                          client.setups.set(
                            message.guild.id,
                            msg.id,
                            "message_cmd_info"
                          );
                          //send another message
                          channel3
                            .send(
                              new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription("Configurando..")
                            )
                            .then((msg) => {
                              //edit the message again
                              msg.edit(embed2);
                              //save it in the database
                              client.setups.set(
                                message.guild.id,
                                msg.id,
                                "message_queue_info"
                              );
                              //send an message again
                              channel3
                                .send(
                                  new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription("Configurando..")
                                )
                                .then(async (msg) => {
                                  //edit the message
                                  msg.edit(embed3);
                                  //react with all reactions
                                  await msg.react(emoji.react.rewind); //rewind 20 seconds
                                  await msg.react(emoji.react.forward); //forward 20 seconds
                                  await msg.react(emoji.react.pause_resume); //pause / resume
                                  await msg.react(emoji.react.stop); //stop playing music
                                  await msg.react(emoji.react.previous_track); //skip back  track / (play previous)
                                  await msg.react(emoji.react.skip_track); //skip track / stop playing
                                  await msg.react(emoji.react.replay_track); //replay track
                                  await msg.react(emoji.react.reduce_volume); //reduce volume by 10%
                                  await msg.react(emoji.react.raise_volume); //raise volume by 10%
                                  await msg.react(emoji.react.toggle_mute); //toggle mute
                                  await msg.react(emoji.react.repeat_mode); //change repeat mode --> track --> Queue --> none
                                  await msg.react(emoji.react.autoplay_mode); //toggle autoplay mode
                                  await msg.react(emoji.react.shuffle); //shuffle the Queue
                                  await msg.react(emoji.react.show_queue); //shows the Queue
                                  await msg.react(
                                    emoji.react.show_current_track
                                  ); //shows the current Track
                                  //create the collector
                                  //save all other datas in the database
                                  client.setups.set(
                                    message.guild.id,
                                    msg.id,
                                    "message_track_info"
                                  );
                                  client.setups.set(
                                    message.guild.id,
                                    channel3.id,
                                    "textchannel"
                                  );
                                  client.setups.set(
                                    message.guild.id,
                                    channel2.id,
                                    "voicechannel"
                                  );
                                  client.setups.set(
                                    message.guild.id,
                                    channel1.id,
                                    "category"
                                  );
                                  client.stats.inc("global", "setups");
                                });
                            });
                        });
                    });
                  //catch all errors
                } catch (e) {
                  //log them
                  console.log(String(e.stack).red);
                  //send information
                  return message.channel.send(
                    new MessageEmbed()
                      .setColor(ee.wrongcolor)
                      .setFooter(ee.footertext, ee.footericon)
                      .setTitle(
                        `${emoji.msg.ERROR} Erro: Um erro ocorreu`
                      )
                      .setDescription(
                        String("```" + e.stack + "```").substr(0, 2048)
                      )
                  );
                }
              });
          } catch (e) {
            //log them
            console.log(String(e.stack).red);
            //send information
            return message.channel.send(
              new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Erro: Um erro ocorreu`)
                .setDescription(String("```" + e.stack + "```").substr(0, 2048))
            );
          }
        });
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

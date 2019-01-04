var fs = require('fs');
var Discord = require("discord.js");
let kicks = JSON.parse(fs.readFileSync("Storage/kicks.json", "utf8"));

module.exports.run = async (bot, message, args, msg) => {

  if (message.member.roles.some(r => ['Moderator'].includes(r.name))) {

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("De command is ``!kick <@usser> <reden>`` :warning: **Let op het is spatie gevoelig** :warning:");
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("De command is ``!kick <@usser> <reden>`` :warning: **Let op het is spatie gevoelig** :warning:");


    if(!kicks[kUser.id]) kicks[kUser.id] = {
      kicks: 0
    };

    kicks[kUser.id].kicks++;

    fs.writeFile("Storage/kicks.json", JSON.stringify(kicks), (err) => {
      if (err) console.log(err);
    });

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#A70000")
    .addField("Gekickt door", `<@${message.author.id}>`)
    .addField("Gekickte member", kUser)
    .addField("Gekickt in", message.channel)
    .addField("Reden", reason );

    let kickChannel = message.guild.channels.get(`519403879130071040`);
    if(!kickChannel) return message.channel.send("Kan de channel niet vinden ");

    message.guild.member(kUser).kick(reason);
    kickChannel.send(kickEmbed);



  } else {
    message.channel.send("U kunt dit niet! Hiervoor moet u de rol ``Moderator`` hebben.")
  }


}

module.exports.config = {
    command: "kick"
}

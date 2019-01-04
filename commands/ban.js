var fs = require('fs');
var Discord = require("discord.js");
let bans = JSON.parse(fs.readFileSync("Storage/bans.json", "utf8"));

module.exports.run = async (bot, message, args, msg) => {


  if (message.member.roles.some(r => ['Moderator'].includes(r.name))) {

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("De command is ``!ban <@usser> <reden>`` :warning: **Let op het is spatie gevoelig** :warning:");
    let reason = args.slice(1).join(' ');
    if(!reason) return message.channel.send("De command is ``!ban <@usser> <reden>`` :warning: **Let op het is spatie gevoelig** :warning:");


    if(!bans[bUser.id]) bans[bUser.id] = {
      bans: 0
    };

    bans[bUser.id].bans++;

    fs.writeFile("Storage/bans.json", JSON.stringify(bans), (err) => {
      if (err) console.log(err);
    });

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#FF0000")
    .addField("Geband door", `<@${message.author.id}>`)
    .addField("Banned member", bUser)
    .addField("Geband in", message.channel)
    .addField("Reden", reason );

    let banChannel = message.guild.channels.get(`519403879130071040`);
    if(!banChannel) return message.channel.send("Kan de channel niet vinden ");

    message.guild.member(bUser).ban(reason);
    banChannel.send(banEmbed);






    } else {
      message.channel.send("U kunt dit niet! Hiervoor moet u de rol ``Moderator`` hebben.")
    }
}
module.exports.config = {
    command: "ban"
}

var fs = require('fs');
var Discord = require("discord.js");
let warns = JSON.parse(fs.readFileSync("Storage/warnings.json", "utf8"));

module.exports.run = async (bot, message, args, msg) => {

  if (message.member.roles.some(r => ['Moderator'].includes(r.name))) {

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send("De command is ``!warn <@usser> <reden>`` :warning: **Let op het is spatie gevoelig** :warning:");
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send('De command is ``!warn <@usser> <reden>`` :warning: **Let op het is spatie gevoelig** :warning:')

    if(!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("Storage/warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("~Warn~")
    .setColor("#fc6400")
    .addField("gewarnt door", `<@${message.author.id}>`)
    .addField("Warnend member", wUser)
    .addField("Warned in", message.channel)
    .addField("Nummer of warn's", warns[wUser.id].warns)
    .addField("Reden", reason );

    let warnChannel = message.guild.channels.get(`519403879130071040`);
    if(!warnChannel) return message.channel.send("Kan de channel niet vinden ");

    warnChannel.send(warnEmbed);



  } else {
    message.channel.send("U kunt dit niet! Hiervoor moet u de rol ``Moderator`` hebben.")
  }


}

module.exports.config = {
    command: "warn"
}

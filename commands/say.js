const Discord = require("discord.js");

module.exports.run = async (bot, message, args, msg) => {
    if(!message.content.startsWith("!")) return;
    if (message.member.roles.some(r => ['Moderator'].includes(r.name))) {
    let botmessage = args.slice(1).join(' ');
    let channel = args[0]
    if(!channel) return message.channel.send('De command is ``!say <channel> <bericht>`` :warning: **Let op het is spatie gevoelig** :warning:');
    if(!botmessage) return message.channel.send('De command is ``!say <channel> <bericht>`` :warning: **Let op het is spatie gevoelig** :warning:');
    message.delete().catch();
    var displayAvatarURL = message.author.displayAvatarURL


    // channel = channel.trim().replace('#', '');

    let sayEmbed = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setDescription(botmessage)
    .setTimestamp()
    .setFooter(`Geschreven door: ${message.author.tag}`, displayAvatarURL);


    let sayChannel = message.guild.channels.get(`${channel}` );
    if(!sayChannel) return message.channel.send(`Kan de channel ${channel} niet vinden `);


  sayChannel.send(sayEmbed);



  } else {
    message.channel.send("U kunt dit niet! Hiervoor moet u de rol ``Moderator`` hebben.")
}

}

module.exports.config = {
  command: "say"
}

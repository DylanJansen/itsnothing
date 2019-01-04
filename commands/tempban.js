const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

let bans = JSON.parse(fs.readFileSync("Storage/bans.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith("!")) return;

  if (message.member.roles.some(r => ['Moderator'].includes(r.name))) {

  let tbuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reason = args.join(" ").slice(22);
  if(!tbuser) return message.reply("Kan member niet vinden");

  let tbtime = args[1];
  if(!tbtime) return message.reply("Je hebt geen tijd gedaan");

  message.guild.member(tbuser).ban(reason);
  message.reply(`<@${tbuser.id}> Is verbannen voor ${ms(ms(tbtime))}`);

  setTimeout(function(){
    message.guild.unban(tbuser.id);
    message.channel.send(`<@${tbuser.id}> Heeft geen ban meer!`);
  }, ms(tbtime));

  let tempmChannel = message.guild.channels.get(`519403879130071040`);
  if(!tempmChannel) return message.channel.send("Kan de channel niet vinden ");

  let tbanEmbed = new Discord.RichEmbed()
  .setDescription("~Tempban~")
  .setColor("#FF0000")
  .addField("Verbannen door", `<@${message.author.id}>`)
  .addField("Verbannen member", bUser)
  .addField("verbannen in", message.channel)
  .addField("Verbannen voor", `${ms(ms(tbtime))}`)
  .addField("Reden", reden );

  tempmChannel.send(tbanEmbed);


  if(!bans[tbuser.id]) bans[tbuser.id] = {
    bans: 0
  };

  bans[tbuser.id].bans++;

  fs.writeFile("Storage/bans.json", JSON.stringify(bans), (err) => {
    if (err) console.log(err);
  });

  	} else {
      message.channel.send("U kunt dit niet! Hiervoor moet u de rol ``Moderator`` hebben.")
  }

}

module.exports.config = {
    command: "tempban"
}

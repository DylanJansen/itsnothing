const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

let mutes = JSON.parse(fs.readFileSync("Storage/mutes.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith("!")) return;

  if (message.member.roles.some(r => ['Moderator'].includes(r.name))) {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Kan member niet vinden");
  let muterole = message.guild.roles.find(`name`, "muted");
  let reason = args.slice(2).join(' ');
  let tempmChannel = message.guild.channels.get(`519403879130071040`);
  if(!tempmChannel) return message.channel.send("Kan de channel niet vinden ");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("Je hebt geen tijd gedaan");

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    tempmChannel.send(`<@${tomute.id}> heeft geen mute meer!`);
  }, ms(mutetime));


  let tmuteEmbed = new Discord.RichEmbed()
  .setDescription("~Mute~")
  .setColor("#FF0000")
  .addField("Gemute door", `<@${message.author.id}>`)
  .addField("Mutet member", tomute)
  .addField("Gemute in", message.channel)
  .addField("Gemute voor", `${ms(ms(mutetime))}`)
  .addField("Reden", reason );

  tempmChannel.send(tmuteEmbed);

  if(!mutes[tomute.id]) mutes[tomute.id] = {
    mutes: 0
  };

  mutes[tomute.id].mutes++;

  fs.writeFile("Storage/mutes.json", JSON.stringify(mutes), (err) => {
    if (err) console.log(err);
  });

  	} else {
      message.channel.send("U kunt dit niet! Hiervoor moet u de rol ``Moderator`` hebben.")
  }

}

module.exports.config = {
    command: "tempmute"
}

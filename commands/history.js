const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
// let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args, msg) => {

  if (message.member.roles.some(r => ['Moderator'].includes(r.name))) {


    let hisUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!hisUser) return message.channel.send("Kan de member niet vinden");
    let warns = JSON.parse(fs.readFileSync("Storage/warnings.json", "utf8"));
    if(!warns[hisUser.id]) warns[hisUser.id] = {
      warns: 0
    };
    let warnlevel = warns[hisUser.id].warns;

    fs.writeFile("Storage/warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err);
    });


    let bans = JSON.parse(fs.readFileSync("Storage/bans.json", "utf8"));
    if(!bans[hisUser.id]) bans[hisUser.id] = {
      bans: 0
    };
    let banlevel = bans[hisUser.id].bans;

    fs.writeFile("Storage/bans.json", JSON.stringify(bans), (err) => {
      if (err) console.log(err);
    });


    let kicks = JSON.parse(fs.readFileSync("Storage/kicks.json", "utf8"));
    if(!kicks[hisUser.id]) kicks[hisUser.id] = {
      kicks: 0
    };
    let kicklevel = kicks[hisUser.id].kicks;

    fs.writeFile("Storage/kicks.json", JSON.stringify(kicks), (err) => {
      if (err) console.log(err);
    });

    let mutes = JSON.parse(fs.readFileSync("Storage/mutes.json", "utf8"));
    if(!mutes[hisUser.id]) mutes[hisUser.id] = {
      mutes: 0
    };
    let muteslevel = mutes[hisUser.id].mutes;

    fs.writeFile("Storage/mutes.json", JSON.stringify(mutes), (err) => {
      if (err) console.log(err);
    });


    message.channel.send(`**History van: <@${hisUser.id}>** \n \nWarns: **${warnlevel}** \nKicks **${kicklevel}** \nBans: **${banlevel}** \nMutes: **${muteslevel}**`);





    } else {
      message.channel.send("U kunt dit niet! Hiervoor moet u de rol ``Moderator`` hebben.")
    }

}

module.exports.config = {
    command: "history"
}

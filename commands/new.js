var fs = require('fs');
var Discord = require("discord.js");
let ticket = JSON.parse(fs.readFileSync("Storage/tickets.json", "utf8"));

module.exports.run = async (bot, message, args, msg) => {
if(!message.guild.roles.find(c=>c.name === "Support Team")) {
    message.channel.send('***__ERROR:__***\n*Als je wil dat ik werk, Moet de rol **Support Team** Er zijn anders gaat het niet lukken!*')
} else
    if(!bot.channels.find(c=>c.name === "support")) {
        message.channel.send('***__ERROR:__***\n*Als je wil dat ik werk, Moet je de channel aan maken **support** Anders ga ik niet werken.*')
    } else
    var problem = args.slice(0).join(' ');
    if (!problem) problem = `Geen probleem gezet!`
    if(!ticket[message.guild.id]) ticket[message.guild.id] = {
      ticket: 0
    };

    ticket[message.guild.id].ticket++;

    fs.writeFile("Storage/tickets.json", JSON.stringify(ticket), (err) => {
      if (err) console.log(err);
    });




    let channeliduser = ticket[message.guild.id].ticket;

    var channelname = "ticket-" + (channeliduser)
    let support = message.guild.roles.find(c=>c.name === 'Support Team')
    const noticketchannel = bot.channels.find(c=>c.name === `ticket-${channeliduser}`);
    const supportchannel = bot.channels.find(c=>c.name === `support`);
    if(!/^ticket-\d*$/.test(message.channel.name)) {
        message.delete(1)
        message.guild.createChannel(channelname , 'text').then(ch => ch.setParent(`527177872897736724`)).then(c => {
                      c.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        READ_MESSAGES: false
                      });
                      c.overwritePermissions(message.author.id, {
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGES: true
                      });
                      c.overwritePermissions(support, {
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGES: true
                      });
                      const newticketchannel = c;
                      message.reply(`Je ticket is gemaakt in <#${c.id}> :tickets:\nHeeft u andere vragen? die kunt u vragen in ${supportchannel} .`)


                      let newEmbed = new Discord.RichEmbed()
                      .setTitle(`${message.author.tag} | Ticket :tickets:`)
                      .setThumbnail( bot.user.avatarURL)
                      .setDescription(`Bedankt van het maken van de ticket! u word zo snel mogelijk geholpen!`)
                      .setColor("#4286f4")
                      .addField('Probleem', problem)
                      .setTimestamp()
                      .setFooter('Made By JustDylan_NL#7468');

                      newticketchannel.send(newEmbed);

         });


}}


module.exports.config = {
  command: "new"
}

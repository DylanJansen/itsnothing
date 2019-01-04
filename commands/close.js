var fs = require('fs');
var Discord = require("discord.js");


module.exports.run = async (bot, message, args, msg) => {
  if(!message.guild.roles.find(c=>c.name ==="Support Team")) {
      message.channel.send('***__ERROR:__***\n*Als je wil dat ik werk, Moet de rol **Support Team** Er zijn anders gaat het niet lukken!*')
  } else
      message.delete(1)
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 20000 });
      if(/^ticket-\d*$/.test(message.channel.name)) {
          message.channel.send({embed: {
              description: "Weet u zeker dat u deze ticket wil sluiten? Deze chanel word verwijdert!\n**Typ !close nog een keer om hem te sluiten.**\nJe verzoekt word verwijdert na 20 seconden!",
              }});
          collector.on('collect', message => {
              if (message.content == "!close") {
                  bot.channels.find(c=>c.name === /^ticket-\d*$/.test(message.channel.name))
                  message.channel.delete()
              }
          })
      } else
          message.channel.send({embed: {
              description: "Deze command kan aleen in een :ticket: gebruikt worden!",
              }});



}


module.exports.config = {
  command: "close"
}

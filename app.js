var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');
var ms = require("ms");
bot.commands = new Discord.Collection();


fs.readdir('./commands/', (err, files) => {
  if(err) console.error(err);

  var jsfiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsfiles.length <= 0){ return console.log('Geen commands gevonden...')}
  else { console.log(jsfiles.length + ' commands gevonden.') }

  jsfiles.forEach((f, i) => {
    var cmds = require(`./commands/${f}`);
    console.log(`command ${f} loading...`);
    bot.commands.set(cmds.config.command, cmds);
  });
});

bot.on('message', message => {

    if (message.author.bot) return;
    const prefix = '!';


    if (!message.content.startsWith(prefix)) return; // return if no prefix in message start


    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();



    const cmd = bot.commands.get(command);
    if (cmd) cmd.run(bot, message, args);




});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});



bot.login('NTA5Mzg1MTQ1NzMyODI1MDk5.DxBPUQ.bIBGlAMtgwMyaBm7NYnfPjAUD5Q')

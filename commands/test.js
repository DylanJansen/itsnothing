var fs = require('fs');
var Discord = require("discord.js");
let tickets = JSON.parse(fs.readFileSync("Storage/tickets.json", "utf8"));

module.exports.run = async (bot, message, args, msg) => {




}

module.exports.config = {
    command: "test"
}

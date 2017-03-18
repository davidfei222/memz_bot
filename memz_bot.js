//First of all, we need to load the dependencies we downloaded!
var logger = require("winston");
var Discordbot = require('discord.io');
var triggers = ["do you think thats going to stop me? -_-",
                "autistic",
                "better"];

//Let's change some settings!
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize : true
});
logger.level = 'debug';

//The auth file is important as well!
var auth = require("./auth.json");

//Here we create our bot variable, this is what we're going to use to communicate to discord.
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on("ready", function (rawEvent) {
    logger.info("Connected!");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");

});

//In this function we're going to add our commands.
bot.on("message", function (user, userID, channelID, message, rawEvent) {
    if (message.substring(0, 1) == "?") {
        var arguments = message.substring(1).split(" ");
        var command = arguments[0];
        arguments = arguments.splice(1);

        for(var i = 0; i < triggers.length, i++){
          if (command == triggers[i]) {//If the user posts '?ping' we'll do something!
              bot.sendMessage({ //We're going to send a message!
                  to : channelID,
                  message : "Pong!"
              });
          }
        }

    }

});

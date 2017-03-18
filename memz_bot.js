//First of all, we need to load the dependencies we downloaded!
var logger = require("winston");
var Discord = require("discord.io");
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
    autorun: true,
    messageCacheLimit: 100
});

bot.on("ready", function (rawEvent) {
    logger.info("Connected!");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");
});

//In this function we're going to add our commands.
bot.on("message", function (user, userID, channelID, message, rawEvent) {
    if (userID == "279845556166197251" ) {
        /*var arguments = message.substring(1).split(" ");
        var command = arguments[0];
        arguments = arguments.splice(1);*/

        for(i = 0; i < triggers.length; i++) {
          if (message == triggers[i]) {//If Jalen says something stupid, we'll do something!
              bot.sendMessage({ //We're going to send him a message!
                to : channelID,
                message : "Shut the fuck up Jalen"
              });
              bot.kick({ //Also kick his dumbass from the server
                serverID: "256259539861504000",
                userID: "279845556166197251"
              });

          }
        }

    }
    else {
      bot.sendMessage({
        to : channelID,
        message : "Any viewpoint expressed by Travis Vetter is automatically negated by the fact that he gets off to digital cartoon girls."
      });
    }

});

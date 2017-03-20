//First of all, we need to load the dependencies we downloaded!
var logger = require("winston");
var Discord = require("discord.io");
var fs = require("fs");
//The auth file is important as well!
var auth = require("./auth.json");

var triggerPhrases
fs.readFile('triggers.json',function(err, content){
  if(err) throw err;
  triggerPhrases = JSON.parse(content);
  //console.log(triggerPhrases);
});

//Let's change some settings!
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize : true
});
logger.level = 'debug';

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
  console.log("Message detected.");
  var date = new Date();
  var arguments = message.split(" ");
  var channel = bot.channels[channelID];
  var lastMessage = channel.last_message_id;
  var serverID = bot.channels[channelID].guild_id;
  var ownerID = bot.servers[serverID].owner_id;
  //uncomment to debug
  //console.log(channel);
  //console.log(serverID);
  //console.log(ownerID);

  if (userID == "279845556166197251") {
    triggerPhrases.phrases.push(message);
    fs.writeFile('triggers.json', JSON.stringify(triggerPhrases), function(err){
      if(err) throw err;
    });
    for(i = 0; i < triggers.length; i++) {
      if (message == triggerPhrases[i] || message.includes(triggerPhrases[i])) {//If Jalen says something stupid, we'll do something!
        bot.sendMessage({ //We're going to send him a message!
          to : channelID,
          message : "Shut the fuck up Jalen"
        });
        bot.kick({ //Also kick his dumbass from the server
          serverID: serverID,
          userID: "279845556166197251"
        });
        bot.sendMessage({ //Send another message
          to : channelID,
          message : "Kicked Jalen out of the server for being autistic"
        });
        logger.info("Kicked Jalen out of the server for being autistic at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
      }
    }
  }

  if (userID == "285178566751158273" ) {
    triggerPhrases.phrases.push(message);
    fs.writeFile('triggers.json', JSON.stringify(triggerPhrases), function(err){
      if(err) throw err;
    });
    for(i = 0; i < triggers.length; i++) {
      if (message == triggersPhrases[i] || message.includes(triggerPhrases[i])) {//If Jalen says something stupid, we'll do something!
        bot.sendMessage({ //We're going to send him a message!
          to : channelID,
          message : "Shut the fuck up Louis"
        });
        bot.kick({ //Also kick his dumbass from the server
          serverID: serverID,
          userID: "285178566751158273"
        });
        bot.sendMessage({ //Send another message
          to : channelID,
          message : "Kicked Louis out of the server for being autistic"
        });
        logger.info("Kicked Louis out of the server for being autistic at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
      }
    }
  }

  if (userID == "285182845519921152" && message == "hi") {
    bot.sendMessage({
      to : channelID,
      message : "Hello, master"
    });
  }

  /*if (message != "Any viewpoint expressed by Travis Vetter is automatically negated by the fact that he gets off to digital cartoon girls."){
    bot.sendMessage({
      to : channelID,
      message : "Any viewpoint expressed by Travis Vetter is automatically negated by the fact that he gets off to digital cartoon girls."
    });
    logger.info("Bot triggered at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
  }*/

});

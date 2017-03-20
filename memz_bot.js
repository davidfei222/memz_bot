//First of all, we need to load the dependencies we downloaded!
var logger = require("winston");
var Discord = require("discord.io");
var fs = require("fs");

//Load the trigger phrases from the local JSON file
var triggerPhrases;
var jalen;
var louis;
fs.readFile('triggers.json',function(err, content){
  if(err) throw err;
  triggerPhrases = JSON.parse(content);
  jalen = triggerPhrases.jalenPhrases;
  louis = triggerPhrases.louisPhrases;
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
    token: "MjkyNTMxOTA3MjEwNTEwMzM4.C688OA.rfzVVF7krlO7kOntKuX3udT49lg",
    autorun: true,
    messageCacheLimit: 100
});

bot.on("ready", function (rawEvent) {
    logger.info("Connected!");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");
});

//In this function we're going to add our commands. This set of commands is triggered whenever a new message is sent to a channel.
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
    triggerPhrases.jalenPhrases.push(message);
    fs.writeFile('triggers.json', JSON.stringify(triggerPhrases), function(err){
      if(err) throw err;
    });
    for(i = 0; i < jalen.length; i++) {
      if (message == jalen[i] || message.includes(jalen[i])) { //If Jalen says something stupid, we'll do something!
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
    /*triggerPhrases.louisPhrases.push(message);
    fs.writeFile('triggers.json', JSON.stringify(triggerPhrases), function(err){
      if(err) throw err;
    });*/
    for(i = 0; i < louis.length; i++) {
      if (message == louis[i] || message.includes(louis[i])) { //If Louis says something stupid, we'll do something!
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
          message : "Kicked Louis out of the server for projecting"
        });
        logger.info("Kicked Louis out of the server for projecting at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
      }
    }
  }

  //Commands for me to modify the bot, only accessible by my main account
  if (userID == "285182845519921152") {
    if(message.includes("hi") || message.includes("hello")){
      bot.sendMessage({
        to : channelID,
        message : "Hello, master"
      });
    }
    else if(arguments[0] = "!changename"){
      bot.editUserInfo({
        username: arguments[1]
      });
    }
  }

  /*if (message != "Any viewpoint expressed by Travis Vetter is automatically negated by the fact that he gets off to digital cartoon girls."){
    bot.sendMessage({
      to : channelID,
      message : "Any viewpoint expressed by Travis Vetter is automatically negated by the fact that he gets off to digital cartoon girls."
    });
    logger.info("Bot triggered at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
  }*/

});

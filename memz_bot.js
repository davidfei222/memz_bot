//First of all, we need to load the dependencies we downloaded!
var logger = require("winston");
var Discord = require("discord.io");
var fs = require("fs");

//Variables for loading the trigger phrases from the local JSON file
var triggerPhrases;
var jalen;
var louis;

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

//Check if Jalen or Louis is online and reload the triggers JSON file accordingly
/*bot.on("presence", function (user, userID, status, game, event) {
  console.log("Someone has logged in.");
  if((userID == "279845556166197251" || userID == "285178566751158273") && status == "online") {
    console.log("Checking if Jalen or Louis is online...");
    fs.readFile('triggers.json',function(err, content){
      if(err) throw err;
      triggerPhrases = JSON.parse(content);
      jalen = triggerPhrases.jalenPhrases;
      louis = triggerPhrases.louisPhrases;
      //console.log(triggerPhrases);
    });
  }
  if(userID == "285182845519921152" && status == "online"){
    console.log("Master is online.");
  }
});*/

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

  if (userID == "279845556166197251") { //Entered when Jalen messages the channel
    fs.readFile('triggers.json',function(err, content){ //Read the most up to date list of trigger phrases
      if(err) throw err;
      triggerPhrases = JSON.parse(content);
      jalen = triggerPhrases.jalenPhrases;
      //console.log(triggerPhrases);
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
    if(jalen.indexOf(message) < 0){ //Add the phrase he just said into the list for future reference
      triggerPhrases.jalenPhrases.push(message);
      fs.writeFile('triggers.json', JSON.stringify(triggerPhrases), function(err){
        if(err) throw err;
      });
    }
  }

  if (userID == "285178566751158273") { //Entered when louis messages the channel
    fs.readFile('triggers.json',function(err, content){ //Read the most up to date list of trigger phrases
      if(err) throw err;
      triggerPhrases = JSON.parse(content);
      louis = triggerPhrases.louisPhrases;
      //console.log(triggerPhrases);
    });
    for(i = 0; i < louis.length; i++) {
      if (message == louis[i] || message.includes(louis[i])) { //If Louis starts projecting, we'll do something!
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
      bot.sendMessage({
        to : channelID,
        message : "A username change has been attempted for the bot. If the name change was unsuccessful, it is because Discord's name change cooldown is active."
      });
    }
  }

});

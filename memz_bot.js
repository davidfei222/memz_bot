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
bot.on("message", function (user, userID, channelID, message, event) {
  var date = new Date();
  console.log("Message detected at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
  var rawMsg = message.toLowerCase();
  var rawArgs = rawMsg.split(" ");
  var arguments = message.split(" ");

  //Anti-war crime apologist measures
  if(rawMsg.includes("japan") && rawMsg.includes("nothing") && rawMsg.includes("wrong")) {
    bot.sendMessage({ 
      to : userID,
      message : "Japan deserved the nukes for their war crimes."
    });
  }

  //Entered when Jalen messages the channel
  if (userID == "279845556166197251") {
    var count = 0;
    fs.readFile('triggers.json',function(err, content){ //Read the most up to date list of trigger phrases
      if(err) throw err;
      triggerPhrases = JSON.parse(content);
      jalen = triggerPhrases.jalenPhrases;
      //console.log(triggerPhrases);
    });
    for(i = 0; i < jalen.length; i++) {
      if (rawMsg.includes(jalen[i])) { //If Jalen says something stupid, we'll do something!
        bot.sendMessage({ //We're going to send him a message!
          to : channelID,
          message : "Shut the fuck up Jalen."
        });
        bot.kick({ //Also kick his dumbass from the server
          serverID: bot.channels[channelID].guild_id,
          userID: "279845556166197251"
        });
        bot.sendMessage({ //Send another message
          to : channelID,
          message : "Kicked Jalen out of the server for being autistic."
        });
        logger.info("Kicked Jalen out of the server for being autistic at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
      }
      if(jalen[i].includes(rawMsg)){
        count++;
      }
    }
    if(count == 0){ //Add the phrase he just said into the list for future reference (if not already in the list)
      triggerPhrases.jalenPhrases.push(rawMsg);
      fs.writeFile('triggers.json', JSON.stringify(triggerPhrases), function(err){
        if(err) throw err;
      });
    }
    bot.sendMessage({ //Send him a direct message telling him to stop being a faggot
      to : "279845556166197251",
      message : "No autistic faggots allowed"
    });
  }

  //Entered when Louis messages the channel
  if (userID == "285178566751158273") {
    fs.readFile('triggers.json',function(err, content){ //Read the most up to date list of trigger phrases
      if(err) throw err;
      triggerPhrases = JSON.parse(content);
      louis = triggerPhrases.louisPhrases;
      //console.log(triggerPhrases);
    });
    for(i = 0; i < louis.length; i++) {
      if (rawMsg.includes(louis[i])) { //If Louis starts projecting, we'll do something!
        bot.sendMessage({ //We're going to send him a message!
          to : channelID,
          message : "Louis stop projecting."
        });
        bot.kick({ //Also kick his dumbass from the server
          serverID: bot.channels[channelID].guild_id,
          userID: "285178566751158273"
        });
        bot.sendMessage({ //Send another message
          to : channelID,
          message : "Kicked Louis out of the server for projecting."
        });
        logger.info("Kicked Louis out of the server for projecting at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
      }
    }
    bot.sendMessage({ //Send him a direct message with the definition of "projecting"
      to : "285178566751158273",
      message : "http://www.dictionary.com/browse/projecting"
    });
  }

  //Commands for me to modify the bot, only usable by my main account
  if (userID == "285182845519921152") {
    if(rawArgs.indexOf("hi") >= 0 || rawArgs.indexOf("hello") >= 0){
      bot.sendMessage({
        to : channelID,
        message : "Hello, master"
      });
    }
    else if(arguments[0] == "!changename"){
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

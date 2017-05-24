//First of all, we need to load the dependencies we downloaded!
var logger = require("winston");
var Discord = require("discord.io");
var fs = require("fs");

//Variables for file I/O
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

bot.on("ready", function (event) {
     logger.info("Connected!");
     logger.info("Logged in as: ");
     logger.info(bot.username + " - (" + bot.id + ")");
     bot.setPresence({
          game: {
               name: "wif muh dik"
          }
     });
});

//Check if Jalen or Louis is online and reload trigger.json accordingly
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
     var rawNoSpaces = "";
     for (i = 0; i < rawArgs.length; i++)
     {
          rawNoSpaces += rawArgs[i];
     }
     var arguments = message.split(" ");

     //wall building measures
     if (rawMsg.includes("10") && rawMsg.includes("feet") && rawMsg.includes("higher") && userID != "292531907210510338")
     {
          fs.readFile('triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
               if(err) throw err;
               triggerPhrases = JSON.parse(content);
               triggerPhrases.wallHeight += 10;
               height = triggerPhrases.wallHeight;
               var serverID = bot.channels[channelID].guild_id;
               bot.sendMessage({
                    to : channelID,
                    message : "THE WALL JUST GOT 10 FEET HIGHER!" +
                              "\rWE ARE NOW AT " + height + " FEET OF ANTI-MEXICAN FORTIFICATION." +
                              "\rMAKE AMERICA GREAT AGAIN!",
                    tts : true
               });
               fs.writeFile('triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err){
                    if(err) throw err;
               });
          });
     }

     //Anti-war crime apologist measures
     if (rawMsg.includes("japan") && (rawMsg.includes("nothing") || rawMsg.includes("wrong") || rawMsg.includes("china")))
     {
          bot.sendMessage({
               to : userID,
               message : "Japan deserved the nukes for their war crimes.",
               tts : true
          });
     }

     //Remind the server of Travis's degeneracy
     if(userID == "294640905707585537")
     {
          bot.sendMessage({
               to : channelID,
               message : "Any viewpoint expressed by Travis Vetter is automatically negated by the fact that he gets off to cartoon girls."
          });
     }

     //List information about the server the bot keeps track of
     if (arguments[0] == "!list")
     {
          fs.readFile('triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
               if(err) throw err;
               triggerPhrases = JSON.parse(content);
               jalen = triggerPhrases.jalenPhrases;
               louis = triggerPhrases.louisPhrases;
               count = triggerPhrases.projectionCount;
               var serverID = bot.channels[channelID].guild_id;
               bot.sendMessage({
                    to : channelID,
                    message : "Accessed list of triggers from this server: " + serverID +
                              "\rJalen's triggers: " + jalen.toString() +
                              "\rLouis's triggers: " + louis.toString() +
                              "\rLouis has projected " + count.toString() + " times."
               });
          });
     }

     //Command to add more triggers to the list (!add {name of offender} {phrase they uttered})
     if (arguments[0] == "!add")
     {
          fs.readFile('triggers.json', function(err, content){
               if (err) throw err;
               triggerPhrases = JSON.parse(content);
               var phrase = "";
               var arguments = message.split(" ");
               if (arguments[1].toLowerCase() == "jalen")
               {
                    for(i = 2; i < arguments.length; i++)
                    {
                         if(i == arguments.length - 1)
                         {
                              phrase += arguments[i].toLowerCase();
                         }
                         else
                         {
                              phrase += arguments[i].toLowerCase() + " ";
                         }
                    }
                    triggerPhrases.jalenPhrases.push(phrase);
               }
               else if (arguments[1].toLowerCase() == "louis")
               {
                    for(i = 2; i < arguments.length; i++)
                    {
                         if(i == arguments.length - 1)
                         {
                              phrase += arguments[i].toLowerCase();
                         }
                         else
                         {
                              phrase += arguments[i].toLowerCase() + " ";
                         }
                    }
                    triggerPhrases.louisPhrases.push(phrase);
               }
               fs.writeFile('triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err){
                    if(err) throw err;
                    bot.sendMessage({
                         to : channelID,
                         message : "Successfully added phrase"
                    });
               });
          });
     }

     //Entered when Jalen messages the channel
     if (userID == "279845556166197251")
     {
          fs.readFile('triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
               if (err) throw err;
               triggerPhrases = JSON.parse(content);
               jalen = triggerPhrases.jalenPhrases;
               for(i = 0; i < jalen.length; i++)
               {
                    if (rawMsg.includes(jalen[i]))
                    { //If Jalen says something stupid, we'll do something!
                         var serverID = bot.channels[channelID].guild_id;
                         bot.sendMessage({ //We're going to send him a message!
                              to : channelID,
                              message : "Shut the fuck up Jalen."
                         });
                         bot.kick({ //Also kick his dumbass from the server
                              serverID : serverID,
                              userID : "279845556166197251"
                         });
                         bot.sendMessage({ //Send another message
                              to : channelID,
                              message : "Kicked Jalen out of the server for being autistic."
                         });
                         logger.info("Kicked Jalen out of the server for being autistic at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
                         bot.sendMessage({ //Send him a direct message telling him to stop being a faggot
                              to : "279845556166197251",
                              message : "No autistic faggots allowed"
                         });
                         break;
                    }
               }
          });
     }

     //Entered when Louis messages the channel
     if (userID == "285178566751158273")
     {
          fs.readFile('triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
               if(err) throw err;
               triggerPhrases = JSON.parse(content);
               louis = triggerPhrases.louisPhrases;
               for(i = 0; i < louis.length; i++)
               {
                    if (rawNoSpaces.includes(louis[i]))
                    { //If Louis starts projecting, we'll do something!
                         var serverID = bot.channels[channelID].guild_id;
                         bot.sendMessage({ //We're going to send him a message!
                              to : channelID,
                              message : "Louis stop projecting.",
                              tts : true
                         });
                         bot.kick({ //Also kick his dumbass from the server
                              serverID : serverID,
                              userID : "285178566751158273"
                         });
                         triggerPhrases.projectionCount += 1;
                         bot.sendMessage({ //Send another message
                              to : channelID,
                              message : "Kicked Louis out of the server for projecting.\rThis is the " + triggerPhrases.projectionCount + "th time that Louis has projected.",
                              tts : true
                         });
                         logger.info("Kicked Louis out of the server for projecting at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
                         bot.sendMessage({ //Send him a direct message with the definition of "projecting"
                              to : "285178566751158273",
                              message : "http://www.dictionary.com/browse/projecting",
                              tts : true
                         });
                         break;
                    }
               }
               fs.writeFile('triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err){
                    if(err) throw err;
               });
          });
     }

     //Commands for my personal use. Modifies the bot and its behavior, only usable by my main account
     if (userID == "285182845519921152")
     {
          if (rawArgs.indexOf("hi") >= 0 || rawArgs.indexOf("hello") >= 0)
          { //Say hi to the bot to see if it's alive
               bot.sendMessage({
                    to : channelID,
                    message : "Louis is a cuck",
                    tts : true
               });
          }
          else if (arguments[0] == "!changename" && arguments[1] != bot.username)
          { //Change the name of the bot
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

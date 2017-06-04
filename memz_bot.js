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
	var words = message.split(" ");

	//wall building measures
	if (rawMsg.indexOf("10") >= 0 && rawMsg.indexOf("feet") >= 0 && rawMsg.indexOf("higher") >= 0 && userID != "292531907210510338")
	{
		fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
			if(err) throw err;
			triggerPhrases = JSON.parse(content);
			triggerPhrases.wallHeight += 10;
			height = triggerPhrases.wallHeight;
			var tts_bool = false;
			if (height == 1000 || height == 10000 || height == 100000)
			{
				tts_bool = true;
			}
			var serverID = bot.channels[channelID].guild_id;
			var rmdr = 0;
			if (30000 - height > 0)
			{
				rmdr = 30000 - height;
			}
			bot.sendMessage({
				to : channeID,
				message : "THE WALL JUST GOT 10 FEET HIGHER!" +
						"\rWe now have " + height + " feet of American greatness keeping the illegals out." +
						"\rOnly " + rmdr + " feet to go until the wall becomes taller than Hillary's emails!" +
						"\rMAKE AMERICA GREAT AGAIN!",
				tts : tts_bool
			});
			fs.writeFile('/home/pi/Documents/bot_data/triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err){
				if(err) throw err;
			});
		});
	}

	//Anti-war crime apologist measures
	if (rawMsg.indexOf("japan") >= 0 && (rawMsg.indexOf("nothing") >= 0 || rawMsg.indexOf("wrong") >= 0 || rawMsg.indexOf("china") >= 0))
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
	if (words[0] == "!list")
	{
		fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
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
	if (words[0] == "!add")
	{
		fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content){
			if (err) throw err;
			triggerPhrases = JSON.parse(content);
			var phrase = "";
			var words = message.split(" ");
			if (words[1].toLowerCase() == "jalen")
			{
				for(i = 2; i < words.length; i++)
				{
					if(i == words.length - 1)
					{
						phrase += words[i].toLowerCase();
					}
					else
					{
						phrase += words[i].toLowerCase() + " ";
					}
				}
				triggerPhrases.jalenPhrases.push(phrase);
			}
			else if (words[1].toLowerCase() == "louis")
			{
				for(i = 2; i < words.length; i++)
				{
					if(i == words.length - 1)
					{
						phrase += words[i].toLowerCase();
					}
					else
					{
						phrase += words[i].toLowerCase() + " ";
					}
				}
				triggerPhrases.louisPhrases.push(phrase);
			}
			fs.writeFile('/home/pi/Documents/bot_data/triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err){
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
		fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
			if (err) throw err;
			triggerPhrases = JSON.parse(content);
			jalen = triggerPhrases.jalenPhrases;
			for(i = 0; i < jalen.length; i++)
			{
				if (rawMsg.indexOf(jalen[i]) >= 0)
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
		fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content){ //Read the most up to date list of trigger phrases
			if(err) throw err;
			triggerPhrases = JSON.parse(content);
			louis = triggerPhrases.louisPhrases;
			for(i = 0; i < louis.length; i++)
			{
				if (rawNoSpaces.indexOf(louis[i]) >= 0)
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
			fs.writeFile('/home/pi/Documents/bot_data/triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err){
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
		else if (words[0] == "!changename" && words[1] != bot.username)
		{ //Change the name of the bot
			bot.editUserInfo({
				username: words[1]
			});
			bot.sendMessage({
				to : channelID,
				message : "A username change has been attempted for the bot. If the name change was unsuccessful, it is because Discord's name change cooldown is active."
			});
		}
	}
});

// Would have been nice to have, but exceeded the character limit
/*bot.sendMessage({
	to : channelID,
	message : "__________    __       __    _________ " +
			"\r|____  ____|  |  |     |  |  |  _______|" +
			"\r    |  |      |  |     |  |  |  |       " +
			"\r    |  |      |  |_____|  |  |  |______ " +
			"\r    |  |      |   _____   |  |   ______|" +
			"\r    |  |      |  |     |  |  |  |       " +
			"\r    |  |      |  |     |  |  |  |______ " +
			"\r    |__|      |__|     |__|  |_________|" +
			"\r __     __     __     ____________    __          __ " +
			"\r|  |   /  \\   |  |   |   ______   |  |  |        |  |" +
			"\r|  |  / /\\ \\  |  |   |  |      |  |  |  |        |  |" +
			"\r|  | / /  \\ \\ |  |   |  |______|  |  |  |        |  |" +
			"\r|  |/ /    \\ \\|  |   |   ______   |  |  |        |  |" +
			"\r|     |    |      |   |  |      |  |  |  |_____   |  |_____ " +
			"\r|_____|    |______|   |__|      |__|  |________|  |________|" +
			"\r         __    __       __    __________    __________         __________    __________    __________ " +
			"\r        |  |  |  |     |  |  |  ________|  |____  ____|       |  ________|  |  ______  |  |____  ____|" +
			"\r        |  |  |  |     |  |  |  |              |  |           |  |          |  |    |  |      |  |    " +
			"\r        |  |  |  |     |  |  |  |_______       |  |           |  |   ____   |  |    |  |      |  |    " +
			"\r __     |  |  |  |     |  |  |________  |      |  |           |  |  |___ |  |  |    |  |      |  |    " +
			"\r|  |    |  |  |  |     |  |	     |  |      |  |           |  |     | |  |  |    |  |      |  |    " +
			"\r|  |____|  |  |  |_____|  |   _______|  |      |  |           |  |_____| |  |  |____|  |      |  |    " +
			"\r|__________|  |___________|  |__________|      |__|           |__________|  |__________|      |__|    " +
			"\r __    __________         _________    _________    _________    __________ " +
			"\r|  |  |  ______  |       |  _______|  |  _______|  |  _______|  |____  ____|" +
			"\r|  |  |  |    |  |       |  |         |  |         |  |             |  |    " +
			"\r|  |  |  |    |  |       |  |______   |  |______   |  |______       |  |    " +
			"\r|  |  |  |    |  |       |  _______|  |  _______|  |  _______|      |  |    " +
			"\r|  |  |  |    |  |       |  |         |  |         |  |             |  |    " +
			"\r|  |  |  |____|  |       |  |         |  |______   |  |______       |  |    " +
			"\r|__|  |__________|       |__|         |_________|  |_________|      |__|    " +
			"\r __       __    __    __________    __       __    _________    __________     __ " +
			"\r|  |     |  |  |  |  |  ________|  |  |     |  |  |  _______|  |  ______  |   |  |" +
			"\r|  |     |  |  |  |  |  |          |  |     |  |  |  |         |  |    |  |   |  |" +
			"\r|  |_____|  |  |  |  |  |   ____   |  |_____|  |  |  |______   |  |____|  |   |  |" +
			"\r|   _____   |  |  |  |  |  |___ |  |   _____   |  |  _______|  |    ______|   |  |" +
			"\r|  |     |  |  |  |  |  |     | |  |  |     |  |  |  |         |     \\        |__|" +
			"\r|  |     |  |  |  |  |  |_____| |  |  |     |  |  |  |______   |  |\\  \\       __ " +
			"\r|__|     |__|  |__|  |__________|  |__|     |__|  |_________|  |__| \\__\\     |__|" +
			"\r" +
			"\rWe now have " + height + " feet of American greatness keeping the illegals out." +
			"\rOnly " + rmdr + " feet to go until the wall becomes taller than Hillary's emails!" +
			"\rMAKE AMERICA GREAT AGAIN!",
	tts : tts_bool
});*/

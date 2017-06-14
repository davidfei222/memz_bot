var fs = require("fs");
var logger = require("winston");

exports.list = function(bot, channelID)
{
	fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content) { //Read the most up to date list of trigger phrases
		if(err) throw err;
		var triggerPhrases = JSON.parse(content);
		var jalen = triggerPhrases.jalenPhrases;
		var louis = triggerPhrases.louisPhrases;
		var count = triggerPhrases.projectionCount;
		var serverID = bot.channels[channelID].guild_id;
		bot.sendMessage({
			to : channelID,
			message : "Accessed list of triggers from this server: " + serverID +
					"\rJalen's triggers: " + jalen.toString() +
					"\rLouis's triggers: " + louis.toString() +
					"\rLouis has projected " + count.toString() + " times."
		});
	});

};

exports.addTriggers = function(bot, channelID, message)
{
	fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content) {
		if (err) throw err;
		var triggerPhrases = JSON.parse(content);
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
		fs.writeFile('/home/pi/Documents/bot_data/triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err) {
			if(err) throw err;
			bot.sendMessage({
				to : channelID,
				message : "Successfully added phrase"
			});
		});
	});

};

exports.removeJalen = function(bot, rawMsg, channelID, date)
{
	fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content) { //Read the most up to date list of trigger phrases
		if (err) throw err;
		var triggerPhrases = JSON.parse(content);
		var jalen = triggerPhrases.jalenPhrases;
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
};

exports.removeLouis = function(bot, rawNoSpaces, channelID, date)
{
	fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content) { //Read the most up to date list of trigger phrases
		if(err) throw err;
		var triggerPhrases = JSON.parse(content);
		var louis = triggerPhrases.louisPhrases;
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
		fs.writeFile('/home/pi/Documents/bot_data/triggers.json', JSON.stringify(triggerPhrases, null, " "), function(err) {
			if(err) throw err;
		});
	});
};

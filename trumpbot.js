// Module for the trump bot features

var fs = require("fs");

exports.buildWall = function(bot, channelID)
{
	fs.readFile('/home/pi/Documents/bot_data/wallheight.txt', function(err, content) { //Read the most up to date list of trigger phrases
		if(err) throw err;
		var height = parseInt(content, 10);
		height += 10;
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
			to : channelID,
			message : "THE WALL JUST GOT 10 FEET HIGHER!" +
					"\rWe now have " + height + " feet of American greatness keeping the illegals out." +
					"\rOnly " + rmdr + " feet to go until the wall becomes taller than Hillary's emails!" +
					"\rMAKE AMERICA GREAT AGAIN!" +
					"\rhttp://i.imgur.com/imISYhY.gifv",
			tts : tts_bool
		});
		fs.writeFile('/home/pi/Documents/bot_data/wallheight.txt', height, function(err) {
			if(err) throw err;
		});
	});
};

exports.cnn = function(bot, channelID, userID, user)
{
	var serverID = bot.channels[channelID].guild_id;
	if (userID != "285182845519921152")
	{
		bot.kick({
			serverID : serverID,
			userID : userID
		});
	}
	bot.sendMessage({
		to : channelID,
		message : "CNN is FAKE NEWS!  User " + user + " is an America-hating liberal!  Sad!",
		tts : true
	});
};

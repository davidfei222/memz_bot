//This bot is for general fuckery within my friend's Discord server.

//Load dependencies
var logger = require("winston");
var Discord = require("discord.io");
var fs = require("fs");
var antiAutismBot = require("./antiautismbot.js");
var trumpBot = require("./trumpbot.js");

//Lock for spam feature
var lock;

//Let's change some settings!
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize : true
});
logger.level = 'debug';

//Read the token and create bot
fs.readFile('/home/pi/Documents/bot_data/triggers.json', function(err, content) {
	if (err) throw err;
	triggers = JSON.parse(content);
	startup(triggers.token);
});

//In this function we create the bot and define commands for it.
//This function gets called as part of the callback for reading the JSON data file.
function startup(token)
{
	//Here we create our bot variable, this is what we're going to use to communicate to discord.
	var bot = new Discord.Client({
		token: token,
		autorun: true,
		messageCacheLimit: 100
	});

	bot.on("ready", function (event) {
		logger.info("Connected!");
		logger.info("Logged in as: ");
		logger.info(bot.username + " - (" + bot.id + ")");
		bot.setPresence({
			game: {
				name: "with Vladimir Putin"
			}
		});
	});

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

		//Bot will spam Louis with a picture of a black dick
		if (rawMsg == "attack_louis") {
			console.log("Spamming Louis...");
			if (lock === undefined)
			{
				lock = setInterval(function () {
					bot.sendMessage({
						to : "285182845519921152" //"285178566751158273", 
						message : "lambo" //"https://cdn.discordapp.com/attachments/232467376665264128/278646568037384193/42.jpg"
					});
				}, 3000);
			}
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
		
		/////////////////////////
		// trumpbot.js methods //
		/////////////////////////

		//Respond with a funny message and GIF if anyone mentions "10 feet higher"
		if (rawNoSpaces.indexOf("10") >= 0 && rawNoSpaces.indexOf("feet") >= 0 && rawNoSpaces.indexOf("higher") >= 0 && userID != "292531907210510338")
		{
			trumpBot.buildWall(bot, channelID);
		}

		//Chastise people for bringing up fake news
		if (rawNoSpaces.indexOf("cnn") >= 0 && userID != "292531907210510338")
		{
			trumpBot.cnn(bot, channelID, userID, user);
		}

		/////////////////////////////
		// End trumpbot.js methods //
		/////////////////////////////
		
		//////////////////////////////
		// antiautismbot.js methods //
		////////////////////////////// 

		//List information about the server the bot keeps track of
		if (words[0] == "!list")
		{
			antiAutismBot.list(bot, channelID);
		}

		//Command to add more triggers to the list (!add {name of offender} {phrase they uttered})
		if (words[0] == "!add")
		{
			antiAutismBot.addTriggers(bot, channelID, message);
		}

		//Entered when Jalen messages the channel
		if (userID == "279845556166197251")
		{
			antiAutismBot.removeJalen(bot, rawMsg, channelID, date);
		}

		//Entered when Louis messages the channel
		if (userID == "285178566751158273")
		{
			antiAutismBot.removeLouis(bot, rawNoSpaces, channelID, date);
		}
		
		//////////////////////////////////
		// End antiautismbot.js methods //
		//////////////////////////////////

		//Commands for my personal use. Modifies the bot and its behavior, only usable by my main account
		if (userID == "285182845519921152")
		{
			if (rawMsg == "stop_spam")
			{
				clearInterval(lock);
				console.log("Stopped spamming Louis");
			}
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
}

	/*message : "__________    __       __    _________ " +
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
			"\r" +*/

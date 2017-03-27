# memz_bot
A bot for a friend's Discord server that stops the group from getting out of control.

## Instructions For Matt (so he doesn't have to keep asking me how to do things):
1. If not already installed, install <a href="https://nodejs.org/en/", target="_blank">NodeJS</a>.  This a runtime environment that allows you to run JavaScript code.
2. Get a GitHub account <a href="https://github.com/", target="_blank">here</a>.
3. Install Git from <a href="https://git-scm.com/downloads", target="_blank">here</a>.  (The first 3 steps only need to be done once.)
4. Go the repository for the bot <a href="https://github.com/davidfei222/memz_bot", target="_blank">here</a> and click "Clone or download", then copy the link they give you.
5. Go the Windows search bar (the Cortana bar) and type in "cmd" without the quotes.  Click on the first result.
6. Now that you have Windows command line open, type in "git clone {the url you just copied}" without the braces.  This will create a local copy of the repository in your user folder.
7. Navigate to that folder. Type in "dir" to see all the folders in your user folder and find the folder that has the same name as the repository (all the names will be in the rightmost column).  Navigate there by typing in "cd {name of the folder}" without the braces.
8. Now that you're in the folder, it's time to install the necessary dependencies. First type "npm install discord.io --save" without the quotes.  Wait for that install to finish.  Then type "npm install winston --save" without the quotes and wait for that to finish installing.  If they install correctly you should see a folder in the bot's folder called "node_modules".
9. Everything is now set up!  You can run the bot by typing in "node memz_bot.js" without the quotes into the command line from the bot's folder.    
10. The bot will deactivate if the computer is ever turned off or goes to sleep.  If you need to restart the bot, just follow instructions 5-9 again (skipping step 8).

#### Keeping the bot up to date
If I ever make any changes to the bot from here on out, you can get the updates by submitting a pull request to my repo.  If that happens just message me about it and I'll walk you through it.

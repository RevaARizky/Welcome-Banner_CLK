const welcomeBanner = require('./banner/drawImage')
const Discord = require('discord.js');
require('dotenv').config()

const client = new Discord.Client();
// Get token from .env
const token = process.env.BOT_TOKEN;

// Event triggered when someone join server
client.on('guildMemberAdd', member => {

  // Get image from user avatar
  const img = member.user.displayAvatarURL({format: 'png'})

  // Calling function for drawing image
  welcomeBanner.drawImage(img, member)
});

// Log our bot in
client.login(token);
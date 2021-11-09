const WelcomeBanner = require('./banner/WelcomeBanner')
const Discord = require('discord.js');
const Path = require('path');
require('dotenv').config()

const client = new Discord.Client();
// Get token from .env
const token = process.env.BOT_TOKEN;

// Event triggered when someone join server
client.on('guildMemberAdd', member => {

  // Get image from user avatar
  const img = member.user.displayAvatarURL({format: 'png'})

  sendData = {
    userName:   member.user.tag,
    userCount:  member.guild.memberCount,
    sendText:   member.guild.channels.cache.get('904977988947423235'),
    guildName:  member.guild.name
  }

  // Calling function for drawing image
  WelcomeBanner(img, sendData, null)
});

client.on('message', message => {
  const img = message.author.displayAvatarURL({format: 'png'})
  // message.channel.send

  if(message.content == "ca!simjoin"){
    sendData = {
      userName:   message.author.tag,
      userCount:  message.guild.memberCount,
      sendText:   message.guild.channels.cache.get('904977988947423235'),
      guildName:  message.guild.name
    }
    WelcomeBanner(img, null, sendData)
  }
})

// Log our bot in
client.login(token);
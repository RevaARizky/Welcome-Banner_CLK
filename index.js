const Discord = require('discord.js');
require('dotenv').config()

const client = new Discord.Client();
// The token of your bot
const token = process.env.BOT_TOKEN;

client.on('ready', () => {
//   console.log(client);
});

client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get('904977988947423235').send('hei', {files: ['./denah1.jpg']})
});

client.on('message', message => {
    if (message.content == 'test') {    
        message.channel.send('test juga')
        console.log('someone just test')
    }
})

// Log our bot in
client.login(token);
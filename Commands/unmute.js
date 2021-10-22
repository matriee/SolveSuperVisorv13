const Settings = require('../Configration.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');


module.exports = {
    "code": "unmte","aliases": ["um", "u"], async run (client,message,args){

        const member = message.mentions.members.first();
        let target = message.guild.members.cache.get(member.id)
        const role = Settings.Moderation.Mute;

        target.roles.remove(role.id);
        message.reply('Unmuted!')
  
  }
};
  
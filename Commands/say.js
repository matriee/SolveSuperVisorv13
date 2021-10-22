const Settings = require('../Configration.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');


module.exports = {
    "code": "say","aliases": [], async run (client,message,args){
     
        var taglı = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(Settings.Registery.Tag)).size;
        var toplamüye = message.guild.memberCount;
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var boost = message.guild.premiumSubscriptionCount;
        var boostlevel = message.guild.premiumTier;

        const emb = new MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL())
        .setDescription(`
        Sunucuda toplam **${toplamüye}** üye bulunmakta
        Sunucumuzda aktif **${online}** üye bulunmakta
        Tagımızda toplam **${taglı}** taglı üye bulunmakta
        Sunucumuzun boost sayısı : ${boost}
        Sunucumuzun boost seviyesi : ${boostlevel}
        `)
        .setFooter(`${Settings.GuildName} <3 Vectra`)



  }};
  
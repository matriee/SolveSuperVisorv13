const Settings = require('../Configration.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');


module.exports = {
    "code": "teyitlerim","aliases": [], async run (client,message,args){


        const member =  message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        const eekayit = db.fetch(`ye_kayit_${member.id}`);
        const ekkayit = db.fetch(`yk_kayit_${member.id}`);
        const etoplamkayit = db.fetch(`yt_kayit_${member.id}`);

        const ekayit = db.fetch(`ye_kayit_${message.author.id}`)
        const kkayit = db.fetch(`yk_kayit_${message.author.id}`)
        const tkayit = db.fetch(`yt_kayit_${message.author.id}`)

        const eEmbed = new MessageEmbed()
        .setTitle(`${member} üyesinin teyit verileri`)
        .setDescription(`
        Toplam Erkek Kaydı : **${ekayit}**
        Toplam Kadın Kaydı : **${ekkayit}**
        Toplam Kaydı : **${etoplamkayit}**
        `)
        .setFooter(`${Settings.GuildName} <3 Vectra`)

        
        const embed = new MessageEmbed()
        .setTitle(`${message.author} üyesinin teyit verileri`)
        .setDescription(`
        Toplam Erkek Kaydı : **${kayit}**
        Toplam Kadın Kaydı : **${kkayit}**
        Toplam Kaydı : **${tkayit}**
        `)
        .setFooter(`${Settings.GuildName} <3 Vectra`)


        if(Settings.Registery.RegisterStaff.some(id => message.member.roles.cache.has(id))){
            return message.channel.send(`**Hata : Yeterli yetkiniz bulunmamakta.** \n ADMİN yetkisi olanlar bile rol almak zorundadır. \n [Neden?](https://solvebey.github.io/bot-yardım/yetkiler.html)`);
        }
        if(!member){
            message.channel.send(embed);
        } else {
            message.channel.send(eEmbed);
        }

     

  }};
  
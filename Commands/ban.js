const { MessageEmbed } = require('discord.js');
const Settings = require('../Configration.json');


module.exports = {
    "code": "ban","aliases": [], async run (client,message,args){
       
        let reason = args.slice(1).join(" ");
    
        const member = message.mentions.members.first() || message.guild.users.cache.get(args[0]);

        
        let embed = new MessageEmbed()
          .setTitle("Komut : Ban")
          .setDescription(`${member} (${member.id} tarafından ${reason} nedeniyle banlandı!`)
          .setColor("#ff2050")
          .setThumbnail(member.avatarURL)
          .setFooter(`Banned by ${message.author.tag}`);

        
        if (!reason) reason = "Belirtilmemiş";
        if (!member) return message.channel.send(`Hata : Bir kişi belirtmelisiniz [#2341]()`);
        if (member.id === message.author.id) return message.channel.send(`Hata : Kendinizi banlayamazsınız. [#2352]()`);
        if (member.id === message.guild.ownerId) return message.channel.send("Hata : Sunucu sahibini banlayamazsınız. [#2353]()");
        if(Settings.Moderation.BanStaff.some(id => message.member.roles.cache.has(id))){
            return message.channel.send(`**Hata : Yeterli yetkiniz bulunmamakta.** \n ADMİN yetkisi olanlar bile rol almak zorundadır. \n [Neden?](https://solvebey.github.io/bot-yardım/yetkiler.html)`);
        }
        
    
        member.ban({
            reason: reason,
          })
          .then(() => {
            message.channel.send({ embeds: [embed] });
          });


    }
};
  
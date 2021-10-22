const { MessageEmbed } = module.require("discord.js");
const ms = require("ms");
const discord = require("discord.js");
const Settings = require('../Configration.json');


module.exports = {
    "code": "tempjail","aliases": ["tj", "j", "jail"], async run (client,message,args){
     
        
    const member = message.mentions.members.first();
    const time = args[0];
    const role = Settings.Moderation.Jail;
    const reason = args.slice(1).join(" ");



    if (!member) return message.channel.send("Hata : Bir üye etiketlemelisiniz. [#2341]()");
    if (member.id === message.owner.id) return message.channel.send("Hata : Sunucu sahibine mute atamazsınız. [#2353]()");
    if (!time) return message.channel.send("Hata : Bir zaman girmelisiniz. [#2362]()");
    if (!reason) return message.channel.send("Hata : Bir sebep girmelisiniz. [#2353]() ");
    if(Settings.Moderation.JailStaff.some(id => message.member.roles.cache.has(id))){
        return message.channel.send(`**Hata : Yeterli yetkiniz bulunmamakta.** \n ADMİN yetkisi olanlar bile rol almak zorundadır. \n [Neden?](https://solvebey.github.io/bot-yardım/yetkiler.html)`);
    }
    
    const mtembed = new MessageEmbed()
      .setTitle("Komut : Tempjail")
      .setColor("RANDOM")
      .addField("Üye :", member)
      .addField("Sebep :", reason)
      .addField("Yetkili :", message.member.displayName)
      .addField("Zaman :", time, true);

    const mtuembed = new MessageEmbed()
      .setTitle("JAİLLENDİN!!")
      .setColor("RANDOM")
      .addField("Jaile atılma sebebin", reason)
      .addField("Yetkili:", message.member.displayName)
      .addField("**UYARI** Yetkililerimize özelden kışkırtıcı, kalp kırıcı, kötü ve art niyet taşıyan sözler sarf etmek yasaktır. Aksi taktirde Maddi ve Manevi olarak söylenen sözlerde suça ilişkin kanıtlarla birlikte hukuki işlem başlatılabilir.")
      .addField("Zaman", time, true);

    member.send({ embeds: [mtuembed] });
    message.channel.send({ embeds: [mtembed] });
    member.roles.add(role);
    setTimeout(function () {
      member.roles.remove(role);
      member.send(`Jail süren bitti! Kurallara lütfen dikkat et :)`);
    }, ms(time));
  
  
  }
};
  
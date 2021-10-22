const Settings = require('../Configration.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');


module.exports = {
    "code": "kayıt","aliases": ["k", "e", "kayit"], async run (client,message,args){

        const member =  message.mentions.members.first() || message.guild.users.cache.get(args[0]);
        const isim = args[1].charAt(0).replace("i", "İ").toUpperCase() + args[1].slice(1).toLowerCase();
        const yas = Number(args[2]);
        const ydberkek = db.fetch(`ye_kayit_${message.author.id}`);
        const ydbkadin = db.fetch(`yk_kayit_${message.author.id}`);
        const ydbtoplam = db.fetch(`yt_kayit_${message.author.id}`);

        let nEmbed = new MessageEmbed()
        .setTitle(`Komut : Kayıt`)
        .setDescription(`${member} adlı kullanıcının adı başarıyla ${isim} | ${yas} şeklinde ayarlandı. \n\n Lütfen **35** saniye boyunca aşağıdaki butonlara basarak kayıtı tamamlayınız. \n\n Kayıt esnasında kullanıcının eski isimlerine bakmanız önerilir. \n **Komut Kullanımı: .isimler @<user/id>**`)
        .setColor("#ff2050")
        .setThumbnail(member.avatarURL)
        .setFooter(`Solve <3 Vectra`)

        
        let maleEmbed = new MessageEmbed()
        .setTitle("Komut : Kayıt")
        .setDescription(``)
        .setColor("#ff2050")
        .setThumbnail(member.avatarURL)
        .setFooter(`${message.author.tag} Toplam: ${ydbtoplam} | Erkek: ${ydberkek}`);


        let femaleEmbed = new MessageEmbed()
        .setTitle("Komut: Kayıt")
        .setDescription(``)
        .setColor(`#ff2050`)
        .setThumbnail(member.avatarURL)
        .setFooter(`${message.author.tag} Toplam: ${ydbtoplam} | Kadın: ${ydbkadin}`)

        let nameeEmbed = new MessageEmbed()
        .setTitle("Komut: Kayıt")
        .setDescription(``)
        .setColor("#ff2050")
        .setThumbnail(member.avatarURL)
        .setFooter(`Solve <3 Vectra`)

        if(!member.roles.cache.has(Settings.Registery.Man) && !member.roles.cache.has(Settings.Registery.Woman)){
            
            const maleBtn = new MessageButton()
            .setCustomId("MALE")
            .setLabel("Erkek")
            .setStyle("SECONDARY")


            const femaleBtn = new MessageButton()
            .setCustomId("FEMALE")
            .setLabel("Kadın")
            .setSytle("DANGER") // Renklerin düzgün olması için "DANGER" yaptım. Yoksa kadınlarla bir alıp veremediğim yok :p


            let asilmsg = await message.channel.send({ components : [ maleBtn, femaleBtn ], embeds : nEmbed })
            var filtre = (button) => button.clicker.member.id == message.author.id;
            let collector = await asilmsg.createButtonCollector(filtre, {time: 35000});


            if(!member) return message.channel.send(`**Hata : Bir kişi etiketlemelisiniz.** [#2341]()`)
            if(!isim) return message.channel.send(`**Hata : Bir isim girmelisiniz.** [#2342]()`)
            if(!yas) return message.channel.send(`**Hata : Bir yaş girmelisiniz.** [#2343]()`)
            if(Settings.Registery.RegisterStaff.some(id => message.member.roles.cache.has(id))){
                return message.channel.send(`**Hata : Yeterli yetkiniz bulunmamakta.** \n ADMİN yetkisi olanlar bile rol almak zorundadır. \n [Neden?](https://solvebey.github.io/bot-yardım/yetkiler.html)`);
            }

            collector.on("collect", async (button) => {
                if(button.customId == "MALE"){
                    await db.add(`ye_kayit_${message.author.id}`, 1);
                    await db.add(`yt_kayit_${message.author.id}`, 1);
                    await member.setNickname(`${Settings.Registery.Tag} ${isim} | ${yas}`)
                    await member.roles.add(Settings.Registery.Man)
                    await button.think(true)
                    await button.reply.edit(maleEmbed)
                }
                if(button.customId == "FEMALE"){
                    await db.add(`yk_kayit_${message.author.id}`, 1);
                    await db.add(`yt_kayit_${message.author.id}`, 1);
                    await member.setNickname(`${Settings.Registery.Tag} ${isim} | ${yas}`)
                    await member.roles.add(Settings.Registery.Man)
                    await button.think(true)
                    await button.reply.edit(femaleEmbed)
                }
            });

            collector.on("end", async () => {
                asilmsg.delete();
            });

        } else {
            await member.setNickname(`${Settings.Registery.Tag} ${isim} | ${yas}`)
            message.channel.send(`Kişinin isim başarıyla değiştrildi.`)
        }





        /*
        
        db.add(`ye_kayit_${message.author.id}`, 1);
        db.add(`yk_kayit_${message.author.id}`, 1);
        db.add(`yt_kayit_${message.author.id}`, 1);
        member.roles.add(Settings.R)

        */

}};
  

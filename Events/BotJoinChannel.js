const Discord = require("discord.js");
const client = global.client;

exports.execute = async (message) => {
  
 var JoinChannel = client.channels.cache.get("Bot Voice Channel ID");
 
 const { joinVoiceChannel } = require('@discordjs/voice');

 if(JoinChannel){
const connection = joinVoiceChannel({
	channelId: JoinChannel.id,
	guildId: JoinChannel.guild.id,
	adapterCreator: JoinChannel.guild.voiceAdapterCreator,
});
 } else {
   console.log("Bot failed to login to a voice channel")
 }
    
 };
exports.conf = {
  event: "ready"
};

module.exports = {
  "code": "ping","aliases": [], async run (client,message,args){
   
  message.channel.send(':ping_pong: ...Pong! '+client.ws.ping+'ms');

}};

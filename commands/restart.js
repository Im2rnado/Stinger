require('dotenv').config();

module.exports = {
	name: 'restart',
	description: 'List all of my commands or info about a specific command.', 
        async execute(client, message, args) {

    if(message.author.id != "510427790340915222") return message.react('🤡')

  try {
        message.channel.send('\<a:pLoading:750276639497256980> Attempting a restart...').then(msg => {
          //msg.react('🆗');
          setTimeout(function(){
             msg.edit('<a:pLoading:750276639497256980> I should be back up now!');
          }, 10000);
        })
        .then(client.destroy())
        .then(client.login(process.env.DISCORD_TOKEN))




          } catch(e) {
            message.channel.send(`ERROR: ${e.message}`)

    }
  }

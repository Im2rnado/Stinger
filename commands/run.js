const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'run',
	description: 'Mod Only',
	aliases: ['v'],
	execute(message, args, client) {
  
    if (!(message.author.id == '510427790340915222')) return message.react('🤡');
    
    const commandName = args[0].toLowerCase();
    const response = `client.${commandName}`
    
		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#FA4454')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Runned Code', value: `${args[0]}` },
				{ name: 'Result', value: `${response}` })
			.setTimestamp();

		return message.channel.send(yourEmbed);
	},
};

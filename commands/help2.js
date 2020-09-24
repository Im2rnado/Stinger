const Discord = require('discord.js');

module.exports = {
	name: 'help2',
	description: 'Premium Help!',
	execute(message) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(':mailbox_with_mail: Hey! Want some help?')
			.setDescription('[Press Me](https://github.com/Im2rnado/Stinger-Help)')
			.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
		return message.channel.send(yourEmbed);
	},
};
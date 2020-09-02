const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Invites you to the support server.',
	execute(message) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Join our support server')
			.setDescription(':mailbox: [Press Me](https://discord.gg/CsHFZxh)');
		return message.channel.send(yourEmbed);
	},
};
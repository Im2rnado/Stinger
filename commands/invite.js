const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Invites the bot to your server!',
	execute(message) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(':mailbox: Invite Stinger')
			.setDescription('[Press Me](https://discord.com/api/oauth2/authorize?client_id=743591965450305636&permissions=8&scope=bot)')
			.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
		return message.channel.send(yourEmbed);
	},
};
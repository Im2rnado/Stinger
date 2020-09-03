const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'version',
	description: 'Tell you the bot\'s version',
	aliases: ['v'],
	execute(message) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('**Stinger Discord Bot**')
			.setThumbnail('https://cdn.discordapp.com/avatars/743591965450305636/9288819898ed2298c59eba18d6de2ff8.webp')
			.addFields(
				{ name: 'Current Bot Version', value: '2.0.0.0' },
				{ name: 'Discord.js Version', value: '12.3.1' },
				{ name: 'Command Prefix', value: `${process.env.PREFIX}` },
				{ name: 'Bot Developer', value: '[tornado](https://twitter.com/im2rnado)' },
				{ name: 'Bot Host', value: 'Heroku' },
				{ name: 'Support Server', value: 'https://discord.gg/CsHFZxh' })
			.setTimestamp();

		return message.channel.send(yourEmbed);
	},
};
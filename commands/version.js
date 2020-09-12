const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'version',
	description: 'Tell you the bot\'s version',
	aliases: ['v'],
	execute(message) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#FA4454')
			.setTitle('**Stinger Discord Bot**')
			.setThumbnail('https://cdn.discordapp.com/app-icons/743591965450305636/9288819898ed2298c59eba18d6de2ff8.png')
			.addFields(
				{ name: 'Current Bot Version', value: '2.3.0' },
				{ name: 'Command Prefix', value: `${process.env.PREFIX}` },
				{ name: 'Owner/Developer', value: '[Tornado](https://twitter.com/im2rnado)' },
				{ name: 'Hosted by', value: 'heroku.com' },
				{ name: 'Support Server', value: '[Press Me!](https://discord.gg/CsHFZxh)' })
			.setTimestamp();

		return message.channel.send(yourEmbed);
	},
};

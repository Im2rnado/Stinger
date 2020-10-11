const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'version',
	description: 'Tell you the bot\'s version',
	aliases: ['v'],
	execute(message, args, client) {
		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#FA4454')
			.setTitle('**Stinger Discord Bot**')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Current Bot Version', value: '3.2.0' },
				{ name: 'Command Prefix', value: `${process.env.PREFIX}` },
				{ name: 'Invite Me', value: '[Press Me!](https://discord.com/api/oauth2/authorize?client_id=743591965450305636&permissions=8&scope=bot)' },
				{ name: 'Total Servers', value: client.guilds.cache.size },
				{ name: 'Owner/Developer', value: '[Tornado](https://twitter.com/im2rnadoo)' },
				{ name: 'Hosted by', value: 'heroku.com' },
				{ name: 'Support Server', value: '[Press Me!](https://discord.gg/CsHFZxh)' })
			.setTimestamp();

		return message.channel.send(yourEmbed);
	},
};

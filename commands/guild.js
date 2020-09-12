const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'guild',
	description: 'Displays information about a user.',
	aliases: ['serverinfo', 'g', 'guildinfo', 'server'],
	guildOnly: true,
	execute(message) {
		const userEmbed = new Discord.MessageEmbed()
			.setTimestamp()
			.setColor('RANDOM')
			.setThumbnail(message.guild.iconURL())
			.addField('Server Name', message.guild.name, true)
			.addField('Server ID', message.guild.id, true)
			.addField('Server Owner', message.guild.owner, true)
			.addField('Member Count', message.guild.memberCount, true)
			.addField('Boosts', message.guild.premiumSubscriptionCount, true)
			.addField('Boost Level', message.guild.premiumTier, true)
			.addField('Security Level', message.guild.verificationLevel, true)
			.addField('Server Region', message.guild.region, true)
			.addField('Created at', `${moment(message.guild.createdAt).format('MM/DD/YYYY')}`, true)
			.setFooter('Deevloped by im2rnado');

		message.channel.send(userEmbed);
	},

};
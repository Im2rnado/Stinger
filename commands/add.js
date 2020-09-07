/* eslint-disable no-shadow */
const Discord = require('discord.js');

module.exports = {
	name: 'add',
	description: 'Adds a member to premium',
	aliases: ['grant'],
	cooldown: 3,
	guildOnly: true,
	execute(message) {

		const {
			member,
		} = message;

		console.log('add.js is working properly ');

		if(member.roles.cache.some(role => role.name === 'Admin')) {
			const target = message.mentions.members.first();
			const user = message.mentions.users.first();
			if(target) {
				const role = message.guild.roles.cache.find(role => role.name === 'Premium');
				if(role) {
					target.roles.add(role);

					const otherIconEmbed = new Discord.MessageEmbed()
						.setTitle(`Granted Premium to\n${user.tag}`)
						.setColor('#32CD32')
						.setThumbnail(user.displayAvatarURL())
						.setTimestamp()
						.setFooter(`Requested by: ${message.author.tag}`, `${message.author.displayAvatarURL()}`);

					return message.channel.send(otherIconEmbed);
				}
				else{
					message.channel.send('An unexpected error has occured.');
				}
			}
			else {
				message.channel.send('Please specify who you want to add to premium.');
			}
		}
		else {
			message.react('🤡');
		}
	},
};
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const Discord = require('discord.js');

module.exports = {
	name: 'add',
	description: 'MOD ONLY!',
	aliases: ['grant'],
	async execute(message) {
		if(message.author.id !== '510427790340915222') {
			message.react('🤡');
		}

		const target = message.mentions.members.first();
		const user = message.mentions.users.first();

		try {
			// equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
			await Premium.create({
				name: user.id,
			});
			if(target) {
				const role = message.guild.roles.cache.find(role => role.name === 'Premium');
				if(role) {
					target.roles.add(role);

					const otherIconEmbed = new Discord.MessageEmbed()
						.setTitle(`Granted Premium to\n${user.tag}`)
						.setColor('#32CD32')
						.setThumbnail(user.displayAvatarURL())
						.setTimestamp()
						.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

					return message.channel.send(otherIconEmbed);
				}
				else{
					message.channel.send('An unexpected error has occured.');
				}
			}
			else {
				message.channel.send('Please specify who you want to add to premium.');
			}
			return message.channel.send(otherIconEmbed);
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.reply('That user already has premium.');
			}
			return message.reply('Something went wrong with adding a user.');
		}
	},
};
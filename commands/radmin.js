/* eslint-disable no-shadow */
const Discord = require('discord.js');

module.exports = {
	name: 'radmin',
	description: 'Removes a member from admin',
	cooldown: 3,
	guildOnly: true,
	execute(message) {

		if(message.author.id === '510427790340915222') {
			const target = message.mentions.members.first();
			const user = message.mentions.users.first();
			if(target) {
				const role = message.guild.roles.cache.find(role => role.name === 'Admin');
				if(role) {
					target.roles.remove(role);

					const otherIconEmbed = new Discord.MessageEmbed()
						.setTitle(`Removed Admin from\n${user.tag}`)
						.setColor('#FF0000')
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
				message.channel.send('Please specify who you want to remove from admin.');
			}
		}
		else {
			message.react('🤡');
		}
	},
};
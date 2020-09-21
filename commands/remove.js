/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const Discord = require('discord.js');

module.exports = {
	name: 'remove',
	description: 'MOD ONLY!',
	async execute(message) {
		if(message.author.id !== '510427790340915222') {
			message.react('🤡');
		}

		const target = message.mentions.members.first();
		const user = message.mentions.users.first();

		const rowCount = await Premium.destroy({ where: { name: user.id } });
		if (!rowCount) return message.reply('This user does not have premium.');
		if(target) {
			// eslint-disable-next-line no-shadow
			const role = message.guild.roles.cache.find(role => role.name === 'Premium');
			if(role) {
				target.roles.remove(role);

				const otherIconEmbed = new Discord.MessageEmbed()
					.setTitle(`Removed Premium from\n${user.tag}`)
					.setColor('#FF0000')
					.setThumbnail(user.displayAvatarURL())
					.setTimestamp()
					.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

				return message.channel.send(otherIconEmbed);
			}
			else{
				message.channel.send('This user does not have premium.');
			}
		}
		else {
			message.channel.send('Please specify who you want to remove from premium.');
		}
	},
};
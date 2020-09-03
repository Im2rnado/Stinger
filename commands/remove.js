const Discord = require('discord.js');

module.exports = {
	name: 'remove',
	description: 'Removes a member from premium',
	cooldown: 3,
	execute(message) {

		const {
			member,
		} = message;

		if(member.roles.cache.some(role => role.name === 'Admin')) {
			const target = message.mentions.members.first();
			const user = message.mentions.users.first();
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
						.setFooter(`Requested by: ${message.author.tag}`, `${message.author.displayAvatarURL()}`);

					return message.channel.send(otherIconEmbed);
				}
				else{
					message.channel.send('An unexpected error has occured.');
				}
			}
			else {
				message.channel.send('Please specify who you want to remove from premium.');
			}
		}
		else {
			message.react('🤡');
		}
	},
};
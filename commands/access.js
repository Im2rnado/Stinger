const Discord = require('discord.js');

module.exports = {
	name: 'access',
	description: 'Checks if a user has Premium',
	guildOnly: true,
	execute(message) {
		const member = message.mentions.members.first();
		const user = message.mentions.users.first();

		if(member.roles.cache.some(role => role.name === 'Premium')) {
			const embed = new Discord.MessageEmbed ()
				.setColor('#32CD32')
				.setAuthor(`Yep, ${user.tag} has Premium!`, user.displayAvatarURL());
			message.channel.send(embed);
		}
		else {
			const embedno = new Discord.MessageEmbed ()
				.setColor('#FF0000')
				.setAuthor(`Nope, ${user.tag} doesn't have Premium!`, user.displayAvatarURL());
			message.channel.send(embedno);
		}

	} };
const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon'],
	description: 'Sends the avatar of the requested user!',
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		if (args[0]) {
			const user = message.mentions.users.first();
			if (!user) return message.reply('Please mention a user to access their profile picture.');

			const otherIconEmbed = new Discord.MessageEmbed()
				.setTitle(`${user.username}'s Avatar`)
				.setImage(user.displayAvatarURL({ dynamic: true }));

			return message.channel.send(otherIconEmbed).catch(err => console.log(err));

		}

		const myIconEmbed = new Discord.MessageEmbed()
			.setTitle('Avatar')
			.setDescription(`Do you think ${message.author.username} is cute? `)
			.setImage(message.author.displayAvatarURL({ dynamic: true }));

		return message.channel.send(myIconEmbed).catch(err => console.log(err));
	},
};
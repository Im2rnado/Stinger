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
			if (!user) return message.reply('And who\'s avatar am I supposed to get, dummy');

			const otherIconEmbed = new Discord.MessageEmbed()
				.setTitle('Avatar')
				.setDescription(`Do you think ${user.username} is cute? `)
				.setColor('RANDOM')
				.setImage(user.displayAvatarURL({ dynamic: true }));

			return message.channel.send(otherIconEmbed).catch(err => console.log(err));

		}

		const myIconEmbed = new Discord.MessageEmbed()
			.setTitle('Avatar')
			.setDescription(`I think ${message.author.username} is cute`)
			.setColor('RANDOM')
			.setImage(message.author.displayAvatarURL({ dynamic: true }));

		return message.channel.send(myIconEmbed).catch(err => console.log(err));
	},
};
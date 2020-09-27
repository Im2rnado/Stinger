const Discord = require('discord.js');

module.exports = {
	name: 'rate',
	description: 'Rates you!',
	execute(message, args) {
		const number = Math.floor(Math.random() * 101);
		if (!args[0]) {
			const emved = new Discord.MessageEmbed()
				.setTitle('Your Rating')
				.setColor('PINK')
				.addField('I would rate you a', `:pleading_face: ${number}%`);
			return message.channel.send(emved);
		}
		else {
			const user = message.mentions.users.first();
			const emved = new Discord.MessageEmbed()
				.setTitle('Your Friend\'s Rating')
				.setColor('PINK')
				.addField(`I would rate ${user.username} a`, `:pleading_face: ${number}%`);
			return message.channel.send(emved);

		}

	},
};

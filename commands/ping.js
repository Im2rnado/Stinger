const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message) {
		// It sends the user "Pinging"
		message.channel.send('Pinging...').then(m =>{
			// The math thingy to calculate the user's ping
			const ping = m.createdTimestamp - message.createdTimestamp;

			// Basic embed
			const embed = new Discord.MessageEmbed()
				.setAuthor(`Your ping is ${ping}`)
				.setColor('Your Color');

			// Then It Edits the message with the ping variable embed that you created
			m.edit(embed);
		});
	},
};
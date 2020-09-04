const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'suggest',
	description: 'Send your Suggestion',
	aliases: ['sg'],
	usage: 'suggest <message>',
	execute(message, args) {

		if(!args.length) {
			return message.channel.send('Please Give the Suggestion');
		}

		const channel = message.guild.channels.cache.find((x) => (x.name === 'suggestion' || x.name === 'suggestions'));


		if(!channel) {
			return message.channel.send('There is no channel with name `suggestions`');
		}
		message.delete().catch(err => console.log(err));

		const embed = new MessageEmbed()
			.setTitle(`Suggestion by ${message.author.username}`)
			.setDescription(args.join(' '))
			.setTimestamp()
			.setFooter('Developed by tornado#0689');


		channel.send(embed).then(m => {
			m.react('751418059528601671');
			m.react('751418059281006644');
		});

	},
};
const Discord = require('discord.js');
const beautify = require('beautify');
require('dotenv').config();

module.exports = {
	name: 'eval',
	description: 'MOD ONLY!',
	execute(message, args, client) {
		if (!(message.author.id == '510427790340915222')) {
			return message.react('🤡');
		}
		if (!args[0]) {
			message.channel.send('Evaluate __**SOMETHING**__ please!');
		}
		try {
			if (args.join(' ').toLowercase().includes('token')) {
				return;
			}

			const toeval = args.join(' ');
			const evaluated = eval(toeval);

			const embed = new Discord.MessageEmbed()
				.setColor('GREEN')
				.setTimestamp()
				.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
				.setTitle('Eval')
				.addField('To Evaluate:', `\`\`\`js\n${beautify(args.join(' '), { format: 'js' })}\n\`\`\``)
				.addField('Evaluated:', evaluated)
				.addField('Type of:', typeof (evaluated));

			message.channel.send(embed);
		}
		catch (e) {
			const embed = new Discord.MessageEmbed()
				.setColor('RED')
				.setTimestamp()
				.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
				.setTitle(':x: Error!')
				.setDescription(e);

			message.channel.send(embed);
		}
	},
};

require('dotenv').config();
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	cooldown: 5,
	usage: '[command name]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			const embed = new MessageEmbed()
				.setTitle('Here are all of my commands:')
				.setColor('#0000FF')
				.setDescription(commands.map(command => command.name).join('\n'))
				.setFooter(`Send ${process.env.PREFIX}help [command name] to get info on a specific command.`);

			return message.channel.send(embed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${process.env.PREFIX}${command.name} ${command.usage}`);
		data.push('Developed by tornado#0689');

		message.channel.send(data, { split: true });
	},
};
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
				.setTitle(':mailbox_with_mail: Hey! Want some help?')
				.setColor('RANDOM')
				.addField('Commands', (commands.map(command => command.name).join(' - ')))
				.addField('Premium', '[Press Me](https://github.com/Im2rnado/Stinger-Help)')
				.setFooter(`Send ${process.env.PREFIX}help [command name] to get info on a specific command.`);

			return message.channel.send(embed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

                const embed1 = new MessageEmbed()
                                .setTitle(':mailbox_with_mail: Hey! Want some help?')
				.setColor('RANDOM')
                                .setFooter('Coded with ❤️ by im2rnado');

		embed1.addField('**Name**:', `${command.name}`);

		if (command.aliases) embed1.addField('**Aliases**:', `${command.aliases.join(', ')}`);
		if (command.description) embed1.addField('**Description**:', `${command.description}`);
		embed1.addField('**Usage**:', '[Press Me](https://github.com/Im2rnado/Stinger-Help)');

		message.channel.send(embed1);
	},
};

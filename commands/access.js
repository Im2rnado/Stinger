/* eslint-disable no-undef */
const Discord = require('discord.js');

module.exports = {
	name: 'access',
	description: 'MOD ONLY!',
	async execute(message, args) {
		if (!(message.author.id == '510427790340915222')) {
			message.react('🤡');
		}
		else {
			if (!args.length) {
			// equivalent to: SELECT name FROM tags;
				const tagList = await Premium.findAll({ attributes: ['name'] });
				const tagString = tagList.map(t => `<@${t.name}>`).join('\n') || 'No premium users.';
				const embed1 = new Discord.MessageEmbed()
					.setColor('#FA4454')
					.setTitle('Access List')
					.setDescription(`${tagString}`);
				return message.channel.send(embed1);

			}

			const user = message.mentions.users.first();

			// equivalent to: SELECT * FROM Premium WHERE name = 'user' LIMIT 1;
			const tag = await Premium.findOne({ where: { name: user.id } });
			if (tag) {
				const embed = new Discord.MessageEmbed()
					.setColor('#32CD32')
					.setTitle(`Yep, **${user.tag}** has Premium!`);
				return message.channel.send(embed);
			}
			const embedno = new Discord.MessageEmbed ()
				.setColor('#FF0000')
				.setTitle(`Nope, **${user.tag}** doesn't have Premium!`);
			return message.channel.send(embedno);
		}
	},
};

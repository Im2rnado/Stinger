/* eslint-disable no-undef */
const Discord = require('discord.js');
const hastebin = require('hastebin-gen');
require('./login.js');

module.exports = {
	name: 'history',
	description: 'Returns your history',
	async execute(message) {

		if (message.channel.type != 'dm') {
			return message.channel.send('This command only works in DMs.');
		}

		if (typeof valorant === 'undefined' || valorant === null) {
			return message.channel.send('❌ You are not logged in! Please login first.');
		}

		else {

			const y = await message.channel.send('<a:loading:749963556316905494>  Getting your history...'); (async () => {
				try {
					const store = await valorant.getStorefront();

					const haste = await hastebin(`${store}`, { extension: 'txt' });

					console.log(haste);

					const NewMessage = new Discord.MessageEmbed()
						.setTitle('**Open this link to view your store**')
						.setColor('#FA4454')
						.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
						.setFooter('Wrong info? Make sure to choose the correct region.')
						.setDescription(`${haste}`);
					return y.edit('', { embed: NewMessage });

				}
				catch (error) {
					console.error(error.stack);
					return y.edit('❌ You are not logged in! Please login first.');
				}
			})();
		}

	},
};

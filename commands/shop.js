/* eslint-disable no-undef */
const Discord = require('discord.js');
const hastebin = require('hastebin-gen');
require('./login.js');

module.exports = {
	name: 'shop',
	description: 'Returns your store',
	aliases: ['store', 'st'],
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
					const store1 = await valorant.getStorefront();
					const store = JSON.stringify(store1);

					const haste = await hastebin(`${store}`, { url: 'https://hasteb.in' }, { extension: 'txt' });

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

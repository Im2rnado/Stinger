const Discord = require('discord.js');
require('./login.js');

module.exports = {
	name: 'rank',
	description: 'Returns your rank',
	async execute(message) {

		if (message.channel.type != 'dm') {
			return message.channel.send('This command only works in DMs.');
		}

		if (typeof valorant === 'undefined' || valorant === null) {
			return message.channel.send('❌ You are not logged in! Please login first.');
		}

		else {

			const y = await message.channel.send('<a:loading:749963556316905494>  Getting your rank...'); (async () => {
				try {
					const comphistory = await valorant.getCompetitiveHistory();

					const NewMessage = new Discord.MessageEmbed()
						.setTitle('**Rank**')
						.setColor('#FA4454')
						.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
						.setFooter('Wrong info? Make sure to choose the correct region.')
						.setDescription(`${comphistory.History}`);
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

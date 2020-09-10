const Discord = require('discord.js');
const Valorant = require('./login.js');
const invite = ('https://discord.gg/CsHFZxh');

module.exports = {
	name: 'balance',
	description: 'Returns your points',
	aliases: ['bal', 'points'],
	async execute(message) {

		if (message.channel.type != 'dm') {
			return message.channel.send('This command only works in DMs.');
		}

                if (typeof valorant === 'undefined' || valorant === null) {
                        return message.channel.send('❌ You are not logged in! Please login first.');
                }
                
                else {

		const y = await message.channel.send('<a:loading:749963556316905494>  Getting your balance...'); (async () => {
			try {
				const balance = await valorant.getWallet();

				const NewMessage = new Discord.MessageEmbed()
					.setTitle('**Balances**')
					.setColor('#FA4454')
					.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
					.setFooter('Wrong info? Make sure to choose the correct region.')
					.setDescription(`<:valorantp:745722786957492376> Valorant Points: **${balance.ValorantPoints}**\n<:radianitep:745722840782733445> Radianite Points: **${balance.RadianitePoints}**`);
				return y.edit('', { embed: NewMessage });

			}
			catch (error) {
				console.error(error.stack);
				const errormessage1 = new Discord.MessageEmbed()
					.setColor('#ffff00')
					.setTitle('⚠️ **Uh  Oh! That was unexpected!**')
					.setDescription(`An error has occurred and we're working on a fix ASAP!\nYou can [Join our Support Server](${invite}) and report it there.`)
					.addField('Error Message: ', `\`\`\`js\n${error}\`\`\``);
				return message.channel.send(errormessage1);
			}
		})();
           }

	},
};

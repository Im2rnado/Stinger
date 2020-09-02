const Valorant = require('valorant.js');
const Discord = require('discord.js');
const invite = ('https://discord.gg/CsHFZxh');
const yourEmbed = new Discord.MessageEmbed()
	.setColor('#FA4454')
	.setTitle('**You are not logged in!**')
	.setDescription('*Please login using:* +login <username> <password>');

module.exports = {
	name: 'balance',
	description: 'Checks your Valorant accounts balance',
	aliases: ['bal'],
	execute(message, args) {
		if (message.channel.type != 'dm') {
			return message.react('🤡');
		}
		if (!args[1]) {
			return message.channel.send(yourEmbed);
		}

		message.channel.send('Getting your balance, please wait  <a:loading:745396617795862699>').then(m => m.delete({ timeout: 5000 }))
			.catch(err => {
				console.log(err);
			}),
		(async () => {
			try {
				const Username = args[0];
				const Password = args[1];

				const valorant = new Valorant.Client({
					username: `${Username}`,
					password: `${Password}`,
					region: Valorant.region.eu,
					debug: true,
				});

				await valorant.login();
				const balance = await valorant.getWallet();

				const NewMessage = new Discord.MessageEmbed()
					.setTitle('**Balance:**')
					.setColor('#FA4454')
					.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
					.setDescription(`<:valorantp:745722786957492376> Valorant Points: ${balance.Valorant_Points}\n<:radianitep:745722840782733445> Radianite Points: ${balance.Radianite_Points}`);

				return message.channel.send(NewMessage);

			}
			catch (error) {
				console.error(error);
				const errormessage1 = new Discord.MessageEmbed()
					.setColor('#ffff00')
					.setTitle('⚠️ **Uh  Oh! That was unexpected!**')
					.setDescription(`An error has occurred and we're working on a fix ASAP!\nYou can [Join our Support Server](${invite}) and report it there.`)
					.addField('Error Message: ', `\`\`\`js\n${error}\`\`\``);
				return message.channel.send(errormessage1);
			}
		})();
	},
};
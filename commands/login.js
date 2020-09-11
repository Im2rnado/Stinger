const Valorant = require('valorant.js');
const Discord = require('discord.js');
const invite = ('https://discord.gg/CsHFZxh');
const yourEmbed = new Discord.MessageEmbed()
	.setColor('#FA4454')
	.setTitle('**Please provide your username and password to login.**')
	.setDescription('*Example:* +login <username> <password>');

const regionEmbed = new Discord.MessageEmbed()
	.setColor('#FA4454')
	.setTitle('**Please react with your region number.**')
	.setDescription('1️⃣ Europe\n2️⃣ North America\n3️⃣ Asia Pacific');

module.exports = {
	name: 'login',
	description: 'Logs in to your Valorant Account',
	aliases: ['i', 'signin'],
	usage: '[username] [password]',
	async execute(message, args) {
		if (message.channel.type != 'dm') {
			return message.channel.send('This command only works in DMs.');
		}

		if (!args[1]) {
			return message.channel.send(yourEmbed);
		}

		const h = await message.channel.send(regionEmbed);
		h.react('1️⃣').then(() => h.react('2️⃣')).then(() => h.react('3️⃣'));

		const filter = (reaction, user) => {
			return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		h.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(async collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '1️⃣') {
                                        await h.delete();
					const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
						try {

							const Username = args[0];
							const Password = args[1];

							global.valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.eu,
								debug: true,
							});

							const data = await valorant.login();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`**👋 Welcome, ${data.displayName}#${data.tagLine}!**`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.setFooter('Wrong info? Make sure to choose the correct region.')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` });

							return y.edit('', { embed: NewMessage });

						}
						catch (error) {
				console.error(error.stack);
				return y.edit('❌ Invalid username or password.');
			}
					})();
				}
				if (reaction.emoji.name === '2️⃣') {
                                        await h.delete();
					const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
						try {

							const Username = args[0];
							const Password = args[1];

							global.valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.na,
								debug: true,
							});


							const data = await valorant.login();

							const balance = await valorant.getWallet();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`**👋 Welcome, ${data.displayName}#${data.tagLine}!**`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.setFooter('Wrong info? Make sure to choose the correct region.')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` });

							return y.edit('', { embed: NewMessage });

						}
						catch (error) {
				console.error(error.stack);
				return y.edit('❌ Invalid username or password.');
			}
					})();
				}
				if (reaction.emoji.name === '3️⃣') {
                                        await h.delete();
					const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
						try {

							const Username = args[0];
							const Password = args[1];

							global.valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.ap,
								debug: true,
							});

							const data = await valorant.login();

							const balance = await valorant.getWallet();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`**👋 Welcome, ${data.displayName}#${data.tagLine}!**`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.setFooter('Wrong info? Make sure to choose the correct region.')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` });

							return y.edit('', { embed: NewMessage });

						}
						catch (error) {
				console.error(error.stack);
				return y.edit('❌ Invalid username or password.');
			}
					})();
				}
			})
			.catch(collected => {
				console.log(`${collected.size}`);
			});
	},
};

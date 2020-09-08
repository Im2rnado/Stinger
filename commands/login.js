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
					const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
						try {

							const Username = args[0];
							const Password = args[1];

							const valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.eu,
								debug: true,
							});

							const data = await valorant.login();

							const balance = await valorant.getWallet();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`👋 Welcome, **${data.displayName}#${data.tagLine}!**`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.setFooter('Wrong info? Make sure to choose the correct region.')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` },
									{ name: '**Balance**', value: `<:valorantp:745722786957492376> Valorant Points: ${balance.ValorantPoints}\n<:radianitep:745722840782733445> Radianite Points: ${balance.RadianitePoints} ` });

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
				if (reaction.emoji.name === '2️⃣') {
					const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
						try {

							const Username = args[0];
							const Password = args[1];

							const valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.na,
								debug: true,
							});
							module.exports = { varToExport: valorant };


							const data = await valorant.login();

							const balance = await valorant.getWallet();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`👋 Welcome, **${data.displayName}#${data.tagLine}**!`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.setFooter('Wrong info? Make sure to choose the correct region.')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` },
									{ name: '**Balance**', value: `<:valorantp:745722786957492376> Valorant Points: ${balance.Valorant_Points}\n<:radianitep:745722840782733445> Radianite Points: ${balance.Radianite_Points} ` });

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
				if (reaction.emoji.name === '3️⃣') {
					const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
						try {

							const Username = args[0];
							const Password = args[1];

							const valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.ap,
								debug: true,
							});

							const data = await valorant.login();

							const balance = await valorant.getWallet();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`👋 Welcome, ${data.displayName}#${data.tagLine}!`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.setFooter('Wrong info? Make sure to choose the correct region.')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` },
									{ name: '**Balance**', value: `<:valorantp:745722786957492376> Valorant Points: ${balance.Valorant_Points}\n<:radianitep:745722840782733445> Radianite Points: ${balance.Radianite_Points} ` });

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
			})
			.catch(collected => {
				console.log(`${collected.size}`);
			});
	},
};
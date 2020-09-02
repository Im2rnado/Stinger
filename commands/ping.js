const Valorant = require('valorant.js');
const Discord = require('discord.js');
const invite = ('https://discord.gg/CsHFZxh');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message, args) {
		const h = await message.channel.send('react');
		h.react('1️⃣').then(() => h.react('2️⃣')).then(() => h.react('3️⃣'));

		const filter = (reaction, user) => {
			return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		h.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '1️⃣') {
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

							const data = await valorant.login();

							const balance = await valorant.getWallet();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`👋 Welcome, ${data.Display}#${data.Tag}!`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` },
									{ name: '**Balance**', value: `<:valorantp:745722786957492376> Valorant Points: ${balance.Valorant_Points}\n<:radianitep:745722840782733445> Radianite Points: ${balance.Radianite_Points} ` });

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
				}
				if (reaction.emoji.name === '2️⃣') {
					(async () => {
						try {

							const Username = args[0];
							const Password = args[1];

							const valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.na,
								debug: true,
							});

							const data = await valorant.login();

							const balance = await valorant.getWallet();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`👋 Welcome, ${data.Display}#${data.Tag}!`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` },
									{ name: '**Balance**', value: `<:valorantp:745722786957492376> Valorant Points: ${balance.Valorant_Points}\n<:radianitep:745722840782733445> Radianite Points: ${balance.Radianite_Points} ` });

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
				}
				if (reaction.emoji.name === '3️⃣') {
					(async () => {
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
								.setTitle(`👋 Welcome, ${data.Display}#${data.Tag}!`)
								.setColor('#FA4454')
								.setThumbnail('https://www.m5.academy/img/valorant_logo.png')
								.addFields(
									{ name: '**Account ID**', value: `||${data.id}||` },
									{ name: '**Balance**', value: `<:valorantp:745722786957492376> Valorant Points: ${balance.Valorant_Points}\n<:radianitep:745722840782733445> Radianite Points: ${balance.Radianite_Points} ` });

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
				}
			})
			.catch(collected => {
				console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
				message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
			});

	} };
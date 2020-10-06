/* eslint-disable no-undef */
const Valorant = require('valorant.js');
const Discord = require('discord.js');
const yourEmbed = new Discord.MessageEmbed()
	.setColor('#FA4454')
	.setTitle('**Please provide your username and password to login.**')
	.setDescription('*Example:* +login username password');

const regionEmbed = new Discord.MessageEmbed()
	.setColor('#FA4454')
	.setTitle('**Please react with your region number.**')
	.setDescription('<:eu:762949162194829313> Europe\n<:na:762949184839745557> North America\n<:global:762949197833044020> Others');

module.exports = {
	name: 'login',
	description: 'Logs in to your Valorant account (Premium Only)',
	aliases: ['i', 'signin'],
	usage: '[username] [password]',
	async execute(message, args, client) {
		const tagName = message.author.id;

		// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
		const tag = await Premium.findOne({ where: { name: tagName } });
		if (tag) {

			if (message.channel.type != 'dm') {
				return message.channel.send('This command only works in DMs.');
			}

			if (!args[1]) {
				return message.channel.send(yourEmbed);
			}

			const h = await message.channel.send(regionEmbed);
			h.react('762949162194829313').then(() => h.react('762949184839745557')).then(() => h.react('762949197833044020'));

			const filter = (reaction, user) => {
				return ['762949162194829313', '762949184839745557', '762949197833044020'].includes(reaction.emoji.name) && user.id === message.author.id;
			};

			h.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(async collected => {
					const reaction = collected.first();

					if (reaction.emoji.name === '76294916219482931') {
						await h.delete();
						const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
							try {

								const Username = args[0];
								const Password = args[1];

								client.sessions.set(tagName, valorant = new Valorant.Client({
									username: `${Username}`,
									password: `${Password}`,
									region: Valorant.region.eu,
									debug: true,
								}));

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
					if (reaction.emoji.name === '762949184839745557') {
						await h.delete();
						const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
							try {

								const Username = args[0];
								const Password = args[1];

								client.sessions.set(tagName, valorant = new Valorant.Client({
									username: `${Username}`,
									password: `${Password}`,
									region: Valorant.region.na,
									debug: true,
								}));


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
					if (reaction.emoji.name === '762949197833044020') {
						await h.delete();
						const y = await message.channel.send('<a:loading:749963556316905494>  Signing in to Riot Services...'); (async () => {
							try {

								const Username = args[0];
								const Password = args[1];

								client.sessions.set(tagName, valorant = new Valorant.Client({
									username: `${Username}`,
									password: `${Password}`,
									region: Valorant.region.ap,
									debug: true,
								}));

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
				})
				.catch(collected => {
					console.log(`${collected.size}`);
				});
		}
		else {
			message.channel.send('**You don\'t have access to use this bot! DM @tornado#9999 to buy Premium**');
		}
	},
};
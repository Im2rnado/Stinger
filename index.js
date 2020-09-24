/* eslint-disable no-undef */
// Modules

require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const invite = ('https://discord.gg/CsHFZxh');

// Declare client

const client = new Discord.Client({ partials: ['MESSAGE', 'USER', 'REACTION'] });
client.commands = new Discord.Collection();
client.sessions = new Discord.Collection();

// Command Handler

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Cooldowns

const cooldowns = new Discord.Collection();

// Database

global.sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

global.Premium = sequelize.define('premium', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
});

// On ready

client.once('ready', () => {
	function randomStatus() {
		const status = ['+help', 'v3.1.0', `${client.users.cache.size} users`, `${client.guilds.cache.size} servers`];
		const rstatus = Math.floor(Math.random() * status.length);

		// client.user.setActivity(status[rstatus], {type: "WATCHING"});
		// You can change the "WATCHING" into STREAMING, LISTENING, and PLAYING.
		// Example: streaming

		client.user.setActivity(status[rstatus], { type: 'LISTENING' });
	} setInterval(randomStatus, 20000);

	// Send Online in channel

	const embed12 = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Bot is online :)');

	console.log('Online!');
	client.channels.cache.get('743595649508835335').send(embed12);

	Premium.sync();
});

client.once('guildCreate', guild => {
	console.log('Joined a new guild: ' + guild.name);
	// Your other stuff like adding to guildArray

	// Send Added in channel

	const embed12 = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('**Someone added the bot :)**')
		.setDescription(`**Guild Name:** ${guild.name}`);

	client.channels.cache.get('743595649508835335').send(embed12);
});

client.once('guildDelete', guild => {
	console.log('Removed from a guild: ' + guild.name);
	// Your other stuff like adding to guildArray

	// Send Removed in channel

	const embed12 = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('**Someone removed the bot :(**')
		.setDescription(`**Guild Name:** ${guild.name}`);

	client.channels.cache.get('743595649508835335').send(embed12);
});

// Listen to messages

client.on('message', message => {

	// Ignore bots

	if (message.author.bot) return;

	// Log DMs

	if(message.channel.type === 'dm') {
		const embed11 = new Discord.MessageEmbed()
			.setColor('#fa4454')
			.setTitle('**New DM!**')
			.setDescription(`**Message Author:** ${message.author.tag}\n**Message Content:** ${message.content}`);
		client.channels.cache.get('743595649508835335').send(embed11);
	}

	// Ignore non-prefix

	if (message.content.indexOf(process.env.PREFIX) !== 0) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// If guild only, react with clown 🤡

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.react('🤡');
	}

	// Cooldowns

	if(message.author.id != '510427790340915222') {

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Please wait ${timeLeft.toFixed(1)}s before reusing \`${command.name}\` `) .then(m => m.delete({ timeout: 3900 }))
					.catch(err => {
						console.log(err);
					});
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	}
	try {
		command.execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		const errormessage1 = new Discord.MessageEmbed()
			.setColor('#ffff00')
			.setTitle('⚠️ **Uh Oh! That was unexpected!**')
			.setDescription(`There seems to be an error and we're working on a fix! You can [Join our Support Server](${invite}) and report it there.`)
			.addField('Error Message: ', `\`\`\`js\n${error}\`\`\``);
		return message.channel.send(errormessage1);
	}

});

client.login(process.env.DISCORD_TOKEN);

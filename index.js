require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const invite = ('https://discord.gg/CsHFZxh');

const client = new Discord.Client({ partials: ['MESSAGE', 'USER', 'REACTION'] });
client.commands = new Discord.Collection();
client.sessions = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Your Bot in now on!');
	client.user.setPresence({ activity: { name: '+help', type: 'LISTENING' }, status: 'online' })
		.then(console.log)
		.catch(console.error);

});

client.on('message', message => {
	if (message.author.bot) return;
	if (message.content.indexOf(process.env.PREFIX) !== 0) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.react('🤡');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

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
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing \`${command.name}\` `);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client);
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
});

client.login;
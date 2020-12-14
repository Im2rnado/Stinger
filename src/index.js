require("dotenv").config();
const Discord = require("discord.js"),
	fs = require("fs"),
	mongoose = require("mongoose");

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER", "REACTION"] });

/**
	 * - Declares commands, sessions, version and owner
	 */
client.commands = new Discord.Collection();
client.sessions = new Discord.Collection();
client.owner = "510427790340915222";
client.logs = "787995461926518784";
client.invite = "https://discord.gg/5pKvUpA";
client.loading = "<a:cbFlip:785431396515708959>";

/**
 * - Reads Commands
 */
fs.readdirSync(`${__dirname}/commands/`).forEach(dir => {
	const commands = fs.readdirSync(`${__dirname}/commands/${dir}/`).filter(file => file.endsWith(".js"));

	for (const file of commands) {
		const command = require(`${__dirname}/commands/${dir}/${file}`);

		if (command.name) {
			client.commands.set(command.name, command);
		}
		else {
			continue;
		}
		client.commands.set(command.name, command);
	}
});

/**
 * - Mongoose Database Options
 */
const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
};

/**
 * - Client on start
 */
client.once("ready", async () => {
	/**
	 * - Send Online Message
	 */
	const OnlineEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle("Bot is online!")
		.setDescription(`Loaded ${client.commands.size} Commands`);
	console.log("Online!");
	client.channels.cache.get(client.logs).send(OnlineEmbed);

	/**
	 * - Connect to Database
	 */
	await mongoose.connect(process.env.MONGO, dbOptions)
		.then(console.log("Connected to Database"));
});

/**
 * - Client on Message
 */
client.on("message", async message => {

	// Ignore bots
	if (message.author.bot || message.content.indexOf(process.env.PREFIX) !== 0) return;

	// Declare args
	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// If Not Command
	if (!command) return;
	try {
		command.execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		const errormessage1 = new Discord.MessageEmbed()
			.setColor("#ffff00")
			.setTitle("⚠️ **Uh Oh! That was unexpected!**")
			.setDescription(`It seems like you encountered an error! [Join our Support Server](${client.invite}) and report it there.`)
			.addField("Error Message: ", `\`\`\`js\n${error}\`\`\``);

		message.channel.send(errormessage1);

		const errormessage2 = new Discord.MessageEmbed()
			.setColor("#ffff00")
			.setTitle(`**${message.author.tag}** \`(${message.author.id})\` encountered an error!`)
			.setDescription(`Command Used: **${message.content}**`)
			.addField("Error Message: ", `\`\`\`js\n${error}\`\`\``);

		client.channels.cache.get(client.logs).send(errormessage2);
	}
});

client.login(process.env.DISCORD_TOKEN);
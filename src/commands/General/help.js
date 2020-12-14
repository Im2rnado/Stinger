const Discord = require("discord.js");

module.exports = {
	name: "help",
	description: "Useful links",
	category: "General",
	execute(message, args, client) {
		const { commands } = client;

		if (!args.length) {
			const yourEmbed = new Discord.MessageEmbed()
				.setColor("#FA4454")
				.setTitle(":mailbox_with_mail: Hey! Want some help?")
				.addField("Categories", "`General` - `Valorant`")
				.setDescription("**[Our Website](https://carbide.cf)\n[Commands List](https://github.com/Im2rnado/Carbide-Help)\n[Support Server](https://discord.gg/5pKvUpA)\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=739966588844769361&permissions=8&scope=bot)**")
				.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
			return message.channel.send(yourEmbed);
		}

		const name = args.join(" ").toLowerCase();
		let command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			const exiss = commands.find(c => c.category && c.category.toLowerCase().includes(name));
			if (exiss) {
				command = commands.filter(c => c.category === exiss.category);
				const embed1 = new Discord.MessageEmbed()
					.setTitle(":mailbox_with_mail: " + args.join(" "))
					.setColor("RANDOM")
					.setFooter("Coded with ❤ by im2rnado");

				command.forEach((el) => {
					embed1.addField(el.name, el.description, true);
				});

				return message.channel.send(embed1);
			}
			else {
				const embed1010 = new Discord.MessageEmbed()
					.setColor("RANDOM")
					.setTitle(`The command **${args.join(" ")}** doesn't exist!`)
					.setFooter("Need Help? Use .help");
				return message.channel.send(embed1010);
			}
		}

		const embed1 = new Discord.MessageEmbed()
			.setTitle(`:mailbox_with_mail: ${command.name} | Command Help`)
			.setColor("RANDOM")
			.setFooter("Need help? Use .help");

		if (command.aliases) embed1.addField("**Aliases**:", `${command.aliases.join(" - ")}`, true);
		if (command.description) embed1.addField("**Description**:", `${command.description}`);
		if (command.category) embed1.addField("**Category**:", `${command.category}`);
		embed1.addField("**Usage**:", "[Press Me](https://github.com/Im2rnado/Stinger-Help)");

		message.channel.send(embed1);
	},
};
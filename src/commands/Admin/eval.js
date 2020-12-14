const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
	name: "eval",
	description: "Evalutes Code",
	category: "Admin",
	async execute(message, args, client) {
		if (!(message.author.id == client.owner)) return;

		if (!args[0]) {
			return message.channel.send("Evaluate __**SOMETHING**__ please!");
		}
		try {

			const toeval = args.join(" ");
			const evaluated = eval(toeval);

			message.channel.send(`\`\`\`${evaluated}\`\`\``);
		}
		catch (e) {
			const embed = new Discord.MessageEmbed()
				.setColor("FF0000")
				.setTimestamp()
				.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
				.setTitle("<:redTick:782363324469215234> Error!")
				.setDescription(e);

			message.channel.send(embed);
		}
	},
};
const Discord = require("discord.js");
const premUsers = require("../../models/premium.js");

module.exports = {
	name: "logout",
	aliases: ["signout", "o"],
	description: "Logs out of your Fortnite Account",
	category: "Valorant",
	async execute(message, args, client) {
		const tagName = message.author.id;

		const tag = await premUsers.findOne({
			ID: tagName,
		});
		if (tag) {
			// DMs only
			if (message.guild) {
				const nopremembed = new Discord.MessageEmbed()
					.setColor("#FF0000")
					.setTitle("<:redTick:782363324469215234> This command only works in DMs");
				return message.channel.send(nopremembed).then(m => m.delete({ timeout: 3900 }))
					.catch(err => {
						console.log(err);
					});
			}
			const h = await message.channel.send(`Logging out of Riot Services ${client.loading}`);

			try {
				const exist = client.sessions.get(tagName);

				if (exist) {
					client.sessions.delete(tagName);

					const embed = new Discord.MessageEmbed();
					embed.setColor("FA4454");
					embed.setTitle("Successfully logged out!");

					return h.edit("", { embed: embed });
				}
				else {
					const nopremembed = new Discord.MessageEmbed()
						.setColor("#FF0000")
						.setDescription("<:redTick:782363324469215234> You are not logged in.");
					return h.edit("", nopremembed);
				}
			}
			catch(err) {
				console.error(err);
				const nopremembed = new Discord.MessageEmbed()
					.setColor("#FF0000")
					.setDescription("<:redTick:782363324469215234> You are not logged in.");
				return h.edit(nopremembed);
			}
		}
		else {
			const nopremembed = new Discord.MessageEmbed()
				.setColor("#FF0000")
				.setTitle("<:redTick:782363324469215234> You do not have access to this command")
				.setDescription("You can join our [server](https://discord.gg/5pKvUpA) to purchase access.");
			return message.channel.send(nopremembed);
		}
	},
};
const Discord = require("discord.js");
const premUsers = require("../../models/premium.js");

module.exports = {
	name: "shop",
	description: "Returns your Valorant shop (Premium Only)",
	aliases: ["store", "st"],
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

			const h = await message.channel.send(`Getting Balance ${client.loading}`);

			const valorant = client.sessions.get(tagName);

			if (!valorant) {
				const nopremembed = new Discord.MessageEmbed()
					.setColor("#FF0000")
					.setDescription("<:redTick:782363324469215234> You are not logged in.");
				return h.edit("", nopremembed);
			}
			try {
				const store1 = await valorant.getStorefront();
				const shop = store1.Featured;

				const NewMessage = new Discord.MessageEmbed()
					.setTitle("**Today's Shop**")
					.setColor("#FA4454")
					.setThumbnail("https://www.m5.academy/img/valorant_logo.png")
					.setFooter("Wrong info? Make sure to choose the correct region at login.");
				shop.forEach(item => {
					NewMessage.addField(item.name, `<:valorantp:745722786957492376> ${item.cost}`, true);
				});
				return h.edit("", NewMessage);

			}
			catch(err) {
				console.error(err);
				const errormessage1 = new Discord.MessageEmbed()
					.setColor("#ffff00")
					.setTitle("⚠️ **Uh Oh! That was unexpected!**")
					.setDescription(`It seems like you encountered an error! [Join our Support Server](${client.invite}) and report it there.`)
					.addField("Error Message: ", `\`\`\`js\n${err}\`\`\``);

				h.edit("", errormessage1);
				const errormessage2 = new Discord.MessageEmbed()
					.setColor("#ffff00")
					.setTitle(`**${message.author.tag}** \`(${message.author.id})\` encountered an error!`)
					.setDescription(`Command Used: **${message.content}**`)
					.addField("Error Message: ", `\`\`\`js\n${err}\`\`\``);

				client.channels.cache.get(client.logs).send(errormessage2);
			}
		}
		else {
			const nopremembed = new Discord.MessageEmbed()
				.setColor("#FF0000")
				.setTitle("<:redTick:782363324469215234> You do not have access to this command")
				.setDescription("You can join our [server](https://discord.gg/5pKvUpA) to buy access.");
			return message.channel.send(nopremembed);
		}
	},
};

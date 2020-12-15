const Valorant = require("valorant.js");
const Discord = require("discord.js");
const premUsers = require("../../models/premium.js");

module.exports = {
	name: "login",
	description: "Logs in to your Valorant account (Premium Only)",
	aliases: ["i", "signin"],
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

			if (!args[1]) {
				const yourEmbed = new Discord.MessageEmbed()
					.setColor("#FF0000")
					.setTitle("**Please provide your username and password to login!**")
					.setDescription("**Example**: +login username password");
				return message.channel.send(yourEmbed);
			}

			const regionEmbed = new Discord.MessageEmbed()
				.setColor("#FA4454")
				.setTitle("**Please react with your region number.**")
				.setDescription("<:eu:762949162194829313> Europe\n<:na:762949184839745557> North America\n<:global:762949197833044020> Others");

			const h = await message.channel.send(regionEmbed);
			h.react("762949162194829313").then(() => h.react("762949184839745557")).then(() => h.react("762949197833044020"));

			const filter = (reaction, user) => {
				return ["762949162194829313", "762949184839745557", "762949197833044020"].includes(reaction.emoji.id) && user.id === message.author.id;
			};

			h.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
				.then(async collected => {
					const reaction = collected.first();

					if (reaction.emoji.id === "762949162194829313") {
						await h.delete();
						const y = await message.channel.send(`Signing in to Riot Services ${client.loading}`);
						try {
							const Username = args[0];
							const Password = args[1];

							const valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.eu,
								debug: true,
							});

							client.sessions.set(tagName, valorant);

							const data = await valorant.login();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`👋 Welcome, **${data.displayName}#${data.tagLine}**!`)
								.setColor("#FA4454")
								.setThumbnail("https://www.m5.academy/img/valorant_logo.png")
								.setFooter("Wrong info? Make sure to choose the correct region.")
								.addFields(
									{ name: "**Account ID**", value: `||${data.id}||` });

							return y.edit("", { embed: NewMessage });

						}
						catch (error) {
							const yourEmbed = new Discord.MessageEmbed()
								.setColor("#FF0000")
								.setTitle("**Invalid Username or Password!**")
								.setDescription("**Example**: +login username password");
							return y.edit("", yourEmbed);
						}
					}
					if (reaction.emoji.id === "762949184839745557") {
						await h.delete();
						const y = await message.channel.send("<a:loading:749963556316905494>  Signing in to Riot Services...");
						try {

							const Username = args[0];
							const Password = args[1];

							const valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.na,
								debug: true,
							});

							client.sessions.set(tagName, valorant);


							const data = await valorant.login();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`**👋 Welcome, ${data.displayName}#${data.tagLine}!**`)
								.setColor("#FA4454")
								.setThumbnail("https://www.m5.academy/img/valorant_logo.png")
								.setFooter("Wrong info? Make sure to choose the correct region.")
								.addFields(
									{ name: "**Account ID**", value: `||${data.id}||` });

							return y.edit("", { embed: NewMessage });

						}
						catch (error) {
							console.error(error.stack);
							const yourEmbed = new Discord.MessageEmbed()
								.setColor("#FF0000")
								.setTitle("**Invalid Username or Password!**")
								.setDescription("**Example**: +login username password");
							return y.edit("", yourEmbed);
						}
					}
					if (reaction.emoji.id === "762949197833044020") {
						await h.delete();
						const y = await message.channel.send("<a:loading:749963556316905494>  Signing in to Riot Services...");
						try {

							const Username = args[0];
							const Password = args[1];

							const valorant = new Valorant.Client({
								username: `${Username}`,
								password: `${Password}`,
								region: Valorant.region.ap,
								debug: true,
							});

							client.sessions.set(tagName, valorant);


							const data = await valorant.login();

							const NewMessage = new Discord.MessageEmbed()
								.setTitle(`**👋 Welcome, ${data.displayName}#${data.tagLine}!**`)
								.setColor("#FA4454")
								.setThumbnail("https://www.m5.academy/img/valorant_logo.png")
								.setFooter("Wrong info? Make sure to choose the correct region.")
								.addFields(
									{ name: "**Account ID**", value: `||${data.id}||` });

							return y.edit("", { embed: NewMessage });

						}
						catch (error) {
							console.error(error.stack);
							const yourEmbed = new Discord.MessageEmbed()
								.setColor("#FF0000")
								.setTitle("**Invalid Username or Password!**")
								.setDescription("**Example**: +login username password");
							return y.edit("", yourEmbed);
						}
					}
				})
				.catch(collected => {
					console.log(`${collected.size}`);
				});
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
const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
	name: "version",
	description: "Tell you the bot's version",
	aliases: ["ver"],
	category: "General",
	execute(message, args, client) {

		let totalSeconds = (client.uptime / 1000);
		totalSeconds %= 86400;
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);
		const uptime = `${hours} hours ${minutes} mins ${seconds} seconds`;

		const yourEmbed = new Discord.MessageEmbed()
			.setColor("FA4454")
			.setTitle("**Carbide Discord Bot**")
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter("Coded with ❤ by im2rnado")
			.addFields(
				{ name: "👾 Current Bot Version", value: client.version },
				{ name: "✨ Command Prefix", value: process.env.PREFIX },
				{ name: "📫 Invite Me", value: "[Press Me](https://discord.com/api/oauth2/authorize?client_id=739966588844769361&permissions=8&scope=bot)" },
				{ name: "🏘️ Total Guilds", value: client.guilds.cache.size },
				{ name: "👨‍💻 Owner/Developer", value: "[Tornado](https://twitter.com/im2rnadoo)" },
				{ name: "⏳ Uptime", value: uptime },
				{ name: "💁‍♂️ Support Server", value: `[${client.invite}](${client.invite})` })
			.setTimestamp();

		return message.channel.send(yourEmbed);
	},
};
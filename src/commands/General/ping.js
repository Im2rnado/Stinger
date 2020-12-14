const Discord = require("discord.js");

module.exports = {
	name: "ping",
	description: "Bot and API Latency!",
	category: "General",
	async execute(message, args, client) {
		const embed = new Discord.MessageEmbed();
		embed.setColor("#FF0000");
		embed.setTitle("🏓 Pong!");
		embed.setDescription(`**Latency**: \`${Date.now() - message.createdTimestamp}ms\`\n**API Latency**: \`${Math.round(client.ws.ping)}ms\``);
		return message.channel.send(embed);
	},
};
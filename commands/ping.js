module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message, args, client) {
		// It sends the user "Pinging"
		message.channel.send('<a:loading:749963556316905494> Pinging...').then(m =>{
			m.edit(`**🏓 Pong!**\nLatency is \`${m.createdTimestamp - message.createdTimestamp}ms\`\nAPI Latency is \`${Math.round(client.ws.ping)}ms\``);
		});
	},
};2;
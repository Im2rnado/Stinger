module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message) {
		// It sends the user "Pinging"
		message.channel.send('Pinging...').then(m =>{
m.edit(`**🏓 Pong!**\n**Latency is** ${m.createdTimestamp - message.createdTimestamp}ms.\n**API Latency is** ${Math.round(client.ws.ping)}ms`);
})
	},
};2;

module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message) {
		// It sends the user "Pinging"
		message.channel.send('Pinging...').then(m =>{
m.edit(`Pong!\n**Latency:** ${m.createdTimestamp - message.createdTimestamp}ms.\!**API Latency:** ${Math.round(client.ws.ping)}ms`);
})
	},
};2;

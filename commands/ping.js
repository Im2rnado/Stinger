module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message) {
		// It sends the user "Pinging"
		message.channel.send('Pinging...').then(m =>{
m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
})
	},
};2;

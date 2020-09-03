module.exports = {
	name: 'say',
	description: 'Says anything you want!',
	guildOnly: true,
	execute(message, args) {
		const sayMessage = args.join (' ');
		message.delete().catch(err => console.log(err));
		message.channel.send(sayMessage);

	},
};
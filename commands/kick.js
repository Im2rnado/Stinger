module.exports = {
	name: 'kick',
	description: 'Kicks a user from a server',
	guildOnly: true,
	cooldown: 3,
	execute(message) {

		const {
			member,
		} = message;


		console.log('kick.js is working properly ');

		if(
			member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
		) {
			const target = message.mentions.users.first();
			if(target) {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.kick();
				message.channel.send(`${target} was kicked from the server!`);
			}
			else {
				message.channel.send('Please specify who you want to kick.');
			}
		}
		else {
			message.react('🤡');
		}
	},
};
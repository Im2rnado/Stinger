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
				message.channel.send(`**${target}, get kicked bish!**\nhttps://giphy.com/gifs/qiiimDJtLj4XK`);
			}
			else {
				message.channel.send('And who should i kick?');
			}
		}
		else {
			message.react('🤡');
		}
	},
};

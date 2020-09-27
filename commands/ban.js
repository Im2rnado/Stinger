module.exports = {
	name: 'ban',
	description: 'Bans a user from a server',
	guildOnly: true,
	execute(message) {

		const {
			member,
		} = message;


		console.log('ban.js is working properly ');

		const target = message.mentions.users.first();

		if(
			member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
		) {
			if(target) {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.ban();
				message.channel.send(`**${target} was banned!**\nhttps://i.imgur.com/r42VJvZ.gif`);
			}
			else {
				message.channel.send('**And who do you want me to ban?**\nhttps://i.imgur.com/RkIfjMP.gif');
			}
		}
		else {
			message.react('🤡');
		}
	},
};

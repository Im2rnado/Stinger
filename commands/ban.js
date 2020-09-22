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
				message.channel.send(`**${target} was banned!**\nhttps://media1.giphy.com/media/H99r2HtnYs492/giphy.gif?cid=82a1493b44eliong6o0piwxrr7yojf600rjdv5xlso41su7n&rid=giphy.gif`);
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

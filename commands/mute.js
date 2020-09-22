module.exports = {
	name: 'mute',
	description: 'Mutes a user',
	guildOnly: true,
	cooldown: 3,
	execute(message) {

		const {
			member,
		} = message;

		if(
			member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('MANAGE_ROLES')
		) {
			const target = message.mentions.members.first();
			if(target) {
				// eslint-disable-next-line no-shadow
				const role = message.guild.roles.cache.find(role => role.name === 'Muted');
				// eslint-disable-next-line no-shadow
				const rolemember = message.guild.roles.cache.find(role => role.name === 'Premium');
				if(role) {
					target.roles.add(role);
					target.roles.remove(rolemember);
					message.channel.send(`${target} was Muted!\nhttp://gph.is/2908kxV`);
				}
				else{
					message.channel.send('How can i mute someone with a role called \'Muted\' in this server?.');
				}
			}
			else {
				message.channel.send('And who do you want me to ~~kill~~ shush?');
			}
		}
		else {
			message.react('🤡');
		}
	},
};

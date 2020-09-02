module.exports = {
	name: 'mute',
	description: 'Mutes a user',
	guildOnly: true,
	cooldown: 3,
	execute(message) {

		const {
			member,
		} = message;


		console.log('mute.js is working properly ');

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
					message.channel.send(`${target} was Muted!`);
				}
				else{
					message.channel.send('Please add a role named \'Muted\'.');
				}
			}
			else {
				message.channel.send('Please specify who you want to mute.');
			}
		}
		else {
			message.react('🤡');
		}
	},
};
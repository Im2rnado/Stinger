/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
module.exports = {
	name: 'unmute',
	description: 'Unmutes a user',
	cooldown: 3,
	guildOnly: true,
	execute(message, args) {

		const {
			member,
			mentions,
		} = message;

		const tag = `<@${member.id}>`;

		if(
			member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('MANAGE_ROLES')
		) {
			const target = message.mentions.members.first();
			if(target) {
				const role = message.guild.roles.cache.find(role => role.name === 'Muted');
				if(role) {
					target.roles.remove(role);
					message.channel.send(`**Speak! ${target}**`);
				}
				else{
					message.channel.send(`**${target} isn't muted tho...**`);
				}
			}
			else {
				message.channel.send('**And whom do i unmute?**');
			}
		}
		else {
			message.react('🤡');
		}
	},
};

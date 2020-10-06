const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'Says anything you want in an embed!',
	guildOnly: true,
	execute(message, args) {

		const {
			member,
		} = message;

		if(member.hasPermission('MANAGE_MESSAGES')) {
			const embedContent = args.join (' ');
			message.delete().catch(err => console.log(err));

			const yourEmbed = new Discord.MessageEmbed()
				.setColor('#FA4454')
				.setDescription(`${embedContent}`);

			return message.channel.send(yourEmbed);
		}
		else {
			message.react('🤡');
		}
	},
};

const Discord = require('discord.js');

module.exports = {
	name: 'rules',
	description: 'Says the servers rules!',
	guildOnly: true,
	execute(message) {
      
                if(member.hasPermission('ADMINISTRATOR')) {

		message.delete().catch(err => console.log(err));

		const yourEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`**${message.guild.name}'s Rules:**`)
			.setThumbnail('https://i.imgur.com/XG7Gv7d.png')
			.setDescription('Listed below is the rules of the server:')
			.addFields(
				{ name: '1) Be Mature and Respectful.', value: 'Nobody deserves to be treated poorly.' },
				{ name: '2) No NSFW Content.', value: 'This includes gore, porn and hentai.' },
				{ name: '3) No self-promoting.', value: 'Do not advertise social media platforms.' },
				{ name: '4) No "want to buy" or "want to sell".', value: 'This is NOT a Marketplace Community!' },
				{ name: '5) Never ping Staff or any other role unnecessarily.', value: 'Type in the chat and they are aware of it.' },
				{ name: '6) Members trying to bypass rule number (3) and (4) by privately messaging server users to buy their services will be banned.', value: 'You can report people offering you services to me or the staff.' },
				{ name: '7) No spamming', value: 'This includes text channels, voice channels and direct messages. Just don\'t spam.' },
				{ name: '8) Refrain from discussing illegal stuff.', value: 'Such as, but not limited to, account cracking, checkers, modded accounts, or cheating software!' },
				{ name: '9) Follow Discords ToS and Guidelines:', value: 'Guidelines: https://discordapp.com/guidelines\nTerms of Service: https://discordapp.com/tos' },
				{ name: '10) "I did not know" does not exist!', value: 'By joining this server, you automatically agree to the rules.' })
			.setFooter('Rules are subject to change at any time.', 'https://i.imgur.com/8rTKU7l.png');

		return message.channel.send(yourEmbed);
            }
	},
};

const Discord = require('discord.js');
const Valorant = require('./login.js');
const invite = ('https://discord.gg/CsHFZxh');

module.exports = {
	name: 'locker',
	description: 'Returns your inventory',
	async execute(message) {

		if (message.channel.type != 'dm') {
			return message.channel.send('This command only works in DMs.');
		}

		const y = await message.channel.send('<a:loading:749963556316905494>  Getting your inventory...'); (async () => {
			try {
				const store = await valorant.getStoryContract();

				return y.edit(`${store}`);

			}
			catch (error) {
				console.error(error.stack);
				const errormessage1 = new Discord.MessageEmbed()
					.setColor('#ffff00')
					.setTitle('⚠️ **Uh  Oh! That was unexpected!**')
					.setDescription(`An error has occurred and we're working on a fix ASAP!\nYou can [Join our Support Server](${invite}) and report it there.`)
					.addField('Error Message: ', `\`\`\`js\n${error}\`\`\``);
				return message.channel.send(errormessage1);
			}
		})();

	},
};

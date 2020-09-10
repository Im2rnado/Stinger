/* eslint-disable no-unused-vars */
 const Discord = require('discord.js');
 const ms = require('ms');

 module.exports = {
 	name: 'purge',
 	description: 'Deletes Messages',
 	guildOnly: true,
 	aliases: ['delete', 'clear'],
 	async execute(message, args) {
 		if (message.member.hasPermission('MANAGE_MESSAGES')) {
 			const deleteCount = parseInt(args[0], 10);
 			const deleteMessage = `Deleted \`${deleteCount}\` messages!`;

 			if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
 				return message.reply('Please provide a number between 2 and 100 to delete.') .then(m => m.delete({ timeout: 3900 }))
 					.catch(err => {
 						console.log(err);
 					});
 			}

 			const fetched = await message.channel.messages.fetch({
 				limit: deleteCount,
 			});

 			if (message.channel.bulkDelete(fetched)) {
                                message.delete().catch(err => console.log(err));
 				return message.channel.send(deleteMessage).then(m => m.delete({ timeout: 3900 }))
 					.catch(err => {
 						console.log(err);
 					});
 			}
 		}
 		else {
 			message.react('🤡');
 		}
 	},

 }; 

module.exports = {
	name: "reload",
	description: "MOD ONLY!",
	args: true,
	execute(message, args, client) {
		if (!(message.author.id == "510427790340915222")) {
			message.react("🤡");
		}
		else {
			const commandName = args[0].toLowerCase();
			const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) {
				return message.channel.send(`There is no command with name or alias \`${commandName}\`!`);
			}

			delete require.cache[require.resolve(`./${command.name}.js`)];

			try {
				const newCommand = require(`./${command.name}.js`);
				client.commands.set(newCommand.name, newCommand);
				message.channel.send(`Command \`${command.name}\` was reloaded!`);
			}
			catch (error) {
				console.log(error);
				message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
			}
		}
	},
};
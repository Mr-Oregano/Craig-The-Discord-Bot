
// Dependencies
const Discord = require('discord.js');
const FileSystem = require('fs');

module.exports = {

	modules: new Discord.Collection(),

	GetCommandModule(name) 
	{
		const command_modules = module.exports.modules;
		return command_modules.get(name) || command_modules.find(cmd => cmd.aliases && cmd.aliases.includes(name));
	}	
}

const command_modules = module.exports.modules;

for (const module of FileSystem.readdirSync('./commands').filter(file => file.endsWith('.js'))) 
{
	const command = require(`./commands/${module}`);
	command_modules.set(command.name, command);
}

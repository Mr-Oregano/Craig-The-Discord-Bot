
// Dependencies
const Discord = require('discord.js');
const FileSystem = require('fs');
const Path = require("path")

const modules = new Discord.Collection();

function GetCommandModule(name) 
{
	return modules.get(name) || modules.find(module => module.aliases && module.aliases.includes(name));
}	

function GetAllModules(dir, result) 
{
	let files = FileSystem.readdirSync(dir);
	result = result || [];

	files.forEach(file => 
	{
		if (FileSystem.statSync(dir + "/" + file).isDirectory())
			result = GetAllModules(dir + "/" + file, result);

		else if (file.endsWith('.js'))
			result.push(Path.join(__dirname, dir, "/", file));
	});

	return result;
}

const paths = GetAllModules('./commands');

for (const path of paths) 
{
	const command = require(path);
	modules.set(command.name, command);
}

module.exports.GetCommandModule = GetCommandModule;
module.exports.modules = modules;
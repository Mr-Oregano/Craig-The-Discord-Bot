
// Dependencies
const Discord = require('discord.js');
const FileSystem = require('fs');
const Path = require("path")

module.exports = {

	modules: new Discord.Collection(),

	GetCommandModule(name) 
	{
		const command_modules = module.exports.modules;
		return command_modules.get(name) || command_modules.find(cmd => cmd.aliases && cmd.aliases.includes(name));
	}	
}

const command_modules = module.exports.modules;

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

let modules = GetAllModules('./commands');

for (const module of modules) 
{
	const command = require(module);
	command_modules.set(command.name, command);
}

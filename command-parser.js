
// Dependencies
const CommandModules = require('./command-modules.js');

const { parse } = require("discord-command-parser");
const { parser } = require('args-command-parser');

module.exports = {

	Parse(msg, prefix)
	{
		const tokens = parse(msg, prefix);
		if (!tokens.success)
		{
			console.error("Failed to parse command!");
			return;
		}

		const args = parser(tokens.arguments).data;
		const command_module = CommandModules.GetCommandModule(tokens.command);

		if (!command_module)
		{
			msg.reply("Command not found!");
			return;
		}

		if (command_module.admin && !msg.member.permissions.has('ADMINISTRATOR'))
		{
			msg.reply("This command can only be used by an admin you silly dick!");
			return;
		}

		if (command_module.guild && msg.channel.type !== 'text')
		{
			msg.reply("This is a guild command can only be used in 'text' channel!");
			return;
		}
			
		if (command_module.args && args.commands.length < 1)
		{
			msg.reply("This command requires arguments!");
			return;
		}

		let formattedArgs = new Object();
		formattedArgs.args = args.commands;
		
		let switches = Object.assign(args.longSwitches, args.shortSwitches);
		
		if (!command_module.flags) 
		{
			if (Object.keys(switches).length > 0)
			{
				msg.reply('This command does not use flags');
				return;
			}

			return { execute: command_module.execute, body: formattedArgs };
		}

		formattedArgs.flags = new Object();

		for (const s in switches)
		{
			let key = command_module.flags.find(flag => flag.name === s || (flag.aliases && flag.aliases.includes(s)));

			if (!key)
			{
				msg.reply(`Unknown option '${s}'`);
		 		return;
			}

			if (key.args && key.args != switches[s].length)
			{
				msg.reply(`'${s}' requires ${key.args} argument(s)`);
				return;
			}

			formattedArgs.flags[key.name] = switches[s];
		}

		return { execute: command_module.execute, body: formattedArgs };
	}
}


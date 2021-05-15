
// Dependencies
const CommandModules = require('./command-modules.js');
const { parse } = require("discord-command-parser");
const { parser } = require('args-command-parser');

function Parse(msg, prefix)
{
	const tokens = parse(msg, prefix);
	
	if (!tokens.success)
	{
		console.error("Failed to parse command!");
		return;
	}

	const args = parser(tokens.arguments).data;
	const module = CommandModules.GetCommandModule(tokens.command);

	if (!module)
		// not an existing command
		return;

	if (module.admin && !msg.member.permissions.has('ADMINISTRATOR'))
	{
		msg.reply("This command can only be used by an admin you silly dick!");
		return;
	}

	if (module.guild && msg.channel.type !== 'text')
	{
		msg.reply("This is a server command!");
		return;
	}

	let cmd = { args: args.commands, flags: new Object() };
	
	let module_flags = module.flags || [];
	
	// merge long and short switches
	const switches = Object.assign(args.longSwitches, args.shortSwitches); 

	for (const s in switches)
	{
		let key = module_flags.find(flag => flag.name === s || (flag.aliases && flag.aliases.includes(s)));

		if (!key)
		{
			msg.reply(`Unknown option '${s}'`);
			return;
		}

		let argcount = key.args || 0;

		if (argcount != switches[s].length)
		{
			let excess_args = switches[s].length - argcount;

			if (excess_args > 0)
			{
				let lastIndex = switches[s].length - excess_args;
				cmd.args = cmd.args.concat(switches[s].slice(lastIndex));
				switches[s] = switches[s].slice(0, lastIndex);
			}
			else
			{
				msg.reply(`'${s}' requires ${argcount} argument(s)`);
				return;
			}
		}

		cmd.flags[key.name] = switches[s];
	}

	if (module.args && cmd.args.length < 1)
	{
		msg.reply("This command requires arguments!");
		return;
	}

	return { execute: module.execute, cmd: cmd };
}

module.exports = { Parse };


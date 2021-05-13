
// Dependencies
const CraigConfig = require('../config.json');
const CommandModules = require('../command-modules.js');
const { MessageEmbed } = require("discord.js");

module.exports = {

	name: 'help',
	description: 'Displays a list of all commands or detailed information for specified command',
	usage: '[COMMAND]',
	aliases: ['commands', 'cmds', 'h', 'hlp'],
	
	async execute(msg, body) 
	{
		const embed = new MessageEmbed();
		embed.setColor(Math.floor(Math.random() * 0xffffff));

		if (body.args.length > 0)
		{
			let module = CommandModules.modules.get(body.args[0]);

			if (!module || (module.admin && !msg.member.permissions.has('ADMINISTRATOR')))
			{
				msg.channel.send(`The command '${body.args[0]}' was not found!`);
				return;
			}

			embed.setTitle(module.name);
			embed.setDescription(module.description || 'No description provided.');

			let usage = `${CraigConfig.prefix}${module.name} ${module.usage || ''}`;
			embed.addField('Usage', `\`${usage.trim()}\``);

			if (module.aliases) 
				embed.addField('Aliases', AliasesToString(module.aliases));

			if (module.flags) 
				embed.addField('Flags', FlagsToString(module.flags));
			
			msg.channel.send(embed);
			return;
		}

		embed.setTitle('Commands');

		let commands = "";
		for (const [,module] of CommandModules.modules)
			if (!module.admin || (module.admin && msg.member.permissions.has('ADMINISTRATOR')))
				commands += ` - \`${module.name}\`\n`;

		embed.addField('Commands usable in this channel', commands);
		msg.channel.send(embed);
	   
	},
};

function AliasesToString(aliases)
{
	return aliases.join(', ');
}

function FlagsToString(flags)
{
	let str = "";

	for (const flag of flags) 
	{
		let names = [ flag.name ];

		if (flag.aliases)
			names = names.concat(flag.aliases);

		for (const name of names) 
		{
			str += name.length > 1 ? '--' : '-';
			str += `${name}, `;
		}

		str = str.slice(0, -2);
		str += `\n${flag.description}\n\n`
	}

	return str;
}
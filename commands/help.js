
// Dependencies
const CraigConfig = require('../config.json');
const CommandModules = require('../command-modules.js');

module.exports = {

	name: 'help',
    description: 'Displays a list of all commands or detailed information for specified command',
    usage: '[command_name]',
	aliases: ['commands', 'cmds', 'h', 'hlp'],
    
    async execute(msg, body) 
    {
        for (const module of CommandModules.modules)
        {
            console.log(module);
        }

        // const data = [];
        // const { commands } = msg.client;

        // if (!args.length)
        // {
        //     data.push('The following is a list of valid commands:\n');
        //     data.push(commands.map(command => command.name).join('\n'));
        //     data.push(`\nuse \`${prefix}help [command name]\` to get info on a specific command!`);

        //     return msg.channel.send(data, { split: true });
        // }

        // const name = args[0].toLowerCase();
        // const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        // if (!command) 
        //     return msg.reply('Invalid command!');

        // data.push(`**Name:** ${command.name}`);

        // if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        // if (command.description) data.push(`**Description:** ${command.description}`);
        
        // if (command.usage) 
        //     data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);
        // else
        //     data.push(`**Usage:** \`${prefix}${command.name}\``)

        // msg.channel.send(data, { split: true });
	},
};
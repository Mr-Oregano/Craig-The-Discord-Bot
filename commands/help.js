
const { prefix } = require('../config.json');

module.exports = {

	name: 'help',
    description: 'Displays a list of all commands',
    usage: '(command_name)',
	aliases: ['commands', 'cmds', 'h', 'hlp'],
    
    async execute(cxt, args) 
    {
        
        const data = [];
        const { commands } = cxt.client;

        if (!args.length) {
            
            data.push('The following is a list of valid commands:\n');
            data.push(commands.map(command => command.name).join('\n'));
            data.push(`\nuse \`${prefix}help [command name]\` to get info on a specific command!`);

            return cxt.channel.send(data, { split: true });

        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {

            return cxt.reply('Invalid command!');
        
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        
        if (command.usage) 
            data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);
        else
            data.push(`**Usage:** \`${prefix}${command.name}\``)

        cxt.channel.send(data, { split: true });

	},
};
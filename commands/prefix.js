
const CraigConfig = require('../data/config.json');

module.exports = {

	name: 'prefix',
	description: 'Display the current prefix configured for the bot, or set the prefix to the specified one.',
	usage: '[OPTIONS]',
	args: false,
	guild: false,
	admin: true,

	flags: [
		{
			name: 'set',
			aliases: ['s'],
			args: 1,
			description: 'Set Craig\'s prefix to the specified value'
		}
	],

	execute(msg, cmd) 
	{
		if (cmd.flags.set)
		{
			msg.channel.send(`The prefix has been set to \`${cmd.flags.set[0]}\``);
			return;
		}
		
		msg.channel.send(`The current prefix is \`${CraigConfig.prefix}\``);
	}
};
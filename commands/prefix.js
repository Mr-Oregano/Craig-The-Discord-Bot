
const CraigConfig = require('../config.json');

module.exports = {

	name: 'prefix',
	description: 'Display the current prefix configured for the bot, or set the prefix to the specified one.',
	usage: '[Options]',
	args: false,
	guild: false,

	flags: [
		{
			name: 'set',
			aliases: ['s'],
			args: 1,
			description: 'Set Craig\'s prefix to the specified value'
		}
	],

	async execute(msg, body) 
	{
		if (body.flags.set)
		{
			msg.channel.send(`The prefix has been set to \`${body.flags.set[0]}\``);
			return;
		}
		
		msg.channel.send(`The current prefix is \`${CraigConfig.prefix}\``);
	}
};
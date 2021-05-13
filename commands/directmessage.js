module.exports = {

	name: 'directmessage',
	aliases: ['dm'],
	description: 'Messages mentioned guild members with the specified message',
	usage: '<USER...> [OPTIONS] <MESSAGE>',
	guild: true,
	admin: true,

	flags: [
		{
			name: 'everyone',
			aliases: [ 'e' ],
			description: 'Sends the message to everyone in the server'
		},
		{
			name: 'message',
			aliases: [ 'm' ],
			description: 'Message to send to the specified members'
		},
	],

	execute(msg, cmd) 
	{
		let announcement = undefined;
		
		if (cmd.flags.message)
			announcement = cmd.flags.message[0];

		else if (cmd.args.length > 0)
			announcement = cmd.args[cmd.args.length - 1];

		if (!announcement)
		{
			msg.reply("You must specify the message as an argument or using the -m flag!");
			return;
		}

		if (msg.mentions.everyone || cmd.flags.everyone)
		{
			// everyone tag does not list all members
			Broadcast(msg.guild.members.cache, announcement);
			return;
		}

		Broadcast(msg.mentions.members, announcement);
		msg.react('👌');
	},
};

function Broadcast(members, announcement)
{
	for (const [, member ] of members)
	{
		if (member.user.bot)
			continue;
		
		member.createDM().then(channel => channel.send(announcement));
	}
}
module.exports = {

	name: 'directmessage',
	aliases: ['dm'],
	description: 'Messages mentioned guild members with the specified message',
	usage: '<USER...> <MESSAGE> [OPTIONS]',
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
		{
			name: 'count',
			aliases: [ 'c' ],
			description: 'How many times you would like to send the message to the users'
		}
	],

	execute(msg, cmd) 
	{
		let announcement = undefined;
		let count = cmd.flags.count || 1;
		
		if (cmd.flags.message)
			announcement = cmd.flags.message[0];

		else if (cmd.args.length > 0)
			announcement = cmd.args[cmd.args.length - 1];

		if (!announcement)
		{
			msg.reply("You must specify the message as an argument or using the -m flag!");
			return;
		}

		let selected_members = GetSelectedMembers(msg, msg.mentions.everyone || cmd.flags.everyone);

		if (selected_members.size == 0)
		{
			msg.reply("You must specify atleast one user!");
			return;
		}

		for (let i = 0; i < count; ++i)
			Broadcast(selected_members, announcement);

		msg.react('👌');
	},
};

function Broadcast(members, announcement)
{
	for (const member of members)
	{
		if (member.user.bot)
			continue;
		
		member.createDM().then(channel => channel.send(announcement));
	}
}

function GetSelectedMembers(msg, everyone)
{
	let result = new Set();

	if (everyone)
	{
		for (const [, member] of msg.guild.members.cache)
			result.add(member);

		return result;
	}

	for (const [, member] of msg.mentions.members)
		result.add(member);

	for (const [, role] of msg.mentions.roles)
	{
		for (const [, member] of role.members)
			result.add(member);
	}
		
	return result;
}
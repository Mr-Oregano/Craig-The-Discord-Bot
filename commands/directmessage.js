module.exports = {

	name: 'directmessage',
	aliases: ['dm'],
	description: 'Messages mentioned guild members with the specified message',
	usage: '<USER...> <MESSAGE>',
	args: true,
	guild: true,
	admin: true,

	async execute(msg, body) 
	{
		let announcement = body.args[body.args.length - 1];

		if (msg.mentions.everyone)
		{
			// everyone tag does not list all members
			Broadcast(msg.guild.members, announcement);
			return;
		}

		Broadcast(msg.mentions.members, announcement);
	},
};

async function Broadcast(members, announcement)
{
	for (const [, member ] of members)
	{
		if (member.user.bot)
			continue;
		
		// Must await to wait for channel handle
		let channel = await member.createDM();
		channel.send(announcement);
	}
}
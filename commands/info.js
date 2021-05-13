
module.exports = {

	name: 'info',
	aliases: ['guild', 'guild-info', 'server', 'server-info'],
	description: 'States all of the information relating to the current guild',
	args: false,
	guild: true,

	async execute(msg) 
	{
		msg.channel.send(
			`Server name: **${msg.guild.name}**\nCreated: ${msg.guild.createdAt}\nTotal members: ${msg.guild.memberCount}`
		);
	},
};

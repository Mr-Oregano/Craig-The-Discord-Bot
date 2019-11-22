
module.exports = {

	name: 'info',
    aliases: ['guild', 'guild-info', 'server', 'server-info'],
	description: 'States all of the information relating to the current guild',
    args: false,
    guild: true,

	async execute(cxt, args) {
		cxt.channel.send(

			`Server name: **${cxt.guild.name}**\nCreated: ${cxt.guild.createdAt}\nTotal members: ${cxt.guild.memberCount}`

		);
	},
};


module.exports = {

	name: 'info',
    aliases: ['guild', 'guild-info', 'server', 'server-info'],
	description: 'States all of the information relating to the current guild',
    args: false,
    guild: true,

	execute(message, args) {
		message.channel.send(

			`Server name: **${message.guild.name}**\nCreated: ${message.guild.createdAt}\nTotal members: ${message.guild.memberCount}`

		);
	},
};

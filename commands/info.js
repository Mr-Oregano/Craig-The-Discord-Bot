
const { MessageEmbed } = require('discord.js');

module.exports = {

	name: 'info',
	aliases: ['guild', 'guild-info', 'server', 'server-info'],
	description: 'States all of the information relating to the server',
	args: false,
	guild: true,

	async execute(msg) 
	{
		const guild = msg.guild;

		const embed = new MessageEmbed()
			.setColor(0x5cb3ff)
			.setTitle(guild.name)
			.setURL('https://discord.gg/pNrzXpS')
			.setDescription(guild.description || '')
			.setThumbnail(guild.iconURL())
			.addFields(
				{ name: 'Total Members', value: guild.memberCount },
				{ name: 'Created', value: guild.createdAt }
			);

		msg.channel.send(embed);
	},
};

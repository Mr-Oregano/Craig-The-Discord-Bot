
const { MessageEmbed } = require('discord.js');

module.exports = {

	name: 'user',
	aliases: ['member', 'profile'],
	description: 'Shows information about the specified user',
	usage: '<USER>',
	args: true,
	guild: true,

	async execute(msg)
	{
		let user = msg.mentions.members.first().user;
		const embed = new MessageEmbed()
			.setTitle(user.tag)
			.setColor(0x5cb3ff)
			.setURL(user.displayAvatarURL())
			.setDescription('This person is a fat dick')
			.setThumbnail(user.displayAvatarURL())
			.addFields(
				{ name: 'Gay frogs', value: user.deletable },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Joined discord', value: user.createdAt, inline: true },
				{ name: 'Gay fart', value: 'Big fat tiddy porn', inline: true },
			)
			.addField('Bot?', user.bot, true)
			.setImage(user.displayAvatarURL())
			.setTimestamp()
			.setFooter('This person is gay', user.displayAvatarURL());
	
		msg.channel.send(embed);
	}
}
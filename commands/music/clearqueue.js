
const { MessageEmbed } = require("discord.js");

module.exports = {

	name: 'clearqueue',
	aliases: ['cq'],
	description: 'Clear the current queue (must be in a voice channel to use).',
	args: false,
	guild: true,

	execute(msg, cmd, ctx) 
	{
		const vc = msg.member.voice.channel;

		if (!vc)
		{
			msg.reply("You need to be in a voice channel you dumb fuck.");
			return;
		}

		ctx.music.queue = [];
		const embed = new MessageEmbed();
		embed.setColor(Math.floor(Math.random() * 0x5cb3ff));
		embed.setTitle('Cleared the queue');
		msg.channel.send(embed);
	}
};
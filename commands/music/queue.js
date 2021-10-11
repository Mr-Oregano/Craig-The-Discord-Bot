
const { MessageEmbed } = require("discord.js");

module.exports = {

	name: 'queue',
	aliases: ['q', 'list'],
	description: 'Show the current queue of tracks (must be in a voice channel to use).',
	args: false,
	guild: true,

	execute(msg, cmd, ctx) 
	{
		const vc = msg.member.voice.channel;
		const queue = ctx.music.queue;

		if (!vc)
		{
			msg.reply("You need to be in a voice channel you dumb fuck.");
			return;
		}

		const embed = new MessageEmbed();
		embed.setColor(0x894fff);
		embed.setTitle("Queue");

		for (let i in queue)
		{
			let src = queue[i];
			let prefix = i == 0 ? "**\\>>>" : "⠀⠀-";
			let suffix = i == 0 ? "**" : "";
			embed.addField('\u200B', `${prefix} [${src.title}](${src.url}) ${suffix} : requested by [${src.author}]`);	
		}

		if (queue.length == 0)
			embed.setDescription("The queue is currently empty");

		msg.channel.send(embed);
	}
};
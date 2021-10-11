
module.exports = {

	name: 'skip',
	aliases: ['s', 'next'],
	description: 'Skips the currently playing track in the queue (must be in a voice channel to use).',
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

		let current = ctx.music.current;
		if (!current)
			return;

		current.end();
		msg.react('👌');
	}
};
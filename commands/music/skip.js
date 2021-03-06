
module.exports = {

	name: 'skip',
	aliases: ['sk', 'next'],
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

		let currentDispatcher = ctx.music.currentDispatcher;
		if (!currentDispatcher)
		{
			msg.reply("There is no track playing.");
			return;
		}

		currentDispatcher.end();
		msg.react('👌');
	}
};

module.exports = {

	name: 'stop',
	aliases: ['s', 'pause'],
	description: 'Pause the current playing track.',
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

		if (currentDispatcher.paused)
		{
			msg.reply("This track is already paused you willy.");
			return;
		}

		currentDispatcher.pause();
		msg.react('👌');
	}
};
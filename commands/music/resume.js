
module.exports = {

	name: 'resume',
	aliases: ['rs'],
	description: 'Resume the currently stopped track.',
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

		if (!currentDispatcher.paused)
		{
			msg.reply("The track isn't paused you silly goose.");
			return;
		}

		currentDispatcher.resume();
		msg.react('👌');
	}
};
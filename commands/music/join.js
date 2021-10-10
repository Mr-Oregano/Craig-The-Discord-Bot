
module.exports = {

	name: 'join',
	aliases: ['j', 'connect'],
	description: 'Join the vc (must be in a voice channel to use).',
	args: false,
	guild: true,

	execute(msg) 
	{
		const vc = msg.member.voice.channel;

		if (!vc)
		{
			msg.reply("You need to be in a voice channel you dumb fuck.");
			return;
		}

		vc.join();
	}
};
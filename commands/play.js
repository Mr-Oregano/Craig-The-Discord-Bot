
const ytdl = require('ytdl-core-discord');

module.exports = {

	name: 'play',
	aliases: ['p'],
	description: 'Plays the specified YouTube url',
	usage: "[FLAGS] <SOURCE>",
	args: true,
	guild: true,

	execute(msg, cmd) 
	{

		// TODO: Make command more stable by accepting different forms of input even if they
		//	     are not supported yet.
		//

		// TODO: Several cases for source type, figure out a way to filter/handle dynamically:
		//
		//		 has --file flag specified -> SRC_FILE
		//		 has YouTube URL form -> SRC_YOUTUBE
		//		 has Spotify URL form -> SRC_SPOTIFY
		//		 has SoundCloud URL form -> SRC_SOUNDCLOUD
		//		 else -> SRC_YT_SEARCH 

		// TODO: Verify input if necessary, though it could just be assumed a 'Search Query'
		//		 if none of the other tests pass.

		// TODO: Use the YouTube Data api to perform a search query to get the url
		//		 of a video to play 

		// TODO: Add support for SoundCloud, Spotify, etc. urls (sources other than YouTube)

		// TODO: Implement some queue system that can be used by all the voice commands 
		//

		const voiceChannel = msg.member.voice;
		
		if (!voiceChannel)
		{
			msg.reply("You need to be in a voice channel you dumb fuck");
			return;
		}
		
		play(msg.member.voice.channel, cmd.args[0]);
	}
};

async function play(voiceChannel, url) 
{
	const connection = await voiceChannel.join();
	connection.play(await ytdl(url), { type: 'opus' });
}
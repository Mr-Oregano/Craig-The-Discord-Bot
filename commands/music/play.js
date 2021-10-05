
const ytdl = require('ytdl-core-discord');

module.exports = {

	name: 'play',
	aliases: ['p'],
	description: 'Plays audio from the specified source (must be in a voice channel to use).',
	usage: "[FLAGS] <SOURCE...>",
	args: true,
	guild: true,

	flags: [
		{
			name: 'file',
			aliases: [ 'f' ],
			description: 'Specify an audio file to play. (WIP)'
		}
	],

	execute(msg, cmd) 
	{
		// TODO: Several cases for source type, figure out a way to filter/handle dynamically:
		//
		//		 has --file flag specified -> SRC_FILE
		//		 has YouTube URL form -> SRC_YOUTUBE
		//		 has Spotify URL form -> SRC_SPOTIFY
		//		 has SoundCloud URL form -> SRC_SOUNDCLOUD
		//		 else -> SRC_YT_SEARCH 

		// TODO: Use the YouTube Data api to perform a search query to get the url
		//		 of a video to play 

		// TODO: Add support for SoundCloud, Spotify, etc. urls (sources other than YouTube)

		// TODO: Implement some queue system that can be used by all the voice commands 
		//

		// NOTE: Currently just pulling the first argument in the list.
		//
		const src_type = DeduceSourceType(cmd.args[0]);
		const vc = msg.member.voice.channel;

		if (!vc)
		{
			msg.reply("You need to be in a voice channel you dumb fuck.");
			return;
		}

		switch (src_type)
		{
			case SourceType.URL_YOUTUBE: PlayYoutube(vc, cmd.args[0]); break;
			default: msg.reply("The provided source is unsupported currently.");
		}
	}
};

const SourceType = 
{
	FILE: "FILE",
	URL_YOUTUBE: "URL_YOUTUBE",
	URL_SPOTIFY: "URL_SPOTIFY",
	URL_SOUNDCLOUD: "URL_SOUNDCLOUD",
	QUERY_YOUTUBE: "QUERY_YOUTUBE",
	UNKNOWN: "UNKNOWN"
}

function DeduceSourceType(arg)
{
	// YouTube URL test.
	//
	if (arg.includes("www.youtube.com") || arg.includes("youtu.be"))
		return SourceType.URL_YOUTUBE;

	return SourceType.UNKNOWN;
}

async function PlayYoutube(vc, src) 
{
	const connection = await vc.join();
	connection.play(await ytdl(src), { type: 'opus' });
}
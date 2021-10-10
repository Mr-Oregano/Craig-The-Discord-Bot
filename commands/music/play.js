
const ytdl = require('ytdl-core-discord');
const { MessageEmbed } = require("discord.js");

const SourceType = 
{
	FILE: "FILE",
	URL_YOUTUBE: "URL_YOUTUBE",
	URL_SPOTIFY: "URL_SPOTIFY",
	URL_SOUNDCLOUD: "URL_SOUNDCLOUD",
	QUERY_YOUTUBE: "QUERY_YOUTUBE",
	UNKNOWN: "UNKNOWN"
}

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

	async execute(msg, cmd, ctx) 
	{
		const vc = msg.member.voice.channel;

		if (!vc)
		{
			msg.reply("You need to be in a voice channel you dumb fuck.");
			return;
		}

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
		//
		const url = cmd.args[0];
		const src_type = DeduceSourceType(url);

		if (src_type != SourceType.URL_YOUTUBE) 
		{
			const embed = new MessageEmbed();
			embed.setColor(0xff0000);
			embed.setDescription(`Unknown source type...`);
			msg.channel.send(embed);
			return;
		}

		let queue = ctx.music.queue;
		queue.push({ type: src_type, url: url });

		if (queue.length > 1)
		{
			let info = await ytdl.getInfo(url);

			const embed = new MessageEmbed();
			embed.setColor(0xf71d5e);
			embed.setDescription(`Queued [${info.videoDetails.title}](${url}) [${msg.member.user}]`);
			msg.channel.send(embed);
			return;
		}

		PlayQueue(msg, ctx);		
	}
};

function DeduceSourceType(arg)
{
	// YouTube URL test.
	//
	if (arg.includes("www.youtube.com") || arg.includes("youtu.be"))
		return SourceType.URL_YOUTUBE;

	return SourceType.UNKNOWN;
}

async function PlayQueue(msg, ctx)
{
	const vc = msg.member.voice.channel;
	const queue = ctx.music.queue;
	const connection = await vc.join();

	while (queue.length > 0)
	{
		let src = ctx.music.queue[0];

		// TODO: Currently assuming provided source is YouTube url.
		//
		let broadcast = await ytdl(src.url);
		let info = await ytdl.getInfo(src.url);

		const embed = new MessageEmbed();
		embed.setColor(0xfcfc05);
		embed.setTitle("Now playing");
		embed.setDescription(`[${info.videoDetails.title}](${src.url}) [${msg.member.user}]`);
		msg.channel.send(embed);

		let dispatcher = connection.play(broadcast, { type: 'opus' });
		await new Promise(fulfill => dispatcher.on('finish', fulfill));
		
		queue.shift();
	}
};
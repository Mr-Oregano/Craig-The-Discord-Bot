
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

		// TODO: Handle when the bot is disconnected from vc.
		//

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
		const src = await CreateSource(cmd.args[0], msg.member.user);

		if (!src) 
		{
			const embed = new MessageEmbed();
			embed.setColor(0xff0000);
			embed.setDescription(`Unknown source type...`);
			msg.channel.send(embed);
			return;
		}

		let queue = ctx.music.queue;
		queue.push(src);

		if (queue.length > 1)
		{
			const embed = new MessageEmbed();
			embed.setColor(0xf71d5e);
			embed.setDescription(`Queued [${src.title}](${src.url}) [${src.author}]`);
			msg.channel.send(embed);
			return;
		}

		PlayQueue(msg, ctx);		
	}
};

async function CreateSource(srcStr, author)
{
	let src = {};
	
	// YouTube URL test.
	//
	if (ytdl.validateURL(srcStr))
	{
		src.type = SourceType.URL_YOUTUBE;

		// Load video info
		const info = await ytdl.getInfo(srcStr);
		src.length = info.videoDetails.lengthSeconds;
		src.title = info.videoDetails.title;
		src.url = info.videoDetails.video_url;
		src.author = author;
		return src;
	}

	return;
}

async function LoadStream(src)
{
	switch (src.type)
	{
	case SourceType.URL_YOUTUBE: return await ytdl(src.url, { filter: 'audioonly', quality: 'highestaudio' });
	}
}

async function PlayQueue(msg, ctx)
{
	const vc = msg.member.voice.channel;
	const queue = ctx.music.queue;

	const connection = await vc.join();

	while (queue.length > 0)
	{
		let src = ctx.music.queue[0];
		
		const embed = new MessageEmbed();
		embed.setColor(0xfcfc05);
		embed.setTitle("Now playing");
		embed.setDescription(`[${src.title}](${src.url}) [${src.author}]`);
		msg.channel.send(embed);
		
		let dispatcher = connection.play(await LoadStream(src), { type: 'opus' });
		ctx.music.currentDispatcher = dispatcher; // Set the currently playing track.
		ctx.music.currentSrc = src;
		await new Promise(fulfill => dispatcher.on('finish', fulfill));

		// NOTE: No longer playing anything.
		ctx.music.currentDispatcher = undefined; 
		ctx.music.currentSrc = undefined;

		queue.shift();
	}
};
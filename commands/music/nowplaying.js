
const { MessageEmbed } = require("discord.js");

module.exports = {

	name: 'nowplaying',
	aliases: ['np'],
	description: 'Display currently playing track.',
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

		ctx.music.queue = [];
		const embed = new MessageEmbed();
		embed.setColor(Math.floor(Math.random() * 0x5cb3ff));

		let currentDispatcher = ctx.music.currentDispatcher;
		let src = ctx.music.currentSrc;
		if (!currentDispatcher)
		{
			msg.reply("There is no track playing.");
			return;
		}

		let currentSec = currentDispatcher.streamTime / 1000;
		let totalSec = src.length;

		let slider = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬'.split('');
		let index = Math.floor(slider.length * currentSec / totalSec);
		slider[index] = '🔵';

		let displayTime = `${slider.join('')} ${convertToReadableTime(currentSec)} / ${convertToReadableTime(totalSec)}`

		embed.setDescription(`[${src.title}](${src.url}) [${src.author}]\n\n${displayTime}`);
		embed.set
		
		msg.channel.send(embed);
	}
};

function convertToReadableTime(totalSec)
{
	totalSec = Math.floor(totalSec);
	let seconds = totalSec % 60;
	let minutes = Math.floor(totalSec / 60);

	if (minutes < 1)
		return `${seconds}s`

	return `${minutes}m ${seconds}s`
}
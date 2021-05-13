const { MessageEmbed } = require("discord.js");

const messages = [
	"big and chunky dick",
	"non-existant dick like Koi Carpe",
	"tiny dick",
	"uncircumcised penis",
	"some dick cheese",
	"an inny",
	"a chode",
	"erecile dysfunction (dead willie)",
	"a priapism",
	"beautiful penis",
	"sideways dong",
	"average dick",
	"millimeter peter",
	"1-inch finch",
	"decapitated ding-dong",
	"long dragon",
	"cock flock",
	"T H I C C dick",
	"dick magnifique",
	"high-IQ wiener",
	"neutered pecker",
	"abuser bruiser",
	"booster rooster",
	"strong schlong",
	"walking stocking"
];

module.exports = {

	name: 'dick',
	aliases: ['penis', 'cock', 'rooster'],
	description: 'Slimey and Gooey',
	usage: "[USER]",
	args: false,
	guild: true,

	async execute(msg) 
	{
		let user = msg.author;

		if (msg.mentions.members.first())
			user = msg.mentions.members.first().user;

		let embed = new MessageEmbed();
		let selection = Math.floor(Math.random() * messages.length);

		embed.setTitle(`${user.username} has ${messages[selection]}`)
		.setColor(0x5cb3ff)
		.setDescription("Weenus Peenus.com")
		.setThumbnail(user.displayAvatarURL());

		msg.channel.send(embed);
	}
};
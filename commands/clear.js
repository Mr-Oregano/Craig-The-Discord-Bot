module.exports = {

	name: 'clear',
	aliases: ['delete', 'erase', 'delete-messages', 'erase-messages', 'delete-msg', 'erase-msg'],
	description: 'Clears *n* messages in current channel stated by the *arg*',
	usage: "<AMOUNT>",
	args: true,
	guild: true,

	async execute(msg, body) 
	{
		let amount = parseInt(body.args[0]);

		if (isNaN(amount))
			return msg.channel.send("The specified argument is *not* a number");

		for (; amount > 0; amount -= 100)
			await msg.channel.bulkDelete(Math.min(amount, 100), true);

		msg.channel.send(`Deleted messages.`).then(msg => msg.delete({ timeout: 1000 }));
	}
};
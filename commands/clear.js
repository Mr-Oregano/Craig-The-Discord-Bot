
const cmd_usage = '[amount]{1 - 99}'

module.exports = {

	name: 'clear',
    aliases: ['delete', 'erase', 'delete-messages', 'erase-messages', 'delete-msg', 'erase-msg'],
	description: 'Clears *n* messages in current channel stated by the *arg*',
    usage: cmd_usage,
    args: true,
    guild: false,

	async execute(cxt, args) {

        let amount = parseInt(args[0]);

        if (isNaN(amount))
            return cxt.channel.send("The specified argument is *not* a number");

        if (amount < 1 || amount > 99)
            return cxt.channel.send(`Argument must be in the range of 1 - 99\nusage: ${cmd_usage}`);

        deleteMessages(cxt.channel, amount + 1);  

	},
};

async function deleteMessages(channel, amount)
{

    return channel.bulkDelete(amount, true);

}
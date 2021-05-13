
module.exports = {

	name: 'test',
	description: 'Test command that will be deleted soon',
	usage: 'test',
	args: true,

	flags: [
		{
			name: 'dick',
			aliases: ['d']
		},
		{
			name: 'fuck',
			aliases: ['f']
		},
		{
			name: 'shit',
			aliases: ['s'],
		}
	],

	async execute(msg, body)
	{
		if (body.flags.dick)
			msg.channel.send("Wow! You specified the 'dick' flag!");

		console.log(body);
	}
};
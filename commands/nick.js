module.exports = {

	name: 'nick',
    description: 'Nick is a gay butthole',
    args: false,
    guild: true,

    async execute(msg, args) 
    {
        msg.channel.send("Nick is a gay butthole");
	}
};
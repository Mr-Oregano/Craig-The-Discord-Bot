module.exports = {

	name: 'nick',
    description: 'Nick is a gay butthole',
    guild: true,
    args: false,
    
    // Options:
    // -n <name>
    //      Use a different name
    //
    // -a --ass
    //      Use "ass" instead of "butthole"
    //

    async execute(msg, args) 
    {
        let name = "Nick";

        if (args.shortSwitches.n && args.shortSwitches.n.length != 1)
        {
            msg.channel.send("option `-n` requires exactly 1 argument.");
            name = args.shortSwitches.n[0];
        }

        if (args.shortSwitches.a || args.longSwitches.ass)
        {
            msg.channel.send(name + " is a gay ass");
            return;
        }

        msg.channel.send(name + " is a gay butthole");
	}
};
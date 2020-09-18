module.exports = {

	name: 'directmessage',
    aliases: ['dm'],
    description: 'Messages mentioned guild members with the specified message',
    usage: '<User> ... <Announcement>',
    args: true,
    guild: true,

    async execute(msg, args) 
    {
        let announcement = args[args.length - 1];

        if (msg.mentions.everyone)
        {
            // everyone tag does not list all members
            Broadcast(msg.guild.members, announcement);
            return;
        }

        Broadcast(msg.mentions.members, announcement);
	},
};

async function Broadcast(members, announcement)
{
    let iterator = members.values();
    let member_itr = iterator.next();

    while (!member_itr.done)
    {
        let member = member_itr.value;
        if (member.user.bot)
        {
            member_itr = iterator.next();
            continue;
        }
        
        // Must await to wait for channel handle
        let channel = await member.createDM();
        //

        channel.send(announcement);
        member_itr = iterator.next();
    }
}
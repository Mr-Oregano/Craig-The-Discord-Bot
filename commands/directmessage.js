
module.exports = {

	name: 'directmessage',
    aliases: ['dm'],
    description: 'Messages all members of the guild with the saved message',
    usage: '[mention] ... [message]',
    args: true,
    guild: true,

	async execute(cxt, args) {

        if (!cxt.guild.available)
            return;

        let msg = args[args.length - 1];

        if (cxt.mentions.everyone)
        {

            BroadcastMessage(cxt.guild.members, msg);
            return;

        }

        BroadcastMessage(cxt.mentions.members, msg);

	},
};

function BroadcastMessage(members, message)
{

    console.log(`\nBroadcasting message: ${message}\n`);

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
        
        MessageMember(member, message);
        member_itr = iterator.next();

    }

}
async function MessageMember(member, message)
{ 

    console.log(`Sending direct message to: ${member.displayName}`);
    let dm = await member.createDM();
    return await dm.send(message);

}
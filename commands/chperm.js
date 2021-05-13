// TODO: fix bug, doesn't work for multiple channels or members

const { Permissions } = require('discord.js');

module.exports = {

	name: 'chperm',
    description: 'Sets the user(s) permissions for the current channel (or other channels specified by different options)',
    usage: '<User...> [Options ...]',
    args: true,
    guild: true,

    flags: [
        {
            name: 'all-except',
            description: 'Sets specified permissions for every channel except channel(s) in question.'
        },
        {
            name: 'echo',
            aliases: [ 'e' ],
            description: 'Returns <User> permisions in mentioned channels.'
        },
        {
            name: 'negate',
            aliases: [ 'n' ],
            description: 'disallow the specified permissions for the specified channel(s)'
        }
    ],

    async execute(msg, body) 
    {
        // const guild = msg.channel.guild;
        // const newperms_bitfield = parseInt(args.commands[0]);
        // const newperms = new Object();

        // for (const perm of new Permissions(newperms_bitfield).toArray())
        //     newperms[perm] = !(args.shortSwitches.n || args.shortSwitches.negate);

        // let channels = new Map(); channels.set(0, msg.channel);
        // let members = msg.mentions.members;

        // if (msg.mentions.members.length < 1)
        // {
        //     msg.channel.send("You must specify atleast 1 user.");
        //     return;
        // }

        // if (args.longSwitches['all-except'])
        //     channels = guild.channels.cache;

        // else if (msg.mentions.channels.size > 0)
        //     channels = msg.mentions.channels;

        // for (const [, member ] of members)
        // {
        //     for (const [ id, channel ] of channels)
        //     {
        //         if (channel.type === 'category' || channel.type === 'voice')
        //             continue;

        //         if (args.longSwitches['all-except'] && msg.mentions.channels.has(id))
        //             continue;

        //         if (args.shortSwitches.e || args.longSwitches.echo)
        //         {
        //             msg.channel.send(
        //                 `Permissions for ${member.user.username} in ${channel.name}:\n` + 
        //                 new Permissions(current_perms).serialize());

        //             continue;
        //         }

        //         channel.updateOverwrite(member.user, newperms);
        //     }
        // }

        // msg.react('👌');

                

    }
};
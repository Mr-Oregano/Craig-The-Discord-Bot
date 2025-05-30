// TODO: fix bug, doesn't work for multiple channels or members

const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {

	name: 'chperm',
	description: 'Sets the user(s) permissions for the current channel (or other channels specified by different options)',
	usage: '<PERMS> <USER...> [CHANNEL...] [OPTIONS ...]',
	args: true,
	guild: true,
	admin: true,

	flags: [
		{
			name: 'all-except',
			aliases: [ 'a' ],
			description: 'Sets specified permissions for every channel except channel(s) in question.'
		},
		{
			name: 'echo',
			aliases: [ 'e' ],
			description: 'Outputs <User>\'s *current* permisions in mentioned channels which are allowed *and* present in bitfield. (Has no effect on permissions).'
		},
		{
			name: 'negate',
			aliases: [ 'n' ],
			description: '*disallow* the specified permissions for the specified channel(s)'
		}
	],

	execute(msg, cmd) 
	{
		// find the first argument that isn't a mention
		const newperms_bitfield = parseInt(cmd.args.find(arg => !/<[@#]!?\d+>/g.test(arg)));

		if (isNaN(newperms_bitfield))
		{
			msg.reply('You must specify the permissions bitfield as an argument!');
			return;
		}

		const newperms = new Object();

		for (const perm of new Permissions(newperms_bitfield).toArray())
			newperms[perm] = !cmd.flags.negate;

		let members = GetSelectedMembers(msg);

		if (members.size < 1)
		{
			msg.reply("You must specify atleast one user.");
			return;
		}

		let channels = GetSelectedChannels(msg, cmd.flags['all-except']); 

		for (const member of members)
		{
			for (const channel of channels)
			{
				if (channel.type === 'category' || channel.type === 'voice')
					continue;

				if (cmd.flags.echo)
				{
					const embed = new MessageEmbed()
						.setColor(0x5cb3ff)
						.setTitle(`Allowed permissions for ${member.user.username}`)
						.setDescription(`in ${channel.name}`)
						.setThumbnail(member.user.avatarURL());

					let permissionStr = '';
					for (const [ key ] of Object.entries(member.permissions.serialize()))
						if (newperms[key])
							permissionStr += ` - ${key.toLowerCase()}\n`;

					embed.addField('Permissions', permissionStr);
					msg.channel.send(embed);
					continue;
				}

				channel.updateOverwrite(member.user, newperms);
			}
		}

		msg.react('👌');

	}
};

function GetSelectedMembers(msg)
{
	let result = new Set();

	for (const [, member] of msg.mentions.members)
		result.add(member);

	for (const [, role] of msg.mentions.roles)
	{
		for (const [, member] of role.members)
			result.add(member);
	}
		
	return result;
}

function GetSelectedChannels(msg, allexcept)
{
	let result = new Set(); 
	
	if (allexcept)
	{
		for (const [ id, channel ] of msg.guild.channels.cache)
			if (!msg.mentions.channels.has(id))
				result.add(channel);
	}
	
	else if (msg.mentions.channels.size)
		for (const [, channel] of msg.mentions.channels)
			result.add(channel);

	else
		result.add(msg.channel);

	return result;
}
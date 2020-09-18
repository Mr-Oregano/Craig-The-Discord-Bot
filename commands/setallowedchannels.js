
const { MessageEmbed } = require('discord.js');

module.exports = {

	name: 'setallowedchannels',
    aliases: ['sac'],
    description: 'Sets the channel(s) that the specified is allowed to access',
    usage: '<User> ... <Channel> ...',
    args: true,
    guild: true,

    async execute(msg, args) 
    {
        
	}
};

// member.permissionsIn(channel).bitfield.toString(2)
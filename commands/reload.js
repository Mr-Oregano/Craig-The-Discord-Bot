
// dependencies
const CommandModules = require('../command-modules.js');

module.exports = {

	name: 'reload',
	description: 'Reload commands',
    args: false,
    guild: true,

    async execute(msg, args) 
    {
        CommandModules.LoadCommandModules();
        msg.react('👌');
	},
};
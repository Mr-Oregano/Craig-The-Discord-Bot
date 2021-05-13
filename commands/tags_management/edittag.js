
const Database = require('../../data/database.js');

module.exports = {

	name: 'edittag',
	args: true,
	description: 'Updates the description for the specified tag.',
	usage: '<TAGNAME> <DESCRIPTION>',

	async execute(msg, cmd)
	{
		const tagName = cmd.args[0];
		const tagDescription = cmd.args[1];

		// equivalent to: UPDATE tags (description) values (?) WHERE name='?';
		const affectedRows = await Database.tags.update({ description: tagDescription }, { where: { name: tagName } });
		
		if (affectedRows > 0) 
			return msg.reply(`Tag ${tagName} was edited.`);

		return msg.reply(`Could not find a tag with name ${tagName}.`);
	}
}

const Database = require('../../data/database.js');

module.exports = {

	name: 'removetag',
	args: true,
	description: 'Deletes a specified tag from the database',
	usage: '<TAGNAME>',

	async execute(msg, cmd)
	{
		const tagName = cmd.args[0];
		// equivalent to: DELETE from tags WHERE name = ?;
		const rowCount = await Database.tags.destroy({ where: { name: tagName } });
		
		if (!rowCount) 
			return msg.reply('That tag did not exist.');

		return msg.reply('Tag deleted.');
	}
}
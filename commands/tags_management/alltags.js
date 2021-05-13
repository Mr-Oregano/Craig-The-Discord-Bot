
const Database = require('../../data/database.js');

module.exports = {

	name: 'alltags',
	description: 'Displays all of the current tags in the database',

	async execute(msg)
	{
		const tagList = await Database.tags.findAll({ attributes: ['name'] });
		const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
		return msg.channel.send(`List of tags: ${tagString}`);
	}
}
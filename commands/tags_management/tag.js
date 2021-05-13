
const Database = require('../../data/database.js');

module.exports = {

	name: 'tag',
	args: true,
	description: 'Displays the description for the specified tag',
	usage: '<TAGNAME>',

	async execute(msg, cmd)
	{
		const tagName = cmd.args[0];

		// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
		const tag = await Database.tags.findOne({ where: { name: tagName } });

		if (tag)
		{
			// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
			tag.increment('usage_count');
			return msg.channel.send(tag.get('description'));
		}

		return msg.reply(`Could not find tag: ${tagName}`);
	}
}

const Database = require('../../data/database.js');

module.exports = {

	name: 'taginfo',
	args: true,
	description: 'Displays information about the specified tag',
	usage: '<TAGNAME>',

	async execute(msg, cmd)
	{
		const tagName = cmd.args[0];

		// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
		const tag = await Database.tags.findOne({ where: { name: tagName } });

		if (tag)
			return msg.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);

		return msg.reply(`Could not find tag: ${tagName}`);
	}
}
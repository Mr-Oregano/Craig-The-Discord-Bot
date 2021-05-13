
const Database = require('../../data/database.js');

module.exports = {

	name: 'addtag',
	args: true,
	description: 'Creates a tag in a test data base or something idk',
	usage: '<TAGNAME> [DESCRIPTION]',

	async execute(msg, cmd)
	{
		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Database.tags.create({
				name: cmd.args[0],
				description: cmd.args[1],
				username: msg.author.username,
			});

			return msg.reply(`Tag ${tag.name} added.`);
		}
		catch (e) 
		{
			if (e.name === 'SequelizeUniqueConstraintError') 
			{
				return message.reply('That tag already exists.');
			}
			
			return msg.reply('Something went wrong with adding a tag.');
		}
	}
}
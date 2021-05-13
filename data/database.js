
const Sequelize = require('sequelize');

const database = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'data/database.sqlite',
});

module.exports = {

	tags: undefined,

	Initialize()
	{
		module.exports.tags = database.define('tags', {
			name: {
				type: Sequelize.STRING,
				unique: true,
			},
			description: Sequelize.TEXT,
			username: Sequelize.STRING,
			usage_count: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		});

		console.log("Syncing the database...");
		module.exports.tags.sync();
	}

}

// Dependencies
const discord = require('discord.js');

// Configuration files
const { prefix, token } = require('./config.json');

// FS
const fs = require('fs');

// Constants
const regex_split = /[^\s"']+|"([^"]*)"|'([^']*)'/g;

const client = new discord.Client();
client.commands = new discord.Collection();

const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commands) {

	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);

}

client.once('ready', () => {

	console.log('Craig has connected to the server!');

});

client.on('message', cxt => {
	if (!cxt.content.startsWith(prefix) || cxt.author.bot)
		return;

	const args = cxt.content.slice(prefix.length).match(regex_split);

	for (var i = 0; i < args.length; ++i)
		args[i] = args[i].replace(/^["']|["']$/g, '');

	const command_name = args.shift().toLowerCase();
	const command = client.commands.get(command_name) 
				 || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));

	if (!command)
		return cxt.channel.send('Invalid command, use \`$help\` for a list of valid commands');

	if (command.guild && cxt.channel.type !== 'text')
		return cxt.channel.send('This is a guild command!');

	if (command.args && !args.length) {

		let reply = 'This commmand requires arguments!';

		if (command.usage)
			reply += `\nUsage: \`${prefix}${command_name} ${command.usage}\``;

		return cxt.channel.send(reply);

	}

	try {

		command.execute(cxt, args);

	} catch (error) {

		cxt.channel.send('there was an error trying to execute that command!');
		console.log(`\nError: ${error}`);

	}
});

client.login(process.env.BOT_TOKEN);

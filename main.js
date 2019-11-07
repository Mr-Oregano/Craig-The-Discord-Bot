
// Dependencies
const discord = require('discord.js');

// Configuration files
const { prefix, token } = require('./config.json');

// FS
const fs = require('fs');

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

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command_name = args.shift().toLowerCase();

	const command = client.commands.get(command_name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));

	if (!command)
		return message.channel.send('Command not found!');

	if (command.guild && message.channel.type !== 'text')
		return message.channel.send('I can\'t execute that command inside DMs!');

	if (command.args && !args.length) {

		let reply = 'This commmand requires arguments!';

		if (command.usage)
			reply += `\nusage: *${command.usage}*`;

		return message.channel.send(reply);

	}

	try {

		command.execute(message, args);

	} catch (error) {

		message.channel.send('there was an error trying to execute that command!');
		console.log(`\nError: ${error}`);

	}
});

client.login(process.env.BOT_TOKEN);


const Discord = require('discord.js');
const { prefix } = require('./config.json');
const FileSystem = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commands = FileSystem.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commands) 
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', msg => 
{
	if (!msg.content.startsWith(prefix) || msg.author.bot)
		return;

	const args = msg.content.slice(prefix.length).match(/(?<=")[^"]+(?=")|[^\s"']+/g);

	const command_name = args.shift().toLowerCase();
	const command = client.commands.get(command_name) 
				 || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));

	if (!command)
		return msg.channel.send('Invalid command, use \`$help\` for a list of valid commands');

	if (command.guild && msg.channel.type !== 'text')
		return msg.channel.send('This is a guild command!');

	if (command.args && !args.length) 
	{
		let reply = 'This commmand requires arguments!';
		if (command.usage)
			reply += `\nUsage: \`${prefix}${command_name} ${command.usage}\``;

		return msg.channel.send(reply);
	}

	try 
	{
		command.execute(msg, args);
	} 
	catch (error) 
	{
		msg.channel.send('There was an error trying to execute that command!');
		console.log(`\nError: ${error}`);
	}
});

client.once('ready', () => 
{
	console.log('Craig has connected to the server!');
});

client.login(process.env.BOT_TOKEN);

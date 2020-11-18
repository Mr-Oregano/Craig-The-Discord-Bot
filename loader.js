
const Discord = require('discord.js');
const FileSystem = require('fs');
const CraigConfig = require('./config.json');

const { parse } = require("discord-command-parser");
const { parser } = require('args-command-parser');

const client = new Discord.Client();
const modules = new Discord.Collection();

for (const module of FileSystem.readdirSync('./commands').filter(file => file.endsWith('.js'))) 
{
	const command = require(`./commands/${module}`);
	modules.set(command.name, command);
}

function OnUpdate(msg)
{
	if (!msg.content.startsWith(CraigConfig.prefix) || msg.author.bot)
		return;

	const tokens = parse(msg, CraigConfig.prefix);
	if (!tokens.success)
		return; // TODO: Provide feedback to the user

	const args = parser(tokens.arguments).data;
	const module = modules.get(tokens.command) || modules.find(cmd => cmd.aliases && cmd.aliases.includes(tokens.command));

	if (!module)
		return msg.channel.send(`\`${tokens.command}\` is not a runnable command`);

	if (module.guild && msg.channel.type !== 'text')
		return msg.channel.send('This is a guild command!');

	console.log(args);
	if (module.args && args.commands.length < 1) 
	{
		let reply = 'This commmand requires arguments!';
		if (module.usage)
			reply += `\nUsage: \`${CraigConfig.prefix}${tokens.command} ${module.usage}\``;
		return msg.channel.send(reply);
	}

	module.execute(msg, args);
}

function OnStart()
{
	console.log('Craig has connected to the server!');
}

client.on('message', OnUpdate);
client.once('ready', OnStart);
client.login(process.env.BOT_TOKEN);

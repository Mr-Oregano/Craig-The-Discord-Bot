
// Dependencies
const Discord = require('discord.js');
const Context = {};

const CraigConfig = require('./data/config.json');
const Database = require('./data/database.js');
const CommandParser = require('./command-parser.js');

const client = new Discord.Client();

function OnMessage(msg)
{
	if (!msg.content.startsWith(CraigConfig.prefix) || msg.author.bot)
		return;

	let module = CommandParser.Parse(msg, CraigConfig.prefix);
	
	if (!module)
		return;

	module.execute(msg, module.cmd, Context);
}

function OnStart()
{
	Database.Initialize();

	// TODO: Implement generic module-based command system. Each module contains a suite of 
	//		 commands and, optionally, a context shared between those commands.
	//		
	Context.music = {};
	Context.music.queue = [];
	
	console.log('Craig has connected to the server!');
	client.user.setActivity('your mom naked 😏', { type: 'WATCHING' });
}

client.on('message', OnMessage);
client.once('ready', OnStart);
client.login(process.env.BOT_TOKEN);
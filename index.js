const Discord = require('discord.js');
const config = require('./settings.json');
const client = new Discord.Client();
const ddiff = require('return-deep-diff');

//Events
client.on('ready', () =>{
    console.log('This is Margarine speaking!');
    console.log('Online and awaiting orders!');
});

client.on('guildDelete', guild =>{
    console.log(`I have stopped providing for ${guild.name} at ${new Date()}`);
});

client.on('guildCreate', guild =>{
    console.log(`I have started working for ${guild.name} at ${new Date()}`);
    guild.defaultChannel.sendMessage('Hello! I am Margarine and I will be a bot on here!');
});

client.on('guildMemberAdd', (member) =>{
    console.log(`New User: ${member.user.username}`);
    let guild = member.guild;
    member.guild.defaultChannel.sendMessage(`${member.user.username} has joined for the first time!`);
});

client.on('guildMemberRemove', (member) => {
    console.log(`User left: ${member.user.username}`);
    let guild = member.guild;
    member.guild.defaultChannel.sendMessage(`${member.user.username} has left the server.`);
});

client.on('guildMemberUpdate', (oMember, nMember) => {
    console.log(ddiff(oMember, nMember));
});

client.on('guildBanAdd', (guild, user) => {
    guild.defaultChannel.sendMessage(`${user.username} was banned!`);
    guild.defaultChannel.sendMessage('Glory to the hammer!');
});

client.on('guildBanRemove', (guild, user) => {
    guild.defaultChannel.sendMessage(`${user.username} fought the ban hammer and won!`);
});

//Bot Failure Safety net
client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));

client.on('message', message => {
	let args = message.content.split(' ').slice(1);
  	var result = args.join(' ');

	if(!message.content.startsWith(config.prefix)) return;
	if (message.author.bot) return;
	
	if (message.content.startsWith(config.prefix + 'ping')) { 
		console.log('Ping command executed.');
        	message.channel.send('Pong');
	} else

	if (message.content.startsWith(config.prefix + 'welcome')){
		if(message.author.id !== config.ownerID) return;
		console.log('Welcome command executed.');
		message.channel.send('Hello! I am Margarine!');
		message.channel.send('I will be a bot user on here so feel free to use me when I am online!');
	}
	
	if (message.content.startsWith(config.prefix + 'send')){
		console.log('Trans-channel message sent!');
		client.channels.get('304129722999373825').send('Hello!');
	} else
		
	if (message.content.startsWith(config.prefix + 'version')){
		console.log('Version command executed.');
		message.channel.send(`Margarine is on version: ${config.version}`);
	} else
		
	if (message.content.startsWith(config.prefix + 'setgame')){
		if(message.author.id !== config.ownerID) return;
		if (!result) { 
			result = null; 
		}
		client.user.setGame(result);
	} else
	
	if (message.content.startsWith(config.prefix + 'setstatus')){
		if(message.author.id !== config.ownerID) return;
		if (!result) { 
			client.user.setStatus(online); 
		}
		client.user.setStatus(result);
	}
});

client.login(config.token); //See settings.json for edits.

const Discord = require('discord.js');
const config = require('./settings.json');
const client = new Discord.Client();
const ddiff = require('return-deep-diff');
const path = require('path');

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
    guild.defaultChannel.sendMessage('Please do m~help for more information!'); //Not a command yet. Final command before 0.2 release.
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
client.on('debug', (e) => console.debug(e));

client.on('message', message => {
	if(!message.content.startsWith(config.prefix)) return;
	let args = message.content.split(' ').slice(1);
	var argresult = args.join(' ');
	if (message.author.bot) return;
	
	if (message.content.startsWith(config.prefix + 'ping')) { //Possible to move command to different file and still work?
		console.log('Ping command executed.');
        	message.channel.send('Pong');
	} else
	
	if (message.content.startWith(config.prefix + 'send')){
		console.log('Trans-channel message sent!');
		client.channel.get('304129722999373825').sendMessage('Hello!');
	} else
		
	if (message.content.startsWith(config.prefix + 'version')){
		console.log('Version command executed.');
		message.channel.send(`Margarine is on version: ${package.version}`);
	} else
		
	if (message.content.startWith(config.prefix + 'setgame')){
		if(message.author !== config.OwnerID) return;
		if (!result) { result = null; }
		client.user.setGame(argresult);
	} else
	
	if (message.content.startWith(config.prefix + 'setStatus')){
		if(message.author !== config.OwnerID) return;
		if (!result) { result = null; }
		client.user.setStatus(argresult);
	}
});

client.login(config.token); //See settings.json for edits.

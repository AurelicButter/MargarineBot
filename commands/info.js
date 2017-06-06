exports.run = function(client, message, args){
    console.log('Information command executed.');
	message.channel.send(`Margarine's Commands. Please remember that I use "m~" for commands. \n
	Public Commands: avatar, ping, info, version \n
	Owner Commands: game[broken], status[broken], welcome`);
}

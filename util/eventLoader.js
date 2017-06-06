const reqEvent = (event) => require(`../events/${event}`)

module.exports = client => {
    client.on('ready', () => reqEvent('ready')(client));

    client.on('guildCreate', reqEvent('guildCreate'));
    client.on('guildDelete', reqEvent('guildDelete'));

    // Member Change Events
    client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
    client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
    client.on('guildBanAdd', reqEvent('guildBanAdd'));
    client.on('guildBanRemove', reqEvent('guildBanRemove'));

    client.on('message', reqEvent('message'));
};

const { DMChannel, GroupDMChannel, TextChannel, Message, GuildMember, Guild, User } = require("discord.js");

/* A List of Extendables that allows Komada to extend native Discord.js structures to be easier or more efficient when used in Komada */
class Extendables {
  /** TextBasedChannel Extendables - All of these apply to GroupDM, DM, and Guild Text Channels
    * <GroupDMChannel|DMChannel|TextChannel>.readable - Checks if a channel is readable by the client user -> returns {Boolean}
    * <GroupDMChannel|DMChannel|TextChannel>.embedable - Checks if a channel is embedable by the client user -> returns {Boolean}
    * <GroupDMChannel|DMChannel|TextChannel>.postable - Checks if a channel is postable (able to send messages) by the client user -> returns {Boolean}
    * <GroupDMChannel|DMChannel|TextChannel>.attachable - Checks if a channel is attachable (able to attach files) by the client user -> returns {Boolean}
    */
  get readable() {
    if (!this.guild) return true;
    return this.permissionsFor(this.guild.member(this.client.user)).hasPermission("READ_MESSAGES");
  }

  get embedable() {
    if (!this.guild) return true;
    return this.readable && this.postable && this.permissionsFor(this.guild.member(this.client.user)).hasPermission("EMBED_LINKS");
  }

  get postable() {
    if (!this.guild) return true;
    return this.readable && this.permissionsFor(this.guild.member(this.client.user)).hasPermission("SEND_MESSAGES");
  }

  get attachable() {
    if (!this.guild) return true;
    return this.readable && this.postable && this.permissionsFor(this.guild.member(this.client.user)).hasPermission("ATTACH_FILES");
  }

  /** Message Extendables - Apply to all messages
    * <Message>.reatable - Checks if a message is reactable by the client user -> returns a boolean.
    * <Message>.guildConf - Returns a guild configuration (or default if no guild) containing proper configuration settings. -> returns {Object}
    */
  get reactable() {
    if (!this.guild) return true;
    return this.readable && this.permissionsFor(this.guild.member(this.client.user)).hasPermission("ADD_REACTIONS");
  }

  get guildConf() {
    return this.client.configuration.get(this.guild);
  }

  /** Guild Extendable - Applies to all Guilds
    * <Guild>.conf - Same as guildConf for message, but a different way of getting it -> returns {Object}
    */
  get conf() {
    return this.client.configuration.get(this);
  }

  /** Special Extendable - Applies to both Author and Member objects
    * <GuildMember|User> - Gets the integer permission level for a user, either for DM, or Guild -> returns {Number}
    */
  get permLevel() {
    if (!this.guild) return this.client.funcs.permissionLevel(this.client, this, true);
    return this.client.funcs.permissionLevel(this.client, this, false);
  }
}

/** The backbone of this extendable file. Adds the properties in Arrays to their respected Structures */
const applyToClass = (structure, props) => {
  for (const prop of props) {
    Object.defineProperty(structure.prototype, prop, Object.getOwnPropertyDescriptor(Extendables.prototype, prop));
  }
};

applyToClass(GroupDMChannel, ["embedable", "postable", "attachable", "readable"]);
applyToClass(DMChannel, ["embedable", "postable", "attachable", "readable"]);
applyToClass(TextChannel, ["embedable", "postable", "attachable", "readable"]);
applyToClass(Message, ["guildConf", "reactable"]);
applyToClass(GuildMember, ["permLevel"]);
applyToClass(Guild, ["conf"]);
applyToClass(User, ["permLevel"]);

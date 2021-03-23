/**
 * Initializes all settings needed for the schemas.
 * @param { KlasaClient } client - The bot instance of the client.
 */
module.exports = function (client) {
	client.gateways.clientStorage.schema //Global Configurations
		.add("daily", "Integer", { default: 100, min: 1 })
		.add("awardChannel", "channel")
		.add("reportChannel", "channel")
		.add("awards", (folder) =>
				folder
					.add("suggest", "Integer", { default: 250, min: 10 }) //Suggestion Added
					.add("bug", "Integer", { default: 500, min: 25 }) //Bug fixed
					.add("minor", "Integer", { default: 600, min: 50 }) //Minor issue resolved
					.add("major", "Integer", { default: 2000, min: 100 }) //Major issue resolved
		);

	client.gateways.guilds.schema //Guild-specific Configurations
		.add("modRole", "role")
		.add("muteRole", "role")
		.add("defaultChannel", "channel")
		.add("modlog", "channel")
		.add("starboard", (folder) =>
			folder
				.add("channel", "TextChannel")
				.add("emote", "string", { default: "⭐" })
				.add("requiredAmount", "Integer", { default: 5, min: 1 })
				.add("msgCache", "string", { array: true, configurable: false }) //Linked with sbCache. Indexes are linked as a sudo-relation.
				.add("sbCache", "string", { array: true, configurable: false })
		)
		.add("roles", (folder) =>
			folder
				.add("name", "string", { array: true, configurable: false }) //Linked with id. Indexes are linked as a sudo-relation
				.add("id", "string", { array: true, configurable: false })
		)
		.add("poll", (folder) =>
			folder
				.add("info", "string", { configurable: false })
				.add("options", "string", { array: true, configurable: false })
				.add("votes", "string", { configurable: false })
				.add("userVotes", "string", {
					default: "{}",
					configurable: false
				})
		)
		.add("welcomeMsg", "string", { configurable: false })
		.add("leaveMsg", "string", { configurable: false });
};

const { Command } = require("discord.js-commando");

module.exports = class ServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: "server",
      aliases: ["serverinfo"],
      group: "utility",
      memberName: "server",
      description: "Get some server info",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    message.say(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  }
};
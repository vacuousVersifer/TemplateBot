const { Command } = require("discord.js-commando");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "beep",
      aliases: [],
      group: "fun",
      memberName: "beep",
      description: "Beep!",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    return message.say("Boop!!");
  }
};
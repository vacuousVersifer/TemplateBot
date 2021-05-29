const { Command } = require("discord.js-commando");

module.exports = class ReactCommand extends Command {
  constructor(client) {
    super(client, {
      name: "react",
      aliases: [],
      group: "fun",
      memberName: "react",
      description: "React to your message!",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "emoji",
          prompt: "What emoji would you like me to react with?",
          type: "default-emoji"
        }
      ]
    });
  }

  run(message, { emoji }) {
    message.react(emoji);
  }
};
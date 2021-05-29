const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      aliases: ["repeat"],
      group: "fun",
      memberName: "say",
      description: "Repeats whatever you say",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "text",
          prompt: "What would you like me to say?",
          type: "string"
        }
      ]
    });
  }

  run(message, { text }) {
    message.say(text);
  }
};
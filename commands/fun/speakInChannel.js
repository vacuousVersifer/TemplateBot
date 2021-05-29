const { Command } = require("discord.js-commando");

module.exports = class SpeakInChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: "speakinchannel",
      aliases: [],
      group: "fun",
      memberName: "speakinchannel",
      description: "Says something in the channel specified",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "text",
          prompt: "What would you like me to say?",
          type: "string"
        },
        {
          key: "channel",
          prompt: "What channel do you want me to send the message in?",
          type: "text-channel"
        }
      ]
    });
  }

  run(message, { text, channel }) {
    channel.send(text);
  }
};
const { Command } = require("discord.js-commando");
const biggifier = require("@vacuousversifer/discord-big-letterifier");

module.exports = class BiggifyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "biggify",
      aliases: ["bigletter"],
      group: "fun",
      memberName: "biggify",
      description: "Haha letter go brrrrr",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "text",
          prompt: "What do you want to biggify?",
          type: "string"
        }
      ]
    });
  }

  run(message, { text }) {
    message.channel.send(biggifier(text));
  }
};
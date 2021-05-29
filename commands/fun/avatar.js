const { Command } = require("discord.js-commando");

module.exports = class ReactCommand extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: [],
      group: "fun",
      memberName: "avatar",
      description: "Get an avatar",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "target",
          prompt: "Who's avatar do you want?",
          type: "user",
          default: ""
        }
      ]
    });
  }

  run(message, { target }) {
    if (!target) {
      return message.channel.send(`Your avatar: ${message.author.displayAvatarURL()}`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL()}`;
    });

    message.channel.send(avatarList);
  }
};
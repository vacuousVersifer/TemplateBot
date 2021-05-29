const { Command } = require("discord.js-commando");

module.exports = class UserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "user",
      aliases: ["userinfo"],
      group: "utility",
      memberName: "user",
      description: "Get some user info",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "target",
          prompt: "What user do you want to research?",
          type: "user",
          default: ""
        }
      ]
    });
  }

  run(message, { target }) {
    if(!target) {
      return message.say(
        `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
      );
    }
    
    return message.say(
      `Their username: ${target.username}\nTheir ID: ${target.id}`
    );
  }
};
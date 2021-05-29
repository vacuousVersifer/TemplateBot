const { Command } = require("discord.js-commando");

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: "prune",
      aliases: ["purge"],
      group: "utility",
      memberName: "prune",
      description: "Bulk delete message",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      throttling: { usages: 2, duration: 10 },
      args: [
        {
          key: "amount",
          prompt: "How many messages do you want to delete? 1-99",
          type: "integer"
        }
      ]
    });
  }

  run(message, { amount }) {
    if (amount <= 1 || amount > 100) {
      return message.reply("You need to input a number between 1 and 99.");
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send(
        "There was an error trying to prune messages in this channel!"
      );
    });
  }
};
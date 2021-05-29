const { Command } = require("discord.js-commando");

module.exports = class BalanceChannel extends Command {
  constructor(client) {
    super(client, {
      name: "balance",
      aliases: ["bal"],
      group: "economy",
      memberName: "balance",
      description: "Get your current balance",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    const target = message.mentions.users.first() || message.author;
    return message.channel.send(`${target.tag} has ${this.client.currency.getBalance(target.id)}💰`);
  }
};

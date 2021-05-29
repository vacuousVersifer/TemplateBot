const { Command } = require("discord.js-commando");

module.exports = class TransferCommand extends Command {
  constructor(client) {
    super(client, {
      name: "transfer",
      aliases: [],
      group: "economy",
      memberName: "transfer",
      description: "Give someone some bucks",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "transferAmount",
          prompt: "How much do you want to transfer?",
          type: "integer"
        },
        {
          key: "transferTarget",
          prompt: "Who do you want to give this money too?",
          type: "user"
        }
      ]
    });
  }

  run(message, { transferAmount, transferTarget }) {
    const currentAmount = this.client.currency.getBalance(message.author.id);

    if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
    if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
    if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

    this.client.currency.add(message.author.id, -transferAmount);
    this.client.currency.add(transferTarget.id, transferAmount);

    return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${this.client.currency.getBalance(message.author.id)}💰`);
  }
};

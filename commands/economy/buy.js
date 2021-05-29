const { Command } = require("discord.js-commando");
const { Op } = require("sequelize");

module.exports = class BuyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "buy",
      aliases: [],
      group: "economy",
      memberName: "buy",
      description: "Buy stuff",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "itemToBuy",
          prompt: "What item do you want to buy?",
          type: "string"
        }
      ]
    });
  }

  async run(message, { itemToBuy }) {
    const item = await this.client.CurrencyShop.findOne({ where: { name: { [Op.like]: itemToBuy } } });
    if (!item) return message.channel.send("That item doesn't exist.");
    if (item.cost > this.client.currency.getBalance(message.author.id)) {
      return message.channel.send(`You currently have ${this.client.currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
    }

    const user = await this.client.Users.findOne({ where: { user_id: message.author.id } });
    this.client.currency.add(message.author.id, -item.cost);
    await user.addItem(item);

    message.channel.send(`You've bought: ${item.name}.`);
  }
};

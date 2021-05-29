const { Command } = require("discord.js-commando");

module.exports = class ShopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "shop",
      aliases: [],
      group: "economy",
      memberName: "shop",
      description: "Shop stuff",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  async run(message) {
    const items = await this.client.CurrencyShop.findAll();
    return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join("\n"), { code: true });
  }
};

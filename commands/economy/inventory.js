const { Command } = require("discord.js-commando");

module.exports = class InventoryCommand extends Command {
  constructor(client) {
    super(client, {
      name: "inventory",
      aliases: [],
      group: "economy",
      memberName: "inventory",
      description: "Get your inventory",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  async run(message) {
    const target = message.mentions.users.first() || message.author;
    const user = await this.client.Users.findOne({ where: { user_id: target.id } });
    const items = await user.getItems();

    if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
    return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(", ")}`);
  }
};

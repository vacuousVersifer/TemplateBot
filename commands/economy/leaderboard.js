const { Command } = require("discord.js-commando");

module.exports = class LeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      aliases: [],
      group: "economy",
      memberName: "leaderboard",
      description: "Get the top ten fat cats",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    return message.channel.send(
      this.client.currency.sort((a, b) => b.balance - a.balance)
        .filter(user => this.client.users.cache.has(user.user_id))
        .first(10)
        .map((user, position) => `(${position + 1}) ${(this.client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
        .join("\n"),
      { code: true },
    );
  }
};

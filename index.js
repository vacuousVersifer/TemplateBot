// Requirements
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const Discord = require("discord.js");

// Constants
const dotenv = require("dotenv");
dotenv.config();

const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;

// Client
const owners = [ "802317699157196850"];
const link = "https://discord.gg/dFmgxrxU5A";
const client = new CommandoClient({ commandPrefix: PREFIX, owner: owners, invite: link });

// SQLite
const { Users, CurrencyShop } = require("./dbObjects");
client.Users = Users;
client.CurrencyShop = CurrencyShop;
client.currency = new Discord.Collection();

// Groups
const groups = [
  ["fun", "Fun"],
  ["economy", "Economy"],
  ["utility", "Useful"]
];

// Registry
client.registry
  .registerDefaultTypes()
  .registerGroups(groups)
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

// Events
client.once("ready", async () => {
  const storedBalances = await Users.findAll();
  storedBalances.forEach(b => client.currency.set(b.user_id, b));

  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`) ;
});

client.on("message", message => {
  if (!message.author.bot) {
    client.currency.add(message.author.id, 1);
  }
})

client.on("error", console.error);

// Login
client.login(TOKEN)

// Server
const app = require("express")();
app.get("/", (req, res) => res.send("Server is live"));
app.listen(3000, () => console.log("Listening on port 3000"));

// Helper DB functions
Reflect.defineProperty(client.currency, "add", {
  /* eslint-disable-next-line func-name-matching */
  value: async function add(id, amount) {
    const user = client.currency.get(id);
    if (user) {
      user.balance += Number(amount);
      return user.save();
    }
    const newUser = await Users.create({ user_id: id, balance: amount });
    client.currency.set(id, newUser);
    return newUser;
  },
});

Reflect.defineProperty(client.currency, "getBalance", {
  /* eslint-disable-next-line func-name-matching */
  value: function getBalance(id) {
    const user = client.currency.get(id);
    return user ? user.balance : 0;
  },
});

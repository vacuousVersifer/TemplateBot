const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "./.data/database.sqlite"
});

const CurrencyShop = require("./tables/CurrencyShop")(sequelize, Sequelize.DataTypes);
require("./tables/Users")(sequelize, Sequelize.DataTypes);
require("./tables/UserItems")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize.sync({ force }).then(async () => {
  const shop = [
    CurrencyShop.upsert({ name: "Tea", cost: 1 }),
    CurrencyShop.upsert({ name: "Coffee", cost: 2 }),
    CurrencyShop.upsert({ name: "Cake", cost: 5 }),
  ];
  await Promise.all(shop);
  console.log("Database synced");
  sequelize.close();
}).catch(console.error);

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "./.data/database.sqlite"
});

const Users = require("./tables/Users")(sequelize, Sequelize.DataTypes);
const CurrencyShop = require("./tables/CurrencyShop")(sequelize, Sequelize.DataTypes);
const UserItems = require("./tables/UserItems")(sequelize, Sequelize.DataTypes);

UserItems.belongsTo(CurrencyShop, { foreignKey: "item_id", as: "item" });

/* eslint-disable-next-line func-names */
Users.prototype.addItem = async function(item) {
  const userItem = await UserItems.findOne({
    where: { user_id: this.user_id, item_id: item.id },
  });

  if (userItem) {
    userItem.amount += 1;
    return userItem.save();
  }

  return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

/* eslint-disable-next-line func-names */
Users.prototype.getItems = function() {
  return UserItems.findAll({
    where: { user_id: this.user_id },
    include: ["item"],
  });
};

module.exports = { Users, CurrencyShop, UserItems };

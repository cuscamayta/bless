"use strict";

module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    numberid: { type: DataTypes.INTEGER(8), allowNull: false, unique: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Account.belongsTo(models.Group, { foreignKey: "idgroup", allowNull: false });
          Account.hasMany(models.Cashbox, { foreignKey: "idaccount", allowNull: false });
        }
      }
    }
  );
  return Account;
};
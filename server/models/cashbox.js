"use strict";

module.exports = function (sequelize, DataTypes) {
  var Cashbox = sequelize.define("Cashbox", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Cashbox.belongsTo(models.User, { foreignKey: "iduser", allowNull: false });
          Cashbox.belongsTo(models.Account, { foreignKey: "idaccount", allowNull: false });
          Cashbox.belongsTo(models.Costcenter, { foreignKey: "idcostcenter", allowNull: false });
          Cashbox.belongsTo(models.Office, { foreignKey: "idoffice", allowNull: false });
          Cashbox.hasMany(models.Cashtransaction, { foreignKey: "idcashbox", allowNull: false });
        }
      }
    }
  );
  return Cashbox;
};
"use strict";

module.exports = function (sequelize, DataTypes) {
  var Costcenter = sequelize.define("Costcenter", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true }
  },
    {
      classMethods: {
        associate: function (models) {
          Costcenter.hasMany(models.Cashbox, { foreignKey: "idcostcenter", allowNull: false });
          Costcenter.hasMany(models.Accountingdetail, { foreignKey: "idcostcenter", allowNull: false });
        }
      }
    }
  );
  return Costcenter;
};
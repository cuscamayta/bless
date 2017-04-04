"use strict";

module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define("Group", {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: { type: DataTypes.INTEGER(4), allowNull: false },
  }, {
      classMethods: {
        associate: function (models) {
          Group.hasMany(models.Account, { foreignKey: "idgroup", allowNull: false });
        }
      }
    });
  return Group;
};
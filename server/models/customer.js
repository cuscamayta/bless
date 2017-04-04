"use strict";

module.exports = function (sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    fullname: { type: DataTypes.STRING, allowNull: false },
    numberid: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true }
  });
  return customer;
}
"use strict";

module.exports = function (sequelize, DataTypes) {
    var Accountingdetail = sequelize.define("Accountingdetail", {
        debit: { type: DataTypes.DECIMAL(10, 4), allowNull: false },
        credit: { type: DataTypes.DECIMAL(10, 4), allowNull: false },
        detail: { type: DataTypes.STRING(100), allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    Accountingdetail.belongsTo(models.Account, { foreignKey: "idaccount", allowNull: false });
                    Accountingdetail.belongsTo(models.Accountingtransaction, { foreignKey: "idaccounting", allowNull: false });
                    Accountingdetail.belongsTo(models.Costcenter, { foreignKey: "idcostcenter", allowNull: true });
                }
            }
        }
    );
    return Accountingdetail;
};
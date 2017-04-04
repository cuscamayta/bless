"use strict";
var moment = require("moment");
var common = require('../routes/common');

module.exports = function (sequelize, DataTypes) {
    var Accountingtransaction = sequelize.define("Accountingtransaction", {
        dateregister: {
            type: DataTypes.DATE, allowNull: false,
            set: function (val) {
                this.setDataValue('dateregister', common.formatDate(val));
            },
            get: function (val) {
                var date = this.getDataValue('dateregister');
                return moment(date).format("DD/MM/YYYY");
            }
        },
        exchangerate: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        code: { type: DataTypes.STRING(20), allowNull: false },
        description: { type: DataTypes.STRING(200), allowNull: false },
        status: { type: DataTypes.INTEGER(4), allowNull: false },
        readonly: { type: DataTypes.INTEGER(4), allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    Accountingtransaction.belongsTo(models.User, { foreignKey: "iduser", allowNull: false });
                    Accountingtransaction.belongsTo(models.Office, { foreignKey: "idoffice", allowNull: false });
                    Accountingtransaction.hasMany(models.Accountingdetail, { foreignKey: "idaccounting", allowNull: false });
                }
            }
        }
    );
    return Accountingtransaction;
};
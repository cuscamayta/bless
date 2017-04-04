var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', common.isAuthenticate, function (request, response) {
    return models.sequelize.transaction(function (t) {
        return models.Accountingtransaction.create({
            dateregister: request.body.dateregister,
            exchangerate: request.body.exchangerate,
            code: request.body.code,
            description: request.body.description,
            status: 1,
            iduser: request.body.iduser,
            idoffice: request.body.idoffice,
            readonly: 0
        }, { transaction: t }).then(function (res) {
            for (var i = 0; i < request.body.details.length; i++) {
                return models.Accountingdetail.create({
                    debit: request.body.details[i].debit,
                    credit: request.body.details[i].credit,
                    detail: request.body.details[i].detail,
                    idaccount: request.body.details[i].idaccount,
                    idcostcenter: request.body.details[i].idcostcenter,
                    idaccounting: res.id
                }), { transaction: t };
            }
        });
    }).then(function (res) {
        response.send(common.response(null, "Se guardo correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.get('/', common.isAuthenticate, function (request, response) {
    models.Accountingtransaction.findAll({
        include: [{ model: models.Accountingdetail, include: [models.Account] }, { model: models.User }],
        where: { status: 1 }
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/forid', common.isAuthenticate, function (request, response) {
    models.Accountingtransaction.findOne({
        include: [{ model: models.Accountingdetail, include: [models.Account] }],
        where: { id: request.body.id, status: 1 }
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/destroy', common.isAuthenticate, function (request, response) {
    return models.sequelize.transaction(function (t) {
        return models.Accountingdetail.update(
            { status: 0 },
            { where: { idaccounting: request.body.id } }, { transaction: t }).then(function (res) {
                return models.Accountingtransaction.destroy({
                    where: { id: request.body.id }
                }), { transaction: t };
            });
    }).then(function (res) {
        response.send(common.response(null, "Se elimino correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

module.exports = router;
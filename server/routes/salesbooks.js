var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/forselect', common.isAuthenticate, function (request, response) {

    models.Sale.findAll({
        include: [{ attributes: ["id", "title"], model: models.Office, include: [{ model: models.Useroffice, where: { iduser: request.body.iduser } }] }],
        where: {
            dateregister: {
                $between: [common.formatDate(request.body.dateinit), common.formatDate(request.body.dateend)]
            },
            idoffice: { in: [1, 2, 3, 4] }
        }, order: 'idoffice, dateregister'
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

router.post('/voidedinvoice', common.isAuthenticate, function (request, response) {

    models.Salesbook.findAll({
        include: [{ attributes: ["id", "title"], model: models.Office, include: [{ model: models.Useroffice, where: { iduser: request.body.iduser } }] }],
        where: {
            dateregister: {
                $between: [common.formatDate(request.body.dateinit), common.formatDate(request.body.dateend)]
            },
            idoffice: { in: [1, 2, 3, 4] }, status: 0
        },
        order: 'numberinvoice ASC'
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.name, err.message, false));
    });
});

module.exports = router;
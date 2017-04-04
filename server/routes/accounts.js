var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');

router.post('/create', common.isAuthenticate, common.isAuthenticate, function (request, response) {
    models.Account.create({
        title: request.body.title,
        numberid: request.body.numberid,
        idgroup: request.body.idgroup
    }).then(function (res) {
        response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/update', common.isAuthenticate, common.isAuthenticate, function (request, response) {
    models.Account.update({
        title: request.body.title,
        numberid: request.body.numberid,
        idgroup: request.body.idgroup
    }, {
            where: { id: request.body.id }
        }).then(function (res) {
            response.send(common.response(res, "Se guardo correctamente"));
        }).catch(function (err) {
            response.send(common.response(err.code, err.message, false));
        });
});

router.get('/', common.isAuthenticate, common.isAuthenticate, function (request, response) {
    models.Account.findAll({
        include: [models.Group]
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/destroy', common.isAuthenticate, common.isAuthenticate, function (request, response) {
    models.Account.destroy({
        where: { id: request.body.id }
    }).then(function () {
        response.send(common.response("", "Se elimino correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

module.exports = router;
var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');
/* var jwt = require("jsonwebtoken"); */

router.post('/create', common.isAuthenticate, function (request, response) {
    models.customer.create({
        fullname: request.body.fullname,
        numberid: request.body.numberid,
        address: request.body.address,
        phone: request.body.phone,
        email: request.body.email

    }).then(function (res) {
        response.send(common.response(res, "Se guardo correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/update', common.isAuthenticate, function (request, response) {
    models.customer.update({
        fullname: request.body.fullname,
        numberid: request.body.numberid,
        address: request.body.address,
        phone: request.body.phone,
        email: request.body.email

    }, {
            where: { id: request.body.id }
        }).then(function (res) {
            response.send(common.response(res, "Se guardo correctamente"));
        }).catch(function (err) {
            response.send(common.response(err.code, err.message, false));
        });
});

router.get('/', common.isAuthenticate, function (request, response) {
    models.customer.findAll().then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/forid', common.isAuthenticate, function (request, response) {
    models.customer.findOne({
        where: { id: request.body.id }
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.get('/forselect', common.isAuthenticate, function (request, response) {
    models.customer.findAll({
        attributes: ["fullname", "numberid"]
    }).then(function (res) {
        response.send(common.response(res));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

router.post('/destroy', common.isAuthenticate, function (request, response) {
    models.customer.destroy({
        where: { id: request.body.id }
    }).then(function () {
        response.send(common.response("", "Se elimino correctamente"));
    }).catch(function (err) {
        response.send(common.response(err.code, err.message, false));
    });
});

module.exports = router;

/*	fullname	        STRING		not null
	numberid	        STRING		not null
	address		STRING		null
	phone		STRING		null
	email		STRING 		null
    */
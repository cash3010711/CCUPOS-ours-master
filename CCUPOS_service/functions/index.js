
'use strict';

const functions = require('firebase-functions');
const orderAddModule = require('./orderAdd');
const orderRemoveModule = require('./orderRemove');
const checkModule = require('./check');
const combineorderModule = require('./combineorder');
const pipelineAddModule = require('./pipelineAdd');
const pipelineRemoveModule = require('./pipelineRemove');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

//exports.pipelineRemove = functions.database.ref('/preorders/{userID}/{pushId}').onDelete(pipelineRemoveModule.handler);
//exports.pipelineAdd = functions.database.ref('/preorders/{userID}/{pushId}').onCreate(pipelineAddModule.handler);

exports.orderAdd = functions.https.onRequest((req, res) => {
    orderAddModule.handler(req, res);
});
exports.orderRemove = functions.https.onRequest((req, res) => {
    orderRemoveModule.handler(req, res);
});

exports.check = functions.https.onRequest((req, res) => {
    checkModule.handler(req, res);
});

exports.combineorder = functions.https.onRequest((req, res) => {s
    combineorderModule.handler(req, res);
});

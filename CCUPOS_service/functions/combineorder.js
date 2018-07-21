/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START functionsimport]
const functions = require('firebase-functions');
// [END functionsimport]
// [START additionalimports]
// Moments library to format dates.
const moment = require('moment');
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});
const randomstring = require("randomstring");
const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);
// [END additionalimports]

// [START all]
/**
 * Returns the server's date. You must provide a `format` URL query parameter or `format` vaue in
 * the request body with which we'll try to format the date.
 *
 * Format must follow the Node moment library. See: http://momentjs.com/
 *
 * Example format: "MMMM Do YYYY, h:mm:ss a".
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/date?format=MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' /
 *        -d '{"format": "MMMM Do YYYY, h:mm:ss a"}' /
 *        https://us-central1-<project-id>.cloudfunctions.net/date
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.handler = function(req, res){
// [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'POST') {
    cors(req,res,() =>{
    if(req.body!=null)
    console.log(req.body)
    else
    console.log("nodata")

    var combinenumber = randomstring.generate(4);
    var preorders = admin.database().ref(`/combines/${combinenumber}`)
    req.body.checked = false
    req.body.status = 'Queued'
    req.body.createdAt = admin.database.ServerValue.TIMESTAMP
    preorders.push(req.body)
    res.status(200).send({combinenumber});
    }
    )
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  else{
  cors(req, res, () => {
    // [START sendResponse]
    const formattedDate = new Date();
    console.log('Sending Formatted date:', formattedDate);
    res.status(200).send(formattedDate);
    // [END sendResponse]
  });
  }
}
// [END all]

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
const admin = require('firebase-admin');
const delay = require('delay');
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
    var semaphoreRef = admin.database().ref('/checksemaphore')

    var date=new Date()
    var flag= date.valueOf()
    semaphoreRef.once('value',(snapshot)=>{

      var semaphore = snapshot.val();
      //console.log(semaphore)
      if(semaphore!=0) {res.status(401).send({'error':'busy'}); process.exit(-1)}
      semaphoreRef.set(flag)

    }).then(delay(50)).then(()=>{
    //semaphoreRef.set(0)
    semaphoreRef.once('value',(snapshot)=>{
      //semaphoreRef.set(0)
      var semaphore = snapshot.val();
      //console.log(currentflag)
      if(semaphore!=flag) {res.status(401).send({'error':'busy'}); process.exit(-1)}

    })
    var order = admin.database().ref(`/preorders/${req.body.createdBy}/${req.body.orderId}`)
    var orderdata
    var updatedata = new Object()

    if(!order) {res.status(401).send({'error':'no_order'}); process.exit(-1)}
    order.once('value', (ordersnapshot) =>{
    orderdata=ordersnapshot.val()
    var pipeline = admin.database().ref("/pipeline")
    pipeline.once("value").then((snapshot)=> {
          var ss = snapshot.val();
          var coffeeref = pipeline.child('coffee');
          var foodref = pipeline.child('food');
          var coffeestate = { queuetime: ss.coffee.queuetime , machinecount : ss.coffee.machinecount };
          var foodstate = { queuetime: ss.food.queuetime , machinecount : ss.food.machinecount };
          //req.body.queuetime = foodtime == 0 ? ss.coffee.queuetime : coffeetime == 0 ? ss.food.queuetime : ss.coffee.queuetime > ss.food.queuetime ? ss.coffee.queuetime  : ss.food.queuetime  ;
          updatedata.queuetime = ss.coffee.queuetime > ss.food.queuetime ? ss.coffee.queuetime  : ss.food.queuetime  ;
          coffeestate["queuetime"]=coffeestate["queuetime"]+orderdata.coffeemaketime;
          foodstate["queuetime"]=foodstate["queuetime"]+orderdata.foodmaketime;
          coffeeref.set(coffeestate);
          foodref.set(foodstate);
      }).then(()=>{/*利用once的promise確保上面動作做完後再寫入其他資訊並傳送*/

        updatedata.checked = 'Payed'
        updatedata.createdAt = admin.database.ServerValue.TIMESTAMP
        order.update(updatedata)
        semaphoreRef.set(0)
        res.status(200).send({serial:req.body.serial});

      }).catch(function(error) {
      // Handle token error
        semaphoreRef.set(0)
        res.status(401).send({'error':'caculate_error'});

      })

    }).catch(function(error) {
    // Handle token error
      semaphoreRef.set(0)
      res.status(401).send({'error':'send_error'});

      })

    })
  })

  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  else{
  cors(req, res, () => {
    // [START sendResponse]
    res.status(401).send({'error':'send_error'});
    // [END sendResponse]
  });
  }
}
// [END all]

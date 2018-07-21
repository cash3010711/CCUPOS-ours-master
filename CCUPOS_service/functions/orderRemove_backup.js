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
      var semaphoreRef = admin.database().ref('/semaphore')
      var date=new Date()
      var flag= date.valueOf()

      semaphoreRef.once('value',(snapshot)=>{

        var semaphore = snapshot.val();
        //console.log(semaphore)
        if(semaphore!=0) {res.status(401).send({'error':'busy'}); process.exit(-1)}
        semaphoreRef.set(flag)
      }).then(delay(50)).then(()=>{
    semaphoreRef.once('value',(snapshot)=>{
          //semaphoreRef.set(0)
      var semaphore = snapshot.val();
          //console.log(currentflag)
      if(semaphore!=flag) {res.status(401).send({'error':'busy'}); process.exit(-1)}

    })

    var preordersRef = admin.database().ref(`/preorders`)
    var userRef = preordersRef.child(`${req.body.createdBy}`)
    var orderdatakey = null
    var result = false

    userRef.once('value', (usersnapshot) =>{
    var userorder=usersnapshot.val()
    Object.keys(userorder).map( key => {
      if(userorder[key].createdAt == req.body.createdAt)
        orderdatakey=key
    })

    //console.log(orderdatakey)
    }).then(()=>{

    if(req.body!=null && orderdatakey != null){
      var orderRef =userRef.child(`${orderdatakey}`)
      orderRef.once('value', (ordersnapshot) =>{
        var order=ordersnapshot.val()
        var pipelineRef = admin.database().ref("/pipeline");
        var menuRef = admin.database().ref(`/menu`)
        var coffeetime=0;
        var coffeeitem = ["Americano","Cappuccino","Herbal_tea","Latte_ice","Latte_large_hot","Latte_small_hot","Milktea","Redtea"];
        var foodtime=0;
        var fooditem = ["Chocolate_muffins","Chocolate_sundae","Deluxe_pizza","Honey_muffins","Original_muffins","Seafood_pizza","Smoked_chicken_pizza","Spaghetti_bolognese","Spaghettii_with_bacon_in_cream_sauce","Spaghettii_with_clam_in_green_sauce","Thick_toast_with_butter","Thick_toast_with_peanut","Vanilla_sundae"];
        if(order!=null&&order.checked==='Nonpay'&&order.status==='Queued'){
        menuRef.once('value', (menusnapshot) =>{
          var menu=menusnapshot.val()
          Object.keys(order.order_list).map( key => {
               if( (coffeeitem.indexOf(key) != -1 ))
              coffeetime+= order.order_list[key].count*menu[key].maketime;
            else if( (fooditem.indexOf(key) != -1 ))
              foodtime+= order.order_list[key].count*menu[key].maketime;
             })
        }).then(()=>{

        pipelineRef.once("value")
          .then((snapshot)=> {
              var ss = snapshot.val();
              var coffeeref = pipelineRef.child('coffee');
              var foodref = pipelineRef.child('food');
              var coffeestate = { queuetime: ss.coffee.queuetime , machinecount : ss.coffee.machinecount };
              var foodstate = { queuetime: ss.food.queuetime , machinecount : ss.food.machinecount };

              if(coffeestate["queuetime"]-coffeetime >= 0) coffeestate["queuetime"]=coffeestate["queuetime"]-coffeetime; else coffeestate["queuetime"] =0;
              if(foodstate["queuetime"]-foodtime >= 0) foodstate["queuetime"]=foodstate["queuetime"]-foodtime; else  foodstate["queuetime"] = 0;
              coffeeref.set(coffeestate);
              foodref.set(foodstate);
            }).then(()=>{
                /*changetoOn?*/
                preordersRef.once("value")
                  .then((snapshot)=> {
                      var preorders = snapshot.val();
                      var ordermap = (orders,uid) =>{
                      Object.keys(orders).map(key => {
                        if(orders[key].createdAt >= order.createdAt && orders[key].queuetime) {
                        var ref = preordersRef.child(uid).child(key);
                        var time = (orders[key].coffeemaketime == 0) ? orders[key].queuetime - foodtime :  (orders[key].foodmaketime == 0) ? orders[key].queuetime - coffeetime :(coffeetime > foodtime ) ?  orders[key].queuetime - coffeetime : orders[key].queuetime - foodtime
                          //var time = (coffeetime > foodtime ) ?  orders[key].queuetime - coffeetime : orders[key].queuetime - foodtime
                        if(time <0) time=0
                        ref.update({"queuetime": time })
                        }
                        })

                      }
                  if(preorders!=null && preorders!=undefined )Object.keys(preorders).map( uid => { ordermap(preorders[uid],uid) })
                }).then(()=>{
                orderRef.remove();
                result=true
                semaphoreRef.set(0);
                res.status(200).send({result:'success'});
                })
            })

          })

        }
        else { semaphoreRef.set(0); res.status(401).send({'error':'delete_error'});}
      })
      //res.status(401).send({'error':'delete_error'});
    }
    else{
    semaphoreRef.set(0);
    res.status(401).send( {'error':'delete_error'});
    }

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
    const formattedDate = new Date();
    console.log('Sending Formatted date:', formattedDate);
    res.status(200).send(formattedDate);
    // [END sendResponse]
  });
  }
}
// [END all]

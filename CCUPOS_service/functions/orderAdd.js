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
      if(semaphore!=0) { return false;}
      else {semaphoreRef.set(flag); return true;}

    }).then(delay(150)).then((result)=>{
    //semaphoreRef.set(0)
    semaphoreRef.once('value',(snapshot)=>{
      //semaphoreRef.set(0)
      var semaphore = snapshot.val();
      //console.log(currentflag)
    if(semaphore!=flag  && !result ) {res.status(500).end();}

    else
    {
    admin.auth().verifyIdToken(req.body.idtoken)
    .then(function(decodedToken) {
    var uid = decodedToken.uid
    req.body.createdBy = uid
    var user = admin.database().ref(`/users/${uid}`)
    var userdata
    user.once('value', (usersnapshot) =>{
    userdata=usersnapshot.val()
    //console.log(userdata)
    }).then(()=>{

    if(req.body!=null && userdata != null){
      if(req.body.order_list!=null && req.body.order_list!=undefined && req.body.type!=null && req.body.type!=undefined){
      var preorders = admin.database().ref(`/preorders`)
      var serialRef = admin.database().ref(`/serial`)
      var pipeline = admin.database().ref("/pipeline")
      var menuRef = admin.database().ref(`/menu`)
      var coffeetime=0;
      var coffeeitem = ["Americano","Cappuccino","Herbal_tea","Latte_ice","Latte_large_hot","Latte_small_hot","Milktea","Redtea"];
      var foodtime=0;
      var fooditem = ["Chocolate_muffins","Chocolate_sundae","Deluxe_pizza","Honey_muffins","Original_muffins","Seafood_pizza","Smoked_chicken_pizza","Spaghetti_bolognese","Spaghettii_with_bacon_in_cream_sauce","Spaghettii_with_clam_in_green_sauce","Thick_toast_with_butter","Thick_toast_with_peanut","Vanilla_sundae"];
      var total_price = 0
      //console.log(req.body)
      menuRef.once('value', (menusnapshot) =>{
      var menu=menusnapshot.val()
      Object.keys(req.body.order_list).map( key => {

        if(menu[key]!=null && menu[key]!=undefined &&  (req.body.order_list[key].count>0)){
            req.body.order_list[key].name = menu[key].name;
            req.body.order_list[key].status = 'Queued'
            req.body.order_list[key].price=menu[key].price * req.body.order_list[key].count;
            total_price += menu[key].price * req.body.order_list[key].count;
            if( (coffeeitem.indexOf(key) != -1 ))
              coffeetime+= req.body.order_list[key].count*menu[key].maketime;
            else if( (fooditem.indexOf(key) != -1 ))
              foodtime+= req.body.order_list[key].count*menu[key].maketime;

        }
        else delete  req.body.order_list[key]
        })
        if(!req.body.order_list) { semaphoreRef.set(0); res.status(401).send({'error':'order_error'}); process.exit(-1)}
      }).then(()=>{/*利用once的promise確保上面動作做完後再寫入其他資訊並傳送*/
       /*Is variable assignment synchronous in nodejs?
          Yes, it is.
        Actually, any sequence of statements is executed synchronously.
        */
            req.body.checked = 'Nonpay'
            req.body.status = 'Queued'
            req.body.createdAt = admin.database.ServerValue.TIMESTAMP
            req.body.total_price = total_price
            req.body.coffeemaketime = coffeetime;
            req.body.foodmaketime = foodtime;

            serialRef.once("value").then((snapshot)=>{
               var serial = snapshot.val();
               var today = new Date();
               var date = today.getUTCDate()
               function paddingLeft(str,lenght){
	                if(str.length >= lenght)
	                 return str;
	                else
	                 return paddingLeft("0" +str,lenght);
                }
               if(serial.serialdate !== date) {
                 serialRef.set({serialdate:date, serialnum:1+1})
                 req.body.serial = req.body.type==='eathere' ? `0${paddingLeft(1,3)}` : `1${paddingLeft(1,3)}`
                 preorders.remove();
               }
               else{
                 serialRef.set({serialdate:date, serialnum:serial.serialnum+1})
                req.body.serial = req.body.type==='eathere' ? `0${paddingLeft(serial.serialnum,3)}` : `1${paddingLeft(serial.serialnum,3)}`
               }
               //console.log(preoderlist);
            }).then(()=>{
              var preordersuid = preorders.child(req.body.createdBy)
              preordersuid.push(req.body)
              semaphoreRef.set(0)
              //console.log(flag)
              res.status(200).send({serial:req.body.serial});
            }).catch(function(error) {
            // Handle token error
              semaphoreRef.set(0)
              res.status(401).send({'error':'send_error'});

            })

      }).catch(function(error) {
      // Handle token error
        semaphoreRef.set(0)
        res.status(401).send({'error':'send_error'});

      })

      }
      else{
        semaphoreRef.set(0)
        res.status(401).send({'error':'order_error'});

      }
    }
    else{
      semaphoreRef.set(0)
      res.status(401).send({'error':'send_error'});

    }

      })

    }).catch(function(error) {
    // Handle token error
      semaphoreRef.set(0)
      res.status(401).send({'error':'send_error'});

    })
  }
  })

  }).catch(function(error) {
  // Handle token error
    semaphoreRef.set(0)
    res.status(401).send({'error':'send_error'});

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

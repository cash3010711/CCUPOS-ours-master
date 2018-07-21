
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');






exports.handler = (event) => {
  var orderRef = event.data.previous.val();
  var pipelineRef = admin.database().ref("/pipeline");
  var menuRef = admin.database().ref(`/menu`)
  var preordersRef = admin.database().ref(`/preorders`)
  //var ordertime = new Date(orderRef['orderTime']);
  var coffeetime=0;
  var coffeeitem = ["Americano","Cappuccino","Herbal_tea","Latte_ice","Latte_large_hot","Latte_small_hot","Milktea","Redtea"];
  var foodtime=0;
  var fooditem = ["Chocolate_muffins","Chocolate_sundae","Deluxe_pizza","Honey_muffins","Original_muffins","Seafood_pizza","Smoked_chicken_pizza","Spaghetti_bolognese","Spaghettii_with_bacon_in_cream_sauce","Spaghettii_with_clam_in_green_sauce","Thick_toast_with_butter","Thick_toast_with_peanut","Vanilla_sundae"];
  //var second = 1000;
  //var coffeemaketime = 40 * second ;
  //var count1 = 0 , count2 = 0;
  //var machinestate = { machine};
  //var machinecount = [0,0];

  //var i=0;

  if(orderRef!=null){
  menuRef.once('value', (menusnapshot) =>{
    var menu=menusnapshot.val()
    Object.keys(orderRef.order_list).map( key => {
         if( (coffeeitem.indexOf(key) != -1 ))
        coffeetime+= orderRef.order_list[key].count*menu[key].maketime;
      else if( (fooditem.indexOf(key) != -1 ))
        foodtime+= orderRef.order_list[key].count*menu[key].maketime;
       })
  }).then(()=>{

  pipelineRef.once("value")
    .then((snapshot)=> {
      /*
        var coffee = snapshot.val();
        var state = { queuetime: coffee.queuetime , machinecount : coffee.machinecount };

        if(state["queuetime"]-coffeetime >= 0)state["queuetime"]=state["queuetime"]-coffeetime;
        else state["queuetime"]=0
        pipelineRef.set(state);
        */
        var ss = snapshot.val();
        var coffeeref = pipelineRef.child('coffee');
        var foodref = pipelineRef.child('food');
        var coffeestate = { queuetime: ss.coffee.queuetime , machinecount : ss.coffee.machinecount };
        var foodstate = { queuetime: ss.food.queuetime , machinecount : ss.food.machinecount };

        if(coffeestate["queuetime"]-coffeetime >= 0) coffeestate["queuetime"]=coffeestate["queuetime"]-coffeetime; else coffeestate["queuetime"] =0;
        if(foodstate["queuetime"]-foodtime >= 0) foodstate["queuetime"]=foodstate["queuetime"]-foodtime; else  foodstate["queuetime"] = 0;
        coffeeref.set(coffeestate);
        foodref.set(foodstate);
    })
          /*changetoOn?*/
          preordersRef.once("value")
            .then((snapshot)=> {
              var preorders = snapshot.val();
        /*
        var orderlistmap = (orderlist,uid,key) =>{
            Object.keys(orderlist).map( item => { var ref = preordersRef.Child(uid).Child(key); ref.update({})  }  )
        }
        */
            var ordermap = (orders,uid) =>{
            Object.keys(orders).map(key => {
              if(orders[key].createdAt >= orderRef.createdAt) {
                var ref = preordersRef.child(uid).child(key);
                //var time = (orders[key].coffeemaketime == 0) ? orders[key].queuetime - foodtime :  (orders[key].foodmaketime == 0) ? orders[key].queuetime - coffeetime :(coffeetime > foodtime ) ?  orders[key].queuetime - coffeetime : orders[key].queuetime - foodtime
                var time = (coffeetime > foodtime ) ?  orders[key].queuetime - coffeetime : orders[key].queuetime - foodtime
                if(time <0) time=0
                ref.update({"queuetime": time })
                }
              })

            }
            if(preorders!=null && preorders!=undefined )Object.keys(preorders).map( uid => { ordermap(preorders[uid],uid) })


        //pipeline.set(state);

        });

    })
  }

}

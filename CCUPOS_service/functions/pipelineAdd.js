
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');






exports.handler = (event) => {
  var orderRef = event.data.val();
  var pipeline = admin.database().ref("pipeline/coffee");
  var menuRef = admin.database().ref(`/menu`)
  //var ordertime = new Date(orderRef['orderTime']);
  var coffeetime=0;
  var coffeeitem = ["Americano","item02","item03","item04"];
  //var second = 1000;
  //var coffeemaketime = 40 * second ;
  //var count1 = 0 , count2 = 0;
  //var machinestate = { machine};
  //var machinecount = [0,0];

  //var i=0;

  if(orderRef!=null){
  menuRef.once('value', (menusnapshot) =>{
    var menu=menusnapshot.val()
    Object.keys(orderRef.order_list).map( key => {  if( (coffeeitem.indexOf(key) != -1 )) coffeetime+= orderRef.order_list[key].count*menu[key].maketime; })
  })
  }
  //if(coffeecount == 1) machinecount[1] = 1;
  //else {machinecount[0] = Math.floor(coffeecount/2); machinecount[1]=coffeecount-machinecount[0] }

  pipeline.once("value")
    .then((snapshot)=> {
        var coffee = snapshot.val();
        //var queuecount = coffee.queue;
        var state = { queuetime: coffee.queuetime , machinecount : coffee.machinecount };

      /*
      if(coffee != null){
         Object.keys(coffee).sort(function (a, b) {return coffee[b]> coffee[a] ? 1 : -1;}).map( key => {
           var currenttime = new Date();
           var machinetime = new Date(coffee[key]);

           if(currenttime.getTime() > machinetime.getTime()) { currenttime = new Date();  currenttime = new Date(currenttime.getTime() + (coffeemaketime*machinecount[i]));   machinestate[key] = currenttime.getTime();   }
           else {currenttime = new Date(machinetime.getTime() + (coffeemaketime*machinecount[i])); machinestate[key] = currenttime.getTime();}
           //i++;
         } );
       }
         */
        state["queuetime"]=state["queuetime"]+coffeetime;

        pipeline.set(state);


    });
}

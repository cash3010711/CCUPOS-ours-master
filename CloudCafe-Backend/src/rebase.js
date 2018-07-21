import Rebase from 're-base';
import firebase from 'firebase';
//import database from 'firebase/database';


var app = firebase.initializeApp({
    apiKey: "AIzaSyAq8Xt1gbv-1CjYPYtTVsKAdUEcxlvujwI",
    authDomain: "cafe-le-cloud.firebaseapp.com",
    databaseURL: "https://cafe-le-cloud.firebaseio.com",
  
   });

//var db = app.database();

app.auth().signInWithEmailAndPassword("test@gmail.com", "testtest").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
var base = Rebase.createClass(app.database());

export default base;
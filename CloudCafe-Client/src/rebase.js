import Rebase from 're-base';
import firebase from 'firebase';
//import database from 'firebase/database';


var app = firebase.initializeApp({
    apiKey: "AIzaSyDHmPGR9Lo0ZNC8EuNWmCx-Jp4vDM3jt6I",
      authDomain: "cloudcoffee-e23cb.firebaseapp.com",
      databaseURL: "https://cloudcoffee-e23cb.firebaseio.com",
  
   });

//var db = app.database();

app.auth().signInWithEmailAndPassword("test@gmail.com", "testtest").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
var base = Rebase.createClass(app.database());

export default base;
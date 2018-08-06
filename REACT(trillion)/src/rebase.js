import Rebase from 're-base';
import firebase from 'firebase';
//import database from 'firebase/database';


var app = firebase.initializeApp({
	apiKey: "AIzaSyD2LTP1tRQ1lYiMJhLq7_tY720kGkPn66o",
	authDomain: "cool-test-menu.firebaseapp.com",
	databaseURL: "https://cool-test-menu.firebaseio.com",
	projectId: "cool-test-menu",
	storageBucket: "cool-test-menu.appspot.com",
	messagingSenderId: "365305553438"
   });

// app.auth().signInWithEmailAndPassword("test@gmail.com", "testtest").catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });
var base = Rebase.createClass(app.database());

export default base;
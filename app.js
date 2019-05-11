// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train schedule - then update the html + update the database
// 3. Create a way to retrieve train from the trainschedule database.
// 4. Create a way to calculate the next arrival time. Using difference between firat train time and current time.
//    Then use moment.js formatting to set difference in time.
// 5. Calculate next arrival time
//=================================================================

// 1. Initialize Firebase

var firebaseConfig = {
  apiKey: 'AIzaSyBU974H2g05drqCvKdoYwEevTo_u0U2-04',
  authDomain: 'trainschedule-f0a56.firebaseapp.com',
  databaseURL: 'https://trainschedule-f0a56.firebaseio.com',
  projectId: 'trainschedule-f0a56',
  storageBucket: 'trainschedule-f0a56.appspot.com',
  messagingSenderId: '132381527840',
  appId: '1:132381527840:web:717ba7bb9a1f3471'
};

firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();

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

//=================================================

//2. when click, add the input data to database and clar the inputbox
$('#add-train-btn').on('click', function(event) {
  event.preventDefault();

  //Grabs the user input

  var trainName = $('#train-name-input')
    .val()
    .trim();
  var destination = $('#destination-input')
    .val()
    .trim();
  var trainStart = $('#first-train-time-input')
    .val()
    .trim();

  var frequency = $('#frequency-input')
    .val()
    .trim();

  var newTrain = {
    TrainName: trainName,
    Destination: destination,
    FirstTrain: trainStart,
    Frequency: frequency
  };

  //uploads the data to database
  database.ref().push(newTrain);
  console.log('==========================');
  console.log(newTrain.TrainName);
  console.log(newTrain.Destination);
  console.log(newTrain.FirstTrain);
  console.log(newTrain.Frequency);

  //clears inout box
  $('#train-name-input').val('');
  $('#destination-input').val('');
  $('#first-train-time-input').val('');
  $('#frequency-input').val('');
});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

database.ref().on('child_added', function(childSnapshot) {
  console.log('=======================');
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().TrainName;
  var destination = childSnapshot.val().Destination;
  var firstTrain = childSnapshot.val().FirstTrain;
  var frequency = childSnapshot.val().Frequency;
  console.log('========================');
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
});

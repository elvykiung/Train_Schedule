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

  // validate input has to be number
  if (!moment(trainStart).isValid()) {
    alert('train time invalid');
    return;
  }

  if (!moment(frequency).isValid()) {
    alert('train time invalid');
    return;
  }

  var newTrain = {
    TrainName: trainName,
    Destination: destination,
    FirstTrain: trainStart,
    Frequency: frequency
  };

  //uploads the data to database
  database.ref().push(newTrain);

  //clears inout box
  $('#train-name-input').val('');
  $('#destination-input').val('');
  $('#first-train-time-input').val('');
  $('#frequency-input').val('');
});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

database.ref().on('child_added', function(childSnapshot) {
  var trainName = childSnapshot.val().TrainName;
  var destination = childSnapshot.val().Destination;
  var firstTrain = childSnapshot.val().FirstTrain;
  var frequency = childSnapshot.val().Frequency;

  // Prettify the train first train time
  var trainStartPretty = moment.unix(firstTrain).format('HH:mm');
  //===============calculate the time=========================================
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years');

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes');
  nextTrain = moment(nextTrain).format('HH:mm');

  //append the data to display board

  var newRow = $('<tr>').append($('<td>').text(trainName), $('<td>').text(destination), $('<td>').text(frequency), $('<td>').text(nextTrain), $('<td>').text(tMinutesTillTrain));

  // Append the new row to the table
  $('#trainSchedule-display > tbody').append(newRow);
});

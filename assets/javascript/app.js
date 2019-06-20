var config = {
  apiKey: "AIzaSyDXWxhuWNoqxe62Gh9Qjql0Fu3AVcsh970",
  authDomain: "assignment7-6dcee.firebaseapp.com",
  databaseURL: "https://assignment7-6dcee.firebaseio.com",
  projectId: "assignment7-6dcee",
  storageBucket: "",
  messagingSenderId: "125154003823",
  appId: "1:125154003823:web:7faef484fa855d0a"
};
firebase.initializeApp(config);
var database = firebase.database();
var trainArray = [];

$(document).ready(function () {
  console.log(database);
  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());

      var tData={
      tName: snapshot.val().nameOfTrain,
      tDestination: snapshot.val().destinationLocal,
      tFristTrain: snapshot.val().startingTime,
      tFrequency: snapshot.val().frequencyOfTrain,
      }

      console.log(tData);
      addingTrain(tData);
    
  })


  //MAKE FUNCTION FOR ON LOAD CHECK FIREBASE
  $(".submitButton").on("click", function () {

    var name = $(".trainName").val();
    var destination = $(".destination").val();
    var firstTrain = $(".firstTrain").val();
    var frequency = $(".frequency").val();

    //Makes train data an object so it can be added later
    var trainOBJ = {
      tName: name,
      tDestination: destination,
      tFristTrain: firstTrain,
      tFrequency: frequency,

    };
    //Adding entries to firebase
    database.ref().push({
      nameOfTrain: name,
      destinationLocal: destination,
      startingTime: firstTrain,
      frequencyOfTrain: frequency,
    });

    trainArray.push(trainOBJ);
    //addingTrain(trainOBJ);

  });



  //On click for clear button that will hopefully clear the train display div and firebase database
  $(".clearButton").on("click", function () {
    trainArray = [];
    $(".trainDisplay").empty();
    //Find someway to clear out firebase data structure...
  });


  function addingTrain(trainObj) {
    var name = trainObj.tName;
    var destination = trainObj.tDestination;
    var firstTrain = trainObj.tFristTrain;
    var frequency = trainObj.tFrequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    nextTrain = moment(nextTrain).format("hh:mm")


    console.log("CONSOLE LOGS")
    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(nextTrain);
    console.log(tMinutesTillTrain);




    

    //Divs that will be added to the train display system
    var rowToAdd = $("<div>");
    var nameDiv = $("<div>");
    var destinationDiv = $("<div>");
    var frequencyDiv = $("<div>");
    var nextArrivalDiv = $("<div>");
    var minutesAwayDiv = $("<div>");

    //Giving the divs all col value
    nameDiv.attr("class", "col-2");
    destinationDiv.attr("class", "col-2");
    frequencyDiv.attr("class", "col-2");
    nextArrivalDiv.attr("class", "col-2");
    minutesAwayDiv.attr("class", "col-2");

    //Populating the text values
    nameDiv.text(name);
    destinationDiv.text(destination);
    frequencyDiv.text(frequency);
    nextArrivalDiv.text(nextTrain);
    minutesAwayDiv.text(tMinutesTillTrain);


    //making the row a row
    rowToAdd.addClass("row");
    rowToAdd.addClass("trainContent");



    //Adding cols to the row
    rowToAdd.append(nameDiv);
    rowToAdd.append(destinationDiv);
    rowToAdd.append(frequencyDiv);
    rowToAdd.append(nextArrivalDiv);
    rowToAdd.append(minutesAwayDiv);
    console.log(rowToAdd);

    //Make content visable on the page
    $(".trainDisplay").append(rowToAdd);

  };
});

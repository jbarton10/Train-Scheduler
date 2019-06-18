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
  var database=firebase.database();

  $(".submitButton").on("click", function(){

    
    var name = $(".trainName").val();
    var destination = $(".destination").val();
    var firstTrain = $(".firstTrain").val();
    var frequency = $(".frequency").val();
    var nextArrival; 
    var minutesAway;

    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    database.ref().push({
        nameOfTrain: name,
        destinationLocal: destination,
        startingTime: firstTrain,
        frequencyOfTrain: frequency,
                // timeWorked: monthsWorked,
                // amountPayed: totalBilled
    });

    //Divs that will be added to the train display system
    var rowToAdd = $("<div>");
    var nameDiv = $("<div>");
    var destinationDiv = $("<div>");
    var firstTrainDiv = $("<div>");
    var frequencyDiv = $("<div>");
    var nextArrivalDiv = $("<div>");
    var minutesAwayDiv = $("div");

    rowToAdd.attr("class", "row");
    rowToAdd.attr("class", "trainContent");
    

    // $(".trainDisplay").
});
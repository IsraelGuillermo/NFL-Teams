$("#teams").on("change", function () {
  var teamSelected = $(this).find("option:selected").text();
  var baseUrl = "https://gnews.io/api/v4/search?q=";
  var apiKey = "ecb04637f4c2aa21b0666704531e67ed";
  $.ajax({
    url: baseUrl + teamSelected + "&token=" + apiKey,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});

var teams = [];
var baseURL = "https://www.thesportsdb.com/api/v1/json/1/";

$.ajax({
  url: baseURL + "search_all_teams.php?l=NFL",
  method: "GET",
}).then(function (response) {
  for (var i = 0; i < response.teams.length; i++) {
    var team = {
      [response.teams[i].idTeam]: response.teams[i].strTeam,
    };
    teams.push(team);
    $("<option>")
      .appendTo("#teams")
      .text(response.teams[i].strTeam)
      .attr("data-teamId", response.teams[i].idTeam);
  }
});

$("#teams").on("change", function () {
  console.log(teams);
  $("#schedule").empty();

  teamSelected = $(this).find("option:selected").attr("data-teamId");
  $.ajax({
    url: baseURL + "eventslast.php?id=" + teamSelected,
    method: "GET",
  }).then(function (response) {
    //TODO: Get Scores and Get Team Names.  Show team name and the score
    console.log(response);
    displaySchedule(response.results);

    //intAwayScore
    //idAwayTeam

    //idHomeTeam
    //intHomeScore

    // for(var i = 0; i < response.results.length; i++) {
    //   var previousGame = response.results[i];
    //   var awayScore = previousGame.intAwayScore;
    //   console.log("Away Score", awayScore);

    //   var homeScore = previousGame.intHomeScore;
    //   console.log("Home Score", homeScore);
    // }

    response.results.forEach((previousGame) => {
      var awayScore = previousGame.intAwayScore;
      var idAwayTeam = previousGame.idAwayTeam;

      var idAwayTeam = previousGame.idAwayTeam;
      //TODO:  We need to translate the team id to the team name.
      // We have an id saved to the teams array we we can lookup
      console.log("Away:" + getTeamNameFromId(idAwayTeam), awayScore);

      var homeScore = previousGame.intHomeScore;
      var idHomeTeam = previousGame.idHomeTeam;
      console.log("Home:" + getTeamNameFromId(idHomeTeam), homeScore);
    });
    // $("body").append()

    $.ajax({
      url: baseURL + "eventsnext.php?id=" + teamSelected,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      displaySchedule(response.events);
    });
  });
});

function displaySchedule(events) {
  $("#dropdown").removeClass("height");
  for (var i = 0; i < events.length; i++) {
    $("<h1>").text(events[i].strEvent).appendTo("#schedule");
  }
}

function getTeamNameFromId(teamId) {
  for (var i = 0; i < teams.length; i++) {
    if (Object.keys(teams[i])[0] === teamId) {
      return Object.values(teams[i])[0];
    }
  }
  return "Unable to find team";
}

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
  console.log(response);
  for (var i = 0; i < response.teams.length; i++) {
    var team = {
      [response.teams[i].idTeam]: response.teams[i].strTeam,
      badge: response.teams[i].strTeamBadge,
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

  $("<h1>").text("Schedule").appendTo("#title").addClass("is-size-2");
  
  $("<h1>").text("Team News").appendTo("#tname").addClass("is-size-2");

  teamSelected = $(this).find("option:selected").attr("data-teamId");
  $.ajax({
    url: baseURL + "eventslast.php?id=" + teamSelected,
    method: "GET",
  }).then(function (response) {
    //TODO: Get Scores and Get Team Names.  Show team name and the score
    console.log(response);
    // displayPastGames(response.results);

    //intAwayScore
    //idAwayTeam

    //idHomeTeam
    //intHomeScore

    // for (var i = 4; i < response.results.length; i--) {
    //   var previousGame = response.results[i];
    //   var awayScore = previousGame.intAwayScore;
    //   var idAwayTeam = previousGame.idAwayTeam;
    //   console.log(
    //     "Away Score",
    //     awayScore + "Away Team",
    //     getTeamNameFromId(idAwayTeam)
    //   );

    //   var homeScore = previousGame.intHomeScore;
    //   var idHomeTeam = previousGame.idHomeTeam;

    //   console.log(
    //     "Home Score",
    //     homeScore + " Home Team",
    //     getTeamNameFromId(idHomeTeam)
    //   );

    //   $("<h1>").text(getTeamNameFromId(idHomeTeam)).appendTo("#schedule");
    // }

    response.results.forEach((previousGame) => {
      console.log(previousGame);
      var awayScore = previousGame.intAwayScore;
      var idAwayTeam = previousGame.idAwayTeam;
      //TODO:  We need to translate the team id to the team name.
      // We have an id saved to the teams array we we can lookup
      console.log("Away:" + getTeamNameFromId(idAwayTeam), awayScore);
      var homeScore = previousGame.intHomeScore;
      var idHomeTeam = previousGame.idHomeTeam;
      console.log("Home:" + getTeamNameFromId(idHomeTeam), homeScore);
      displayPreviousScores(previousGame);
    });

    $.ajax({
      url: baseURL + "eventsnext.php?id=" + teamSelected,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      displaySchedule(response.events);
    });
  });
});

// function displayPastGames(events) {
//   for (var i = 0; i < events.length; i++) {
//     var div = $("<div>");
//     $("<h1>")
//       .text(events[i].strEvent)
//       .addClass("is-size-5 is-text-centered")
//       .appendTo(div);
//     $("<p>")
//       .text(new Date(events[i].dateEvent).toLocaleDateString())
//       .addClass("is-size-5")
//       .prependTo(div);
//     div.prependTo("#schedule").addClass("ml-5");
//   }
// }
function displaySchedule(events) {
  $("#dropdown").removeClass("height").addClass("mb-3 mt-3");

  for (var i = 0; i < events.length; i++) {
    var div = $("<div>").addClass("columns");
    $("<h1>")
      .text(events[i].dateEvent + " " + events[i].strEvent)

      .addClass("is-size-5")
      .appendTo(div);

    div.appendTo("#schedule").addClass("ml-5");
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

function displayPreviousScores(previousGame) {
  var awayScore = previousGame.intAwayScore;
  var idAwayTeam = previousGame.idAwayTeam;
  //TODO:  We need to translate the team id to the team name.
  // We have an id saved to the teams array we we can lookup
  console.log("Away:" + getTeamNameFromId(idAwayTeam), awayScore);
  var homeScore = previousGame.intHomeScore;
  var idHomeTeam = previousGame.idHomeTeam;
  var div = $("<div>").addClass("columns ml-5");

  $("<h1>")
    .text(
      previousGame.dateEvent +
        " " +
        getTeamNameFromId(idAwayTeam) +
        " " +
        awayScore +
        " vs " +
        getTeamNameFromId(idHomeTeam) +
        " " +
        homeScore
    )
    .addClass("is-size-5")
    .appendTo(div);

  div.prependTo("#schedule");
}


//Script for displaying articles begins here.



function displayArticles(articles) {
  $("#dropdown").removeClass("height").addClass("mb-3 mt-3");

  for (var i = 0; i < articles.length; i++) {
    var div = $("<div>").addClass("columns");
    $('<h1>')
    .text(articles[i].title + articles[i].description)

    .addClass("is-size-5")
    .appendTo(div);

    div.appendTo("#Articles").addClass("ml-5");
}
}
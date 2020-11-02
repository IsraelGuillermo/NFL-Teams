var teams = [];
var baseURL = "https://www.thesportsdb.com/api/v1/json/1/";
var baseUrl = "https://gnews.io/api/v4/search?q=";
var favoriteTeams = [];

$.ajax({
  url: baseURL + "search_all_teams.php?l=NFL",
  method: "GET",
}).then(function (response) {
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
  console.log(teams);
});

function getNews(teamSelected) {
  var baseUrl = "https://gnews.io/api/v4/search?&lang=en&q=";
  var apiKey = "ecb04637f4c2aa21b0666704531e67ed";
  $.ajax({
    url: baseUrl + teamSelected + "&token=" + apiKey,
    method: "GET",
  }).then(function (response) {
    displayArticles(response.articles);
  });
}

$("#teams").on("change", function () {
  var teamSelected = $(this).find("option:selected").text();
  var teamId = $(this).find("option:selected").attr("data-teamId");

  displayGameInfo(teamId);
  getNews(teamSelected);
  loadTeamBadge(teamSelected);
});
function displaySchedule(events) {
  $("#dropdown").removeClass("height").addClass("mb-3 mt-3");

  for (var i = 0; i < events.length; i++) {
    var div = $("<div>").addClass("columns notification");
    $("<h1>")
      .text(events[i].dateEvent + " " + events[i].strEvent)

      .addClass("is-size-5")
      .appendTo(div);

    div.appendTo("#schedule");
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
  var homeScore = previousGame.intHomeScore;
  var idHomeTeam = previousGame.idHomeTeam;
  var div = $("<div>").addClass("columns notification");

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
  $("<h1>")
    .text("Team News")
    .appendTo("#tname")
    .addClass("is-size-2 lead-titles");
  for (var i = 0; i < articles.length; i++) {
    var div = $("<div>").addClass("notification");
    var newH1 = $("<h1>").addClass("is-size-5").appendTo(div);

    $("<a>")
      .attr("target", "_blank")
      .attr("href", articles[i].url)
      .text(articles[i].title)
      .appendTo(newH1);
    //need to stop word count of description after 100 characters.
    var description = articles[i].description;
    if (description.length > 100) {
      description = description.substring(0, 99).concat("...");
    }

    //after 100 characters add an elipses.

    $("<p>").text(description).appendTo(div);

    div.appendTo("#tname");
  }
}

$("#save").on("click", function () {
  var newTeam = $("#teams").find("option:selected").text();
  if (newTeam === "Select Your Team") {
    return;
  } else if (!favoriteTeams.includes(newTeam)) {
    favoriteTeams.push(newTeam);
  }
  saveTeams();
  renderFavTeams();
});

function saveTeams() {
  localStorage.setItem("favoriteTeams", JSON.stringify(favoriteTeams));
}

function init() {
  var favTeams = JSON.parse(localStorage.getItem("favoriteTeams"));
  if (favTeams !== null) {
    favoriteTeams = favTeams;
  }

  renderFavTeams();
}

init();

function renderFavTeams() {
  $("#buttons").empty();
  for (var i = 0; i < favoriteTeams.length; i++) {
    var team = favoriteTeams[i];
    var button = $("<button>").addClass(
      "favoriteButton button is-primary is-link is-rounded "
    );

    button.text(team).appendTo("#buttons");
  }
}
function displayGameInfo(teamId) {
  $("#schedule").empty();
  $("#tname").empty();
  $("#title").empty();
  $("<h1>").text("Schedule").appendTo("#title").addClass("is-size-2");

  $.ajax({
    url: baseURL + "eventslast.php?id=" + teamId,
    method: "GET",
  }).then(function (response) {
    response.results.forEach((previousGame) => {
      var awayScore = previousGame.intAwayScore;
      var idAwayTeam = previousGame.idAwayTeam;
      //TODO:  We need to translate the team id to the team name.
      // We have an id saved to the teams array we we can lookup
      var homeScore = previousGame.intHomeScore;
      var idHomeTeam = previousGame.idHomeTeam;
      displayPreviousScores(previousGame);
    });

    $.ajax({
      url: baseURL + "eventsnext.php?id=" + teamId,
      method: "GET",
    }).then(function (response) {
      displaySchedule(response.events);
    });
  });
}
$(document).on("click", ".favoriteButton", function (event) {
  event.preventDefault();
  getNews($(this).text());
  displayGameInfo(getTeamIdFromName($(this).text()));
  loadTeamBadge($(this).text());
});

function getTeamIdFromName(teamName) {
  for (var i = 0; i < teams.length; i++) {
    if (Object.values(teams[i])[0] === teamName) {
      return Object.keys(teams[i])[0];
    }
  }
  return "unable to find";
}
function loadTeamBadge(teamName) {
  $("#image").empty();
  for (var i = 0; i < teams.length; i++) {
    if (Object.values(teams[i])[0] === teamName) {
      var img = $("<img>");

      img.attr("src", teams[i].badge).appendTo("#image");
    }
  }
  return "unable to find";
}

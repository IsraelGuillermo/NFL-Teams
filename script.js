
var chooseTeam = [
    'Arizona Cardinals',
    'Atlanta Falcons',
]

function queryUrl() {
    var 
    var url= 'http://newsapi.org/v2/top-headlines?' +
        'q=nfl&' +
        'from=2020-10-23' +
        'sortBy=popularity&' +
        'apiKey=e36111cc3f7946369149bb71ead841ff';
    var req = new Request(url);
    
    fetch(req)
        .then(function(response) {
            console.log(response.json());
        })
        return req;
}

$("#teams").on("change", function () {
  var teamSelected = $(this).find("option:selected").text();
  function NFLQuery() {
    var URL =
      "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" +
      teamSelected;
    return URL;
  }

  var queryURL = NFLQuery();
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});

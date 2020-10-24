

$('#teams').on('change', function () {
    var teamSelected= $(this).find('option:selected').text();
    var baseUrl='https://gnews.io/api/v4/search?q='
    var apiKey='ecb04637f4c2aa21b0666704531e67ed'
    $.ajax({
      url: baseUrl + teamSelected + '&token=' + apiKey,
      
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });

});

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

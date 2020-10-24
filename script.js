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

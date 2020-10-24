

$('#teams').on('change', function queryUrl() {
    var teamSelected= $(this).find('option:selected').text();
    function newsQuery(){
    var url= 'https://gnews.io/api/v4/search?q=' +
        teamSelected +
        'ecb04637f4c2aa21b0666704531e67ed';
      return url;
    }
    var otherQueryUrl = newsQuery();

    fetch('https://gnews.io/api/v4/search?q=example&token=ecb04637f4c2aa21b0666704531e67ed')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
    /*
    $.ajax({
      url: otherQueryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
    */
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

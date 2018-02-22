// on page load, search for & display a random gif matching your search term using the Giphy API.
document.addEventListener('DOMContentLoaded', init());

function init(){
  loadJSON(function(data){
    var deck = JSON.parse(data);
    console.log(deck);

  });
}

function loadJSON(callback){
    var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', 'json/deck.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);
}

function getGifs(q) {
  var api = "https://api.giphy.com/";
  // var endpoint = "v1/gifs/search?";
  var endpoint = "v1/gifs/random?";
  var query = "&q=";
  var apikey = "&api_key=fe009N4MEiNfOGpU1tEo71SaVr74epEw";

	query = query+q; // search query
  var url = api+endpoint+apikey+query;
	request = new XMLHttpRequest;
	// request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
  request.open('GET', url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
			console.log(data);
			document.getElementById("cardImg").innerHTML = '<center><img src = "'+data+'"  title="GIF via Giphy"></center>';
		} else {
			console.log('reached giphy, but API returned an error');
		 }
	};

	request.onerror = function() {
		console.log('connection error');
	};

	request.send();
}

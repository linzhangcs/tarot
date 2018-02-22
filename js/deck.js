// on page load, search for & display a random gif matching your search term using the Giphy API.
document.addEventListener('DOMContentLoaded', init());

function init(){
  var cards = {};
  var deck;

  loadJSON(function(data){
    deck = JSON.parse(data);
    console.log(deck);
    cards = getCardsInfo(deck);
    console.log(cards);
    getGifs(cards.love, 0);
    getGifs(cards.mood, 1);
    getGifs(cards.career, 2);
  });
}

function getCardsInfo(deck){
  var cards = {};
  var cardIds = [];
  var counter = 0;
  while(counter < 3){
    var t = getRandomInt(22);
    if(!cardIds.includes(t)){
      cardIds[counter] = t;
      counter++;
    }
  }
  cards.love = deck.tarot_interpretations[cardIds[0]];
  cards.mood = deck.tarot_interpretations[cardIds[1]];
  cards.career = deck.tarot_interpretations[cardIds[2]];
  // console.log(cards);
  return cards;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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

function getGifs(q, c) {
  var api = "https://api.giphy.com/";
  // var endpoint = "v1/gifs/search?";
  var endpoint = "v1/gifs/random?";
  var query = "&q=";
  var apikey = "&api_key=fe009N4MEiNfOGpU1tEo71SaVr74epEw";
  var keywords;
  var request;
  // keywords = q.name.split(" ").join("+")+"+"+q.keywords.join('+');
  keywords = q.keywords.join('+');

  query = query+keywords; // search query
  var url = api+endpoint+apikey+query;
  var r = getRandomInt(q.fortune_telling.length);
  console.log(url);
  request = new XMLHttpRequest;
  // request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      data = JSON.parse(request.responseText).data.image_url;
      console.log(data);
      document.getElementById("card-img" + c).innerHTML = '<img src = "'+data+'"  title="'+q.name+'">';
      document.getElementById("card-title" + c).innerHTML = q.name;
      document.getElementById("fortunate" + c).innerHTML = '<p>'+q.fortune_telling[0]+'</p>';
    } else {
      console.log('reached giphy, but API returned an error');
     }
  };

  request.onerror = function() {
    console.log('connection error');
  };

  request.send();
}

// function getGifs(love, mood, career) {
//   var api = "https://api.giphy.com/";
//   // var endpoint = "v1/gifs/search?";
//   var endpoint = "v1/gifs/random?";
//   var query = "&q=";
//   var apikey = "&api_key=fe009N4MEiNfOGpU1tEo71SaVr74epEw";
//   var keywords;
//   var counter;
//   for(var i = 0; i < 3; i++){
//     keywords = arguments[i].name.split(" ").join("+")+"+"+love.keywords.join('+');
//     query = query+keywords; // search query
//     counter = i;
//     var url = api+endpoint+apikey+query;
//     console.log(url);
//     request = new XMLHttpRequest;
//   	// request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
//     request.open('GET', url, true);
//
//   	request.onload = function() {
//   		if (request.status >= 200 && request.status < 400){
//   			data = JSON.parse(request.responseText).data.image_url;
//   			console.log(data);
//   			document.getElementById("cardImg" + counter).innerHTML = '<center><img src = "'+data+'"  title="GIF via Giphy"></center>';
//   		} else {
//   			console.log('reached giphy, but API returned an error');
//   		 }
//   	};
//
//   	request.onerror = function() {
//   		console.log('connection error');
//   	};
//
//   	request.send();
//   }
//
// }

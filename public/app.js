var app = function(){
  var url = api.key;

  makeRequest(url, requestComplete);
}

//get 20 most recently updated characters, show name, "real name" (if exists), aliases (if exists) birthday, deck, image, first appeared in game.name, 

var makeRequest = function(url, callback) {
  //create a new XMLHttpRequest object
  var request = new XMLHttpRequest();
  //set the type of request we want to make (HINT: GET)
  request.open('GET', url); //capitalization of GET not required but expected
  //tell the request which function to run when it has completed
  request.addEventListener('load', callback);
  //send the request
  request.send();
}

var requestComplete = function() {
  if( this.status !== 200 ) return;

  var jsonString = this.responseText;
  var charactersObject = JSON.parse(jsonString);
  console.log(charactersObject);

// take charactersObject, go into the results object within it, and then retrieve the characters object(an array) from results, and set that array to = characters 

  var characters = charactersObject.results;
  console.log(characters);
  populateList(characters);
}

var populateList = function(characters) {
  var ul = document.querySelector('#character-list');

  characters.forEach( function(character) {
    var li = document.createElement('li');
    var img = document.createElement('img')
    var imageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    var gender = "Unknown"
    var deck = "This character's description hasn't been filled in!"

    if (character.image !== null) {var imageUrl = character.image.small_url;}
    if (character.deck !== null) {var deck = character.deck}
    if (character.gender !== null) {
      if (character.gender === 1) {var gender = "Male"}
      else if (character.gender === 2) {var gender = "Female"}
      else {}
    }

    li.innerHTML = 
    '<p><a href="' + character.site_detail_url + '">' + '<img src="' + imageUrl + '" height="80" width = "80">' + '</p>' +
    '<p><b>' + character.name + '</b></a></p>' + 
    '<p><i>' + deck + '</i></p>' +
    '<p>Gender: ' + gender + '</p>';
    // img = beer.image_url
    ul.appendChild(li);
    // ul.appendChild(img);
  })
}


window.addEventListener('load', app);
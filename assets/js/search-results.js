var searchFormEl = document.querySelector('#search-form');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');

function getParams() {
  var searchParamsArr = document.location.search.split('&');
  var query = searchParamsArr[0].split('=').pop('&');

  searchApi(query);
}

function printResults(resultObj) {
  console.log(resultObj);

  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML = 
  '<strong>Release Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.actors) {
    bodyContentEl.innerHTML +=
      '<strong>Actors:</strong> ' + resultObj.actors.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Actors:</strong> No actors listed for this movie.';
  }

  if (resultObj.review) {
    bodyContentEl.innerHTML +=
      '<strong>Reviews:</strong> + ' + resultObj.review[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Reviews:</strong> No reviews for this movie.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'View More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function searchApi(query) {
  var locQueryUrl = 'https://www.omdbapi.com/';

  locQueryUrl = locQueryUrl + '?t=' + query + '&apikey=75ba03d6';

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {

      resultTextEl.textContent = locRes.search.query;

      console.log(locRes);

      if (!locRes.results.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, please search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.results.length; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
}

var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?t=' + searchInputVal + '&apikey=75ba03d6';

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


getParams();

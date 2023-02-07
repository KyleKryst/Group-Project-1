var searchFormEl = document.querySelector('#search-form');

$(document).ready(function(){
  $("#emailModal").modal('show');
});

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

// Populate dropdown menu with all the available genres
const populateTVGenres = (genres) => {
  const select = document.getElementById('tv-genres')

  for (const genre of genres) {
      let option = document.createElement("option");
      option.value = genre.id;
      option.text = genre.name;
      select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedTVGenre = () => {
  const selectedGenre = document.getElementById('tv-genres').value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showTVBtns = () => {
  const btnDiv = document.getElementById('likeOrDislikeBtns');
  btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentShow = () => {
  const tvPosterDiv = document.getElementById('moviePoster');
  const tvTextDiv = document.getElementById('movieText');
  tvPosterDiv.innerHTML = '';
  tvTextDiv.innerHTML = '';
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeTVShow = () => {
  clearCurrentShow();
  showRandomTV();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeTVShow = () => {
  clearCurrentShow();
  showRandomTV();
};

// Create HTML for movie poster
const createTVPoster = (posterPath) => {
  const tvPosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', tvPosterUrl);
  posterImg.setAttribute('id', 'moviePoster');

  return posterImg;
};

// Create HTML for movie title
const createTVTitle = (title) => {
  const titleHeader = document.createElement('h2');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createTVOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Returns a random movie from the first page of movies
const getRandomTV = (tvShows) => {
  const randomIndex = Math.floor(Math.random() * tvShows.length);
  const randomShow = tvShows[randomIndex];
  return randomShow;
};

// Uses the DOM to create HTML to display the movie
const displayShow = (tvInfo) => {
  const tvTextDiv = document.getElementById('movieText');
  const tvPosterDiv = document.getElementById('moviePoster');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(tvInfo.poster_path);
  const titleHeader = createTVTitle(tvInfo.name);
  const overviewText = createMovieOverview(tvInfo.overview);

  // Append title, poster, and overview to page
  tvTextDiv.appendChild(titleHeader);
  tvTextDiv.appendChild(overviewText);
  tvPosterDiv.appendChild(moviePoster);

  showBtns();
  likeBtn.onclick = likeTVShow;
  dislikeBtn.onclick = dislikeTVShow;
};
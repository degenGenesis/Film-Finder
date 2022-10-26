const tmdbKey = 'YOUR_API_KEY';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const movieBtn = document.getElementById('movieBtn');
const tvBtn = document.getElementById('tvBtn');

/* movies */
const getMovieGenres = async () => {
  
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieGenres = jsonResponse.genres;
      // console.log(genres);
      return movieGenres;
    }
  } catch(error) {
    console.log(error)
  }
};

const getTVGenres = async () => {
    
    const genreRequestEndpoint = '/genre/tv/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        const tvGenres = jsonResponse.genres;
        console.log(tvGenres);
        return tvGenres;
      }
    } catch(error) {
      console.log(error)
    }
};

const getMovies = async () => {
  
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;   
      return movies;      
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.querySelector('.movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  
  displayMovie(info);
};

/* TV */
const getTV = async () => {
    
    const selectedGenre = getSelectedTVGenre();
    const discoverTVEndpoint = '/discover/tv';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = tmdbBaseUrl + discoverTVEndpoint + requestParams;
  
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        const tv = jsonResponse.results;
        console.log(jsonResponse);   
        return tv;      
      }
    } catch (error) {
      console.log(error);
    }
};

getTV();

const getTVInfo = async (tv) => {
  const tvId = tv.id;
  console.log(tvId);
  const tvEndpoint = `/tv/${tvId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${tvEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const tvInfo = jsonResponse;
      console.log(jsonResponse);
      return tvInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

const showRandomTV = async () => {
  const movieInfo = document.querySelector('.movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const tv = await getTV();
  const randomTV = getRandomTV(tv);
  const info = await getTVInfo(randomTV);
  
  displayShow(info);
};

getMovieGenres().then(populateMovieGenres);
getTVGenres().then(populateTVGenres);
movieBtn.onclick = showRandomMovie;
tvBtn.onclick = showRandomTV;
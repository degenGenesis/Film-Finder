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
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById('tv-genres').value;
  return selectedGenre;
};
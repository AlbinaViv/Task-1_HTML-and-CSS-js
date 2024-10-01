const LS_KEY = "feedback-form-state";

const movies = JSON.parse(localStorage.getItem(LS_KEY)) || [
  {
    name: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "Christopher Nolan",
    description:
      "A skilled thief, the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state.",
  },
  {
    name: "The Matrix",
    genre: "Action",
    releaseYear: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    name: "The Godfather",
    genre: "Crime",
    releaseYear: 1972,
    director: "Francis Ford Coppola",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
];

function displayMovies(movies) {
  const movieContainer = document.getElementById("movie-container");

  movies.forEach(({ name, genre, director, description, releaseYear }) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-wrapper");

    movieDiv.innerHTML = `<h2>${name} (${releaseYear})</h2> <p><span>Genre:</span> ${genre}</p><p><span>Director:</span> ${director}</p><p>${description}</p>`;

    movieContainer.appendChild(movieDiv);
  });
}
displayMovies(movies);

const formEl = document.getElementById("movie-form");

if (localStorage.getItem(LS_KEY)) {
  const savedMovie = JSON.parse(localStorage.getItem(LS_KEY));

  formEl.elements.name.value = savedMovie.name || "";
  formEl.elements.genre.value = savedMovie.genre || "";
  formEl.elements.releaseYear.value = savedMovie.releaseYear || "";
  formEl.elements.director.value = savedMovie.director || "";
  formEl.elements.description.value = savedMovie.description || "";
}

formEl.addEventListener("submit", hendleSubmit);

function hendleSubmit(e) {
  e.preventDefault();

  const name = formEl.elements.name.value.trim();
  const genre = formEl.elements.genre.value.trim();
  const releaseYear = formEl.elements.releaseYear.value.trim();
  const director = formEl.elements.director.value.trim();
  const description = formEl.elements.description.value.trim();

  if (!name || !genre || !releaseYear || !director || !description) {
    return alert("Please, all fiels must be filled in!");
  }

  const isDuplicate = movies.some(
    (movie) => movie.name === name && movie.releaseYear === releaseYear
  );

  if (isDuplicate) {
    return alert("This movie already exists in the list!");
  }

  const newMovie = {
    name,
    genre,
    releaseYear,
    director,
    description,
  };

  movies.push(newMovie);

  displayMovies(movies);

  localStorage.setItem(LS_KEY, JSON.stringify(movies));

  formEl.reset();
}

// formEl.addEventListener("input", handleInput);

// function handleInput(e) {
//   const movieData = {
//     name: formEl.elements.name.value,
//     genre: formEl.elements.genre.value,
//     releaseYear: formEl.elements.releaseYear.value,
//     director: formEl.elements.director.value,
//     description: formEl.elements.description.value,
//   };
//   localStorage.setItem(LS_INPUT_KEY, JSON.stringify(movieData));
// }
// JSON.parse(localStorage.getItem(RRE));

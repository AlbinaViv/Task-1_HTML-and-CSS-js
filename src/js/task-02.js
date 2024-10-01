const movies = [
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

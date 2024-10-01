const LS_KEY = "feedback-form-state";

const movies = JSON.parse(localStorage.getItem(LS_KEY)) || [
  {
    name: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "Christopher Nolan",
    description:
      "A skilled thief steals valuable secrets from deep within the subconscious during the dream state.",
  },
  {
    name: "The Matrix",
    genre: "Action",
    releaseYear: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    description:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    name: "The Godfather",
    genre: "Crime",
    releaseYear: 1972,
    director: "Francis Ford Coppola",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his son.",
  },
  {
    name: "Interstellar",
    genre: "Sci-Fi",
    releaseYear: 2014,
    director: "Christopher Nolan",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

function displayMovies(filteredMovies) {
  const movieContainer = document.getElementById("movie-container");
  console.log(filteredMovies);

  if (filteredMovies.length === 0) {
    movieContainer.innerHTML = "<p>No movies found for this filter.</p>";
    return;
  }

  filteredMovies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
      <h2>${movie.name} (${movie.releaseYear})</h2>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p>${movie.description}</p>
    `;

    movieContainer.appendChild(movieDiv);
  });
}
populateDropdown();

function filterMoviesByYear(year, moviesList) {
  if (!year) {
    return moviesList; // Если год не выбран, возвращаем все фильмы
  }
  return moviesList.filter((movie) => movie.releaseYear === parseInt(year, 10));
}

function filterMoviesByName(name, moviesList) {
  if (!name) {
    return moviesList; // Если имя не введено, возвращаем все фильмы
  }
  return moviesList.filter((movie) =>
    movie.name.toLowerCase().includes(name.toLowerCase())
  );
}

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
    return alert("Please, all fields must be filled in!");
  }

  const isDuplicate = movies.some(
    (movie) =>
      movie.name === name && movie.releaseYear === parseInt(releaseYear, 10)
  );

  if (isDuplicate) {
    return alert("This movie already exists in the list!");
  }

  const newMovie = {
    name,
    genre,
    releaseYear: parseInt(releaseYear, 10), // Перетворюємо рік у число
    director,
    description,
  };

  // Додаємо новий фільм у масив
  movies.push(newMovie);

  // Оновлюємо localStorage
  localStorage.setItem(LS_KEY, JSON.stringify(movies));

  // Оновлюємо відображення фільмів
  displayMovies(movies);
  // Очищуємо форму
  formEl.reset();
}

function applyFilters() {
  const inputName = document.getElementById("nameInput").value;
  const selectedYear = document.getElementById("yearDropdown").value;

  // Сначала фильтруем по имени
  let filteredMovies = filterMoviesByName(inputName, movies);
  // Затем фильтруем по году
  filteredMovies = filterMoviesByYear(selectedYear, filteredMovies);

  // Отображаем отфильтрованные фильмы
  displayMovies(filteredMovies);
}

function populateDropdown() {
  const years = [...new Set(movies.map((movie) => movie.releaseYear))]; // Получаем уникальные года
  const dropdown = document.getElementById("yearDropdown");

  years.sort().forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    dropdown.appendChild(option);
  });
}

document.getElementById("nameInput").addEventListener("input", applyFilters);
document
  .getElementById("yearDropdown")
  .addEventListener("change", applyFilters);

// Заполняем выпадающий список и отображаем все фильмы по умолчанию
populateDropdown();
displayMovies(movies);

const apiKey = 'cb98e4c59f19389bf43f8ea1c130318c';
let offset = 0;
let itemWidth;
let totalWidth;

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    searchMovies(query);
});

function searchMovies(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=es-ES`)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        const moviePoster = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/200x300?text=Sin+imagen';

        movieCard.innerHTML = `
            <img src="${moviePoster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Lanzamiento: ${movie.release_date || 'N/A'}</p>
        `;

        movieResults.appendChild(movieCard);
    });
}

function searchMovies(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        const moviePoster = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/200x300?text=Sin+imagen';

        movieCard.innerHTML = `
            <img src="${moviePoster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Lanzamiento: ${movie.release_date || 'N/A'}</p>
        `;

        movieCard.addEventListener('click', () => {
            getMovieDetails(movie.id);
        });

        movieResults.appendChild(movieCard);
    });
}

function getMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`)
    .then(response => response.json())
    .then(movie => showMovieDetails(movie))
    .catch(error => console.error('Error al obtener detalles:', error));
}


function showMovieDetails(movie) {
    const movieDetails = `
        <div class="movie-details">
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p><strong>Sinopsis:</strong> ${movie.overview || 'Sin información disponible'}</p>
            <p><strong>Puntuación:</strong> ${movie.vote_average}/10</p>
            <p><strong>Lanzamiento:</strong> ${movie.release_date || 'N/A'}</p>
            <button id="closeDetails">Cerrar</button>
        </div>
    `;
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = movieDetails;

    document.getElementById('closeDetails').addEventListener('click', () => {
        searchMovies(document.getElementById('searchInput').value);
    });
}


function getPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`)
    .then(response => response.json())
    .then(data => displayPopularMovies(data.results))
    .catch(error => console.error('Error:', error));
}

function displayPopularMovies(movies) {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('carousel-item');
        
        const moviePoster = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/200x300?text=Sin+imagen';

        movieCard.innerHTML = `
            <img src="${moviePoster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        carousel.appendChild(movieCard);
    });

    itemWidth = document.querySelector('.carousel-item').offsetWidth;
    totalWidth = document.querySelectorAll('.carousel-item').length * itemWidth;

    startCarousel();
}

function startCarousel() {
    const carousel = document.getElementById('carousel');
    setInterval(() => {
        offset += itemWidth;
        if (offset >= totalWidth) {
            offset = 0;
        }
        carousel.style.transform = `translateX(-${offset}px)`;
    }, 3000);
}

document.getElementById('prev').addEventListener('click', () => {
    offset -= itemWidth;
    if (offset < 0) {
        offset = totalWidth - itemWidth;
    }
    document.getElementById('carousel').style.transform = `translateX(-${offset}px)`;
});

document.getElementById('next').addEventListener('click', () => {
    offset += itemWidth;
    if (offset >= totalWidth) {
        offset = 0;
    }
    document.getElementById('carousel').style.transform = `translateX(-${offset}px)`;
});

getPopularMovies();




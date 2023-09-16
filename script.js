const searchBtn = document.querySelector(".btn");
const getKeyFromInput = document.querySelector("#search");
const searchbtn = document.querySelector("#searchbtn");
const error = document.querySelector(".error");
const loader = document.querySelector(".loading");
const cards = document.querySelector(".cards");

const fetchData = async (key, searchMovie) => {
  cards.innerHTML = "";
  loader.innerHTML = '<span class="loader"></span>';

  const data = await fetch(
    `https://www.omdbapi.com/?s=${searchMovie}&apikey=${key}`
  ).then((value) => value.json());

  loader.innerHTML = "";
  console.log("Res", data);

  if (data.Response !== "False") {
    renderMovie(data);
  } else {
    error.innerHTML = "<h1> API_KEY is not Valid</h1>";
  }
};

const getKey = () => {
  const key = getKeyFromInput.value;
  const searchMovie = searchbtn.value;
  if (key && searchMovie) {
    error.innerHTML = "";
    fetchData(key, searchMovie);
  } else {
    error.innerHTML =
      "<h1> API_KEY and Valid Movie Name both are required</h1>";
  }
};

const renderMovie = (response) => {
  cards.innerHTML = "";
  const { Search } = response;
  let number = 0;

  Search.map((value) => {
    if (value.Poster !== "N/A") {
      return (cards.innerHTML += `
        <div class="card"  id=${value.imdbID}>
        <div class="img">
          <img src="${value.Poster}" alt="" srcset="" />
        </div>
        <p class="movie_name">${value.Title.substring(0, 16)}</p>
        <p id="number">${(number += 1)}</p>
            </div>
        `);
    }
  });
};

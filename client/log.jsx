const helper = require("./helper.js");
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require("react-dom/client");

// LOG SECTION
const MediaList = (props) => {
  const [media, setMedia] = useState([props.media]);

  const loadMediaFromServer = async () => {
    const response = await fetch("/getMedia");
    const data = await response.json();
    setMedia(data.media);
  };

  useEffect(() => {
    loadMediaFromServer();
  }, [props.reloadMedia]);

  const movies = media.map((piece) => piece.format === "movie");
  const shows = media.map((piece) => piece.format === "show");
  const books = media.map((piece) => piece.format === "book");

  const RatingSpan = (rating) => {
    if (isPremium) {
      if (rating === 5) {
        return (
          <span>
            <i id="star1" class="fa-solid fa-star"></i>
            <i id="star2" class="fa-solid fa-star"></i>
            <i id="star3" class="fa-solid fa-star"></i>
            <i id="star4" class="fa-solid fa-star"></i>
            <i id="star5" class="fa-solid fa-star"></i>
          </span>
        );
      } else if (rating === 4) {
        return (
          <span>
            <i id="star1" class="fa-solid fa-star"></i>
            <i id="star2" class="fa-solid fa-star"></i>
            <i id="star3" class="fa-solid fa-star"></i>
            <i id="star4" class="fa-solid fa-star"></i>
            <i id="star5" class="fa-regular fa-star"></i>
          </span>
        );
      } else if (rating === 3) {
        return (
          <span>
            <i id="star1" class="fa-solid fa-star"></i>
            <i id="star2" class="fa-solid fa-star"></i>
            <i id="star3" class="fa-solid fa-star"></i>
            <i id="star4" class="fa-regular fa-star"></i>
            <i id="star5" class="fa-regular fa-star"></i>
          </span>
        );
      } else if (rating === 2) {
        return (
          <span>
            <i id="star1" class="fa-solid fa-star"></i>
            <i id="star2" class="fa-solid fa-star"></i>
            <i id="star3" class="fa-regular fa-star"></i>
            <i id="star4" class="fa-regular fa-star"></i>
            <i id="star5" class="fa-regular fa-star"></i>
          </span>
        );
      } else if (rating === 1) {
        return (
          <span>
            <i id="star1" class="fa-solid fa-star"></i>
            <i id="star2" class="fa-regular fa-star"></i>
            <i id="star3" class="fa-regular fa-star"></i>
            <i id="star4" class="fa-regular fa-star"></i>
            <i id="star5" class="fa-regular fa-star"></i>
          </span>
        );
      } else {
        return (
          <span>
            <i id="star1" class="fa-regular fa-star"></i>
            <i id="star2" class="fa-regular fa-star"></i>
            <i id="star3" class="fa-regular fa-star"></i>
            <i id="star4" class="fa-regular fa-star"></i>
            <i id="star5" class="fa-regular fa-star"></i>
          </span>
        );
      }
    }
    return;
  };

  const ReturnMovies = () => {
    if (movies.length === 0) {
      return <h3 className="emptyMovies">No Movies Yet!</h3>;
    }

    const movieNodes = movies.map((movie) => {
      return (
        <div key={movie.id} className="movie">
          <h3 className="title">{movie.title}</h3>
          <p className="movieFormat">Movie</p>
          <p className="favoriteCharacters">
            Favorite Characters: {movie.favoriteCharacters}
          </p>
          <p className="comments">Comments: {movie.comments}</p>
          <RatingSpan rating={movie.rating} />
        </div>
      );
    });

    return movieNodes;
  };

  const ReturnShows = () => {
    if (shows.length === 0) {
      return <h3 className="emptyShows">No TV Series Yet!</h3>;
    }

    const showNodes = shows.map((show) => {
      return (
        <div key={show.id} className="show">
          <h3 className="title">{show.title}</h3>
          <p className="showFormat">TV Series</p>
          <p className="favoriteCharacters">
            Favorite Characters: {show.favoriteCharacters}
          </p>
          <p className="comments">Comments: {show.comments}</p>
          <RatingSpan rating={show.rating} />
        </div>
      );
    });

    return showNodes;
  };

  const ReturnBooks = () => {
    if (books.length === 0) {
      return <h3 className="emptyBooks">No Books Yet!</h3>;
    }

    const bookNodes = books.map((book) => {
      return (
        <div key={book.id} className="book">
          <h3 className="title">{book.title}</h3>
          <p className="bookFormat">Book</p>
          <p className="favoriteCharacters">
            Favorite Characters: {book.favoriteCharacters}
          </p>
          <p className="comments">Comments: {book.comments}</p>
          <RatingSpan rating={book.rating} />
        </div>
      );
    });

    return bookNodes;
  };

  // adaptable rendering from https://react.dev/learn/passing-props-to-a-component
  return (
    <div className="mediaLog">
      <div id="moviesList">
        <h2 className="logHeading">Movies</h2>
        <div className="moviesLog">
          <ReturnMovies />
        </div>
      </div>
      <div id="showsList">
        <h2 className="logHeading">TV Series</h2>
        <div className="showsLog">
          <ReturnShows />
        </div>
      </div>
      <div id="booksList">
        <h2 className="logHeading">Books</h2>
        <div className="booksLog">
          <ReturnBooks />
        </div>
      </div>
    </div>
  );
};

// MAKER SECTION
const handleMedia = (e, onMediaAdded) => {
  e.preventDefault();
  helper.hideError();

  const title = e.target.querySelector("#mediaTitle").value;
  const format = e.target.querySelector("#mediaFormat").value;
  const favoriteCharacters = e.target.querySelector("#mediaCharacters").value;
  const comments = e.target.querySelector("#mediaComments");

  if (!title || !format) {
    helper.handleError("Title and format are required!");
    return false;
  }

  helper.sendPost(
    e.target.action,
    { title, format, favoriteCharacters, comments },
    onMediaAdded
  );
  return false;
};

const RatingSpan = (props) => {
  if (isPremium) {
    return (
      <span class="setRating">
        <i
          id="star1"
          class="fa-regular fa-star"
          onClick={(e) => RateMedia(1)}
        ></i>
        <i
          id="star2"
          class="fa-regular fa-star"
          onClick={(e) => RateMedia(2)}
        ></i>
        <i
          id="star3"
          class="fa-regular fa-star"
          onClick={(e) => RateMedia(3)}
        ></i>
        <i
          id="star4"
          class="fa-regular fa-star"
          onClick={(e) => RateMedia(4)}
        ></i>
        <i
          id="star5"
          class="fa-regular fa-star"
          onClick={(e) => RateMedia(5)}
        ></i>
      </span>
    );
  }
  return;
};

const RateMedia = (rating) => {
  if (rating > 0) {
    document.querySelector("#star1").classList.remove("fa-regular");
    document.querySelector("#star1").classList.add("fa-solid");
  }
  if (rating > 1) {
    document.querySelector("#star2").classList.remove("fa-regular");
    document.querySelector("#star2").classList.add("fa-solid");
  }
  if (rating > 2) {
    document.querySelector("#star3").classList.remove("fa-regular");
    document.querySelector("#star3").classList.add("fa-solid");
  }
  if (rating > 3) {
    document.querySelector("#star4").classList.remove("fa-regular");
    document.querySelector("#star4").classList.add("fa-solid");
  }
  if (rating > 4) {
    document.querySelector("#star5").classList.remove("fa-regular");
    document.querySelector("#star5").classList.add("fa-solid");
  }
};

const MediaForm = (props) => {
  return (
    <form
      id="mediaForm"
      onSubmit={(e) => handleMedia(e, props.triggerReload)}
      name="mediaForm"
      action="/maker"
      method="POST"
      className="mediaForm"
    >
      <label htmlFor="title">Title: </label>
      <input
        id="mediaTitle"
        type="text"
        name="title"
        placeholder="Media Title"
      />
      <label htmlFor="format">Format: </label>
      <select id="mediaFormat" name="format">
        <option></option>
        <option value="movie">Movie</option>
        <option value="show">TV Series</option>
        <option value="book">Book</option>
      </select>
      <label htmlFor="characters">Favorite Characters: </label>
      <input
        id="mediaCharacters"
        type="text"
        name="characters"
        placeholder="Favorite Characters"
      />
      <label htmlFor="comments">Comments: </label>
      <input
        id="mediaComments"
        type="text"
        name="comments"
        placeholder="Comments"
      />
      <RatingSpan />
      <input className="makeMediaSubmit" type="submit" value="Add Media" />
    </form>
  );
};

const App = () => {
  const [reloadMedia, setReloadMedia] = useState(false);

  if (document.getElementById("app").dataset.page === "maker") {
    return (
      <div>
        <div id="makeMedia">
          <MediaForm triggerReload={() => setReloadMedia(!reloadMedia)} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div id="showLog">
        <MediaList media={[]} reloadMedia={reloadMedia} />;
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
};

window.onload = init;

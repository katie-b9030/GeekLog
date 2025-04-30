const helper = require("./helper.js");
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require("react-dom/client");

// LOG SECTION
const MediaList = (props) => {
  const [media, setMedia] = useState([]);

  const loadMediaFromServer = async () => {
    const response = await fetch("/getMedia");
    const data = await response.json();
    setMedia(data.media);
  };

  useEffect(() => {
    loadMediaFromServer();
  }, [props.reloadMedia]);

  const movies = media.filter((piece) => piece.format === "movie");
  const shows = media.filter((piece) => piece.format === "show");
  const books = media.filter((piece) => piece.format === "book");

  const RatingSpan = (props) => {
    if (props.isPremium) {
      return (
        <span class="rating">
          <i
            class={
              1 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
          <i
            class={
              2 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
          <i
            class={
              3 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
          <i
            class={
              4 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
          <i
            class={
              5 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        </span>
      );
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
          <i class="fa-solid fa-film format movie-format"></i>
          <div class="content">
            <div class="mediaHead">
              <h3 className="title">{movie.title}</h3>
              <RatingSpan rating={movie.rating} isPremium={props.isPremium} />
            </div>
            <p className="favoriteCharacters">
              Favorite Characters: {movie.favoriteCharacters}
            </p>
            <p className="comments">Comments: {movie.comments}</p>
          </div>
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
          <i class="fa-solid fa-tv format show-format"></i>
          <div class="content">
            <div class="mediaHead">
              <h3 className="title">{show.title}</h3>
              <RatingSpan rating={show.rating} isPremium={props.isPremium} />
            </div>
            <p className="favoriteCharacters">
              Favorite Characters: {show.favoriteCharacters}
            </p>
            <p className="comments">Comments: {show.comments}</p>
          </div>
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
          <i class="fa-solid fa-book format book-format"></i>
          <div class="content">
            <div class="mediaHead">
              <h3 className="title">{book.title}</h3>
              <RatingSpan rating={book.rating} isPremium={props.isPremium} />
            </div>
            <p className="favoriteCharacters">
              Favorite Characters: {book.favoriteCharacters}
            </p>
            <p className="comments">Comments: {book.comments}</p>
          </div>
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
const handleMedia = (e, onMediaAdded, mediaRating) => {
  e.preventDefault();
  helper.hideError();

  const title = e.target.querySelector("#mediaTitle").value;
  const format = e.target.querySelector("#mediaFormat").value;
  const favoriteCharacters = e.target.querySelector("#mediaCharacters").value;
  const comments = e.target.querySelector("#mediaComments").value;
  const rating = mediaRating;

  if (!title || !format) {
    helper.handleError("Title and format are required!");
    return false;
  }

  helper.handleSubmission();

  helper.sendPost(
    e.target.action,
    { title, format, favoriteCharacters, comments, rating },
    onMediaAdded
  );

  return false;
};

const RatingSelect = (props) => {
  if (props.isPremium) {
    return (
      <span class="setRating">
        <i
          class={1 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          onClick={(e) => {
            props.setRating(1);
          }}
        ></i>
        <i
          class={2 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          onClick={(e) => {
            props.setRating(2);
          }}
        ></i>
        <i
          class={3 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          onClick={(e) => {
            props.setRating(3);
          }}
        ></i>
        <i
          class={4 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          onClick={(e) => {
            props.setRating(4);
          }}
        ></i>
        <i
          class={5 <= props.rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          onClick={(e) => {
            props.setRating(5);
          }}
        ></i>
      </span>
    );
  }
  return;
};

const MediaForm = (props) => {
  const [mediaRating, setMediaRating] = useState(0);

  return (
    <form
      id="mediaForm"
      onSubmit={(e) => handleMedia(e, props.triggerReload, mediaRating)}
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
      <RatingSelect
        isPremium={props.isPremium}
        rating={mediaRating}
        setRating={setMediaRating}
      />
      <input className="makeMediaSubmit" type="submit" value="Create Media" />
    </form>
  );
};

const App = () => {
  const [reloadMedia, setReloadMedia] = useState(false);
  // used ChatGPT to assist with Premium dynamic changing logic
  const [isPremium, setIsPremium] = useState(
    document.querySelector("#premium")?.classList.contains("prem") || false
  );

  useEffect(() => {
    const premButton = document.querySelector("#premium");
    const togglePremium = () => {
      setIsPremium((prev) => {
        newStatus = !prev;
        if (newStatus) {
          premButton.classList.remove("notPrem");
          premButton.classList.add("prem");
          premButton.innerHTML =
            "End Subscription <i class='fa-solid fa-xmark'></i>";
        } else {
          premButton.classList.remove("prem");
          premButton.classList.add("notPrem");
          premButton.innerHTML = "Go Premium <i class='fa-solid fa-crown'></i>";
        }
        return newStatus;
      });
    };

    premButton.addEventListener("click", togglePremium);
    return () => premButton.removeEventListener("click", togglePremium);
  }, []);

  if (document.getElementById("app").dataset.page === "maker") {
    return (
      <div>
        <div id="makeMedia">
          <MediaForm
            isPremium={isPremium}
            triggerReload={() => setReloadMedia(!reloadMedia)}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div id="showLog">
        <MediaList isPremium={isPremium} media={[]} reloadMedia={reloadMedia} />
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
};

window.onload = init;

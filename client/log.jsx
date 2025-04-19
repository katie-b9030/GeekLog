const helper = require("./helper.js");
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require("react-dom/client");

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

const App = () => {
  const [reloadMedia, setReloadMedia] = useState(false);

  return <MediaList media={[]} reloadMedia={reloadMedia} />;
};

const init = () => {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
};

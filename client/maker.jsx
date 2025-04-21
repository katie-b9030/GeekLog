const helper = require("./helper.js");
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require("react-dom/client");

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
      <input className="makeDomoSubmit" type="submit" value="Add Media" />
    </form>
  );
};

const App = () => {
  const [reloadMedia, setReloadMedia] = useState(false);

  return (
    <div>
      <div id="makeMedia">
        <MediaForm triggerReload={() => setReloadMedia(!reloadMedia)} />
      </div>
    </div>
  );
};

const init = () => {
  console.log("Loading React App...");
  console.log("app div:", document.getElementById("app"));

  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
};

window.onload = init;

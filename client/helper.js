/* Takes in an error message. Sets the error message up in html, and
   displays it to the user. Will be hidden by other events that could
   end in an error.
*/
const handleError = (message) => {
  document.getElementById("error").textContent = message;
  document.getElementById("errorMessage").classList.remove("hidden");
  document.getElementById("success").textContent = "";
  document.getElementById("successMessage").classList.add("hidden");
};

const handleSubmission = () => {
  document.getElementById("success").textContent =
    "Media Created Successfully!";
  document.getElementById("successMessage").classList.remove("hidden");
  document.getElementById("error").textContent = "";
  document.getElementById("errorMessage").classList.add("hidden");
};

/* const handleUpdate = () => {
  document.getElementById("success").textContent =
    "Media Updated Successfully!";
  document.getElementById("successMessage").classList.remove("hidden");
  document.getElementById("error").textContent = "";
  document.getElementById("errorMessage").classList.add("hidden");
} */

/* Sends post requests to the server using fetch. Will look for various
   entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById("errorMessage").classList.add("hidden");

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

const hideError = () => {
  document.getElementById("errorMessage").classList.add("hidden");
};

module.exports = {
  handleError,
  handleSubmission,
  sendPost,
  hideError,
};

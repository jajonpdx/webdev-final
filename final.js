function init() {
  const form = document.getElementById("form-element");
  if (!form) {
    return;
  }

  form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  form.classList.add("hidden");

  const messageContainer = createThankYouMessage();
  form.parentNode.appendChild(messageContainer);
}

function createThankYouMessage() {
  const container = document.createElement("div");
  container.id = "thanks-container";
  container.className =
    "fw-bold card p-3 bg-light col-md-6 mx-auto text-center";

  const message = document.createElement("h3");
  message.textContent = "Thanks for submitting!";
  message.className = "fw-bold";

  const button = document.createElement("button");
  button.textContent = "Submit another?";
  button.className = "btn btn-outline-primary mt-2";
  button.addEventListener("click", handleSubmitAnother);

  container.appendChild(message);
  container.appendChild(button);

  return container;
}

function handleSubmitAnother() {
  const container = document.getElementById("thanks-container");
  const form = document.getElementById("form-element");

  if (container) {
    container.remove();
  }

  if (form) {
    form.reset();
    form.classList.remove("hidden");
  }
}

(function () {
  document.addEventListener("DOMContentLoaded", init);
})();

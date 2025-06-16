(function () {
  document.addEventListener("DOMContentLoaded", init);
})();

function init() {
  initBigPictureModal();

  const form = document.getElementById("form-element");

  const submitButton = form.querySelector('input[type="submit"]');
  const requiredFields = [
    document.getElementById("fullname"),
    document.getElementById("email"),
    document.getElementById("message"),
  ];

  submitButton.disabled = true;
  submitButton.classList.remove("disabled");

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      validateForm(requiredFields, submitButton);
    });
  });

  form.addEventListener("submit", handleFormSubmit);
}

function initBigPictureModal() {
  const modal = document.getElementById("big-picture");
  const modalImg = modal.querySelector("img");

  modal.addEventListener("show.bs.modal", function (e) {
    const triggerCard = e.relatedTarget;
    const clickedImg = triggerCard.querySelector("img");

    modalImg.src = clickedImg.getAttribute("src");
    modalImg.alt = clickedImg.getAttribute("alt");
  });
}

function validateForm(fields, submitButton) {
  const allFilled = fields.every((field) => {
    return field.value.trim() !== "";
  });
  submitButton.disabled = !allFilled;
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

    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
  }
}

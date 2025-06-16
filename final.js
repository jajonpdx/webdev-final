// Initialize the page once the DOM has fully loaded
(function () {
  document.addEventListener("DOMContentLoaded", init);
})();

// Main initializer function for the entire page
function init() {
  // Set up modal image swap behavior
  initBigPictureModal();

  // Set up form submit and validation handling
  const form = document.getElementById("form-element");

  const submitButton = form.querySelector('input[type="submit"]');
  const requiredFields = [
    document.getElementById("fullname"),
    document.getElementById("email"),
    document.getElementById("message"),
  ];

  // Disable submit button initially
  submitButton.disabled = true;
  submitButton.classList.remove("disabled");

  // Listen for changes on required fields and validate form
  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      validateForm(requiredFields, submitButton);
    });
  });

  // Intercept form submission to show thank you message instead
  form.addEventListener("submit", handleFormSubmit);
}

// Set up modal behavior to dynamically show the image clicked on
function initBigPictureModal() {
  const modal = document.getElementById("big-picture");
  const modalImg = modal.querySelector("img");

  modal.addEventListener("show.bs.modal", function (e) {
    const triggerCard = e.relatedTarget;
    const clickedImg = triggerCard.querySelector("img");

    // Use the src and alt of the clicked image in the modal
    modalImg.src = clickedImg.getAttribute("src");
    modalImg.alt = clickedImg.getAttribute("alt");
  });
}

// Check that all required fields are filled before enabling submit
function validateForm(fields, submitButton) {
  const allFilled = fields.every((field) => {
    return field.value.trim() !== "";
  });

  // Enable or disable submit button based on validation result
  submitButton.disabled = !allFilled;
}

// Handle submission of the contact form
function handleFormSubmit(e) {
  // Prevent actual form submission
  e.preventDefault();

  // Hide form after submission
  const form = e.target;
  form.classList.add("hidden");

  // Create thank you message element
  const messageContainer = createThankYouMessage();
  form.parentNode.appendChild(messageContainer);
}

// Create a thank you mesage container with a reset button
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

  // Add reset behavior
  button.addEventListener("click", handleSubmitAnother);

  container.appendChild(message);
  container.appendChild(button);

  return container;
}

// Handle "submit another" button click - reset form and show it again
function handleSubmitAnother() {
  const container = document.getElementById("thanks-container");
  const form = document.getElementById("form-element");

  if (container) {
    container.remove();
  }

  if (form) {
    // Clear previous form data and show form again
    form.reset();
    form.classList.remove("hidden");

    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
  }
}

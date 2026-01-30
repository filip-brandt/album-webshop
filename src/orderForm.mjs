// regex patterns for form validation
const firstNameRegEx =
  /^(?:[\p{L}]{1,3}\. )?(?!.*--)(?=.*[\p{L}].*[\p{L}])[\p{L}]+(?:[ -][\p{L}]+)*$/iu;
const lastNameRegEx =
  /^(?:[\p{L}]{1,3}\. )?(?!.*--)(?=.*[\p{L}].*[\p{L}])[\p{L}]+(?:[ -][\p{L}]+)*$/iu;
const streetRegEx = /^[a-zA-ZåäöÅÄÖ0-9\s-]{3,}$/;
const postcodeRegEx = /^\d{3}\s?\d{2}$/;
const cityRegEx = /^[a-zA-ZåäöÅÄÖ\s-]{2,}$/;
const phoneRegEx = /^0\d{9}$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ssnRegEx = /^\d{6}-?\d{4}$/;

// input field variables -------------------------------------------------------
const orderForm = document.querySelector("#orderForm");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const streetField = document.querySelector("#street");
const postCodeField = document.querySelector("#postCode");
const cityField = document.querySelector("#city");
const phoneField = document.querySelector("#phone");
const emailField = document.querySelector("#email");
const ssnField = document.querySelector("#ssn");
// payment method variables
const radioCard = document.querySelector('input[value="card"]');
const radioInvoice = document.querySelector('input[value="invoice"]');
const cardPaymentDiv = document.querySelector("#cardPayment");
const invoicePaymentDiv = document.querySelector("#invoicePayment");
// form checkbox variables
const gdprCheckbox = document.querySelector("#gdpr");
const newsletterCheckbox = document.querySelector("#newsletter");
// form buttons variables
const orderBtn = document.querySelector("#orderBtn");
const resetBtn = document.querySelector("#resetBtn");

// input field event listeners ------------------------------------------------
firstName.addEventListener("focusout", validateFirstNameField);
lastName.addEventListener("focusout", validateLastNameField);
streetField.addEventListener("focusout", validateStreetField);
postCodeField.addEventListener("focusout", validatePostCodeField);
cityField.addEventListener("focusout", validateCityField);
phoneField.addEventListener("focusout", validatePhoneField);
emailField.addEventListener("focusout", validateEmailField);
ssnField.addEventListener("focusout", validateSSNField);
// payment method event listeners
radioCard.addEventListener("change", togglePaymentFields);
radioInvoice.addEventListener("change", togglePaymentFields);
// form checkbox event listeners
gdprCheckbox.addEventListener("change", checkFormFieldsValidity);
// form buttons event listeners
resetBtn.addEventListener("click", resetOrder);

// form field validation functions ---------------------------------------------
function validateFirstNameField() {
  const inputFieldValue = firstName.value;

  let isValidFirstName;

  if (inputFieldValue.length === 0) {
    firstName.classList.remove("invalid");
    firstName.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidFirstName = firstNameRegEx.test(inputFieldValue);

  if (isValidFirstName) {
    firstName.nextElementSibling.classList.add("hidden");
    firstName.classList.remove("invalid");
  } else {
    firstName.nextElementSibling.classList.remove("hidden");
    firstName.classList.add("invalid");
  }

  return isValidFirstName;
}

function validateLastNameField() {
  const inputFieldValue = lastName.value;

  let isValidLastName;

  if (inputFieldValue.length === 0) {
    lastName.classList.remove("invalid");
    lastName.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidLastName = lastNameRegEx.test(inputFieldValue);

  if (isValidLastName) {
    lastName.nextElementSibling.classList.add("hidden");
    lastName.classList.remove("invalid");
  } else {
    lastName.nextElementSibling.classList.remove("hidden");
    lastName.classList.add("invalid");
  }

  return isValidLastName;
}

function validateStreetField() {
  const inputFieldValue = streetField.value;

  let isValidStreet;

  if (inputFieldValue.length === 0) {
    streetField.classList.remove("invalid");
    streetField.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidStreet = streetRegEx.test(inputFieldValue);

  if (isValidStreet) {
    streetField.nextElementSibling.classList.add("hidden");
    streetField.classList.remove("invalid");
  } else {
    streetField.nextElementSibling.classList.remove("hidden");
    streetField.classList.add("invalid");
  }

  return isValidStreet;
}

function validatePostCodeField() {
  const inputFieldValue = postCodeField.value;

  let isValidPostCode;

  if (inputFieldValue.length === 0) {
    postCodeField.classList.remove("invalid");
    postCodeField.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidPostCode = postcodeRegEx.test(inputFieldValue);

  if (isValidPostCode) {
    postCodeField.nextElementSibling.classList.add("hidden");
    postCodeField.classList.remove("invalid");
  } else {
    postCodeField.nextElementSibling.classList.remove("hidden");
    postCodeField.classList.add("invalid");
  }

  return isValidPostCode;
}

function validateCityField() {
  const inputFieldValue = cityField.value;

  let isValidCity;

  if (inputFieldValue.length === 0) {
    cityField.classList.remove("invalid");
    cityField.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidCity = cityRegEx.test(inputFieldValue);

  if (isValidCity) {
    cityField.nextElementSibling.classList.add("hidden");
    cityField.classList.remove("invalid");
  } else {
    cityField.nextElementSibling.classList.remove("hidden");
    cityField.classList.add("invalid");
  }

  return isValidCity;
}

function validatePhoneField() {
  const inputFieldValue = phoneField.value;

  let isValidPhone;

  if (inputFieldValue.length === 0) {
    phoneField.classList.remove("invalid");
    phoneField.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidPhone = phoneRegEx.test(inputFieldValue);

  if (isValidPhone) {
    phoneField.nextElementSibling.classList.add("hidden");
    phoneField.classList.remove("invalid");
  } else {
    phoneField.nextElementSibling.classList.remove("hidden");
    phoneField.classList.add("invalid");
  }

  return isValidPhone;
}

function validateEmailField() {
  const inputFieldValue = emailField.value;

  let isValidEmail;

  if (inputFieldValue.length === 0) {
    emailField.classList.remove("invalid");
    emailField.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidEmail = emailRegEx.test(inputFieldValue);

  if (isValidEmail) {
    emailField.nextElementSibling.classList.add("hidden");
    emailField.classList.remove("invalid");
  } else {
    emailField.nextElementSibling.classList.remove("hidden");
    emailField.classList.add("invalid");
  }

  return isValidEmail;
}

function validateSSNField() {
  const inputFieldValue = ssnField.value;

  if (invoicePaymentDiv.classList.contains("hidden")) {
    ssnField.classList.remove("invalid");
    ssnField.nextElementSibling.classList.add("hidden");
    return true;
  }

  let isValidSSN;

  if (inputFieldValue.length === 0) {
    ssnField.classList.remove("invalid");
    ssnField.nextElementSibling.classList.add("hidden");
    return;
  }

  isValidSSN = ssnRegEx.test(inputFieldValue);

  if (isValidSSN) {
    ssnField.nextElementSibling.classList.add("hidden");
    ssnField.classList.remove("invalid");
  } else {
    ssnField.nextElementSibling.classList.remove("hidden");
    ssnField.classList.add("invalid");
  }

  return isValidSSN;
}

// payment method toggle function ------------------------------------------------
function togglePaymentFields() {
  if (radioCard.checked) {
    invoicePaymentDiv.classList.add("hidden");
    cardPaymentDiv.classList.remove("hidden");
  } else if (radioInvoice.checked) {
    cardPaymentDiv.classList.add("hidden");
    invoicePaymentDiv.classList.remove("hidden");
  }
}

// order button enabling/disabling function ---------------------------------------
function checkFormFieldsValidity() {
  orderBtn.setAttribute("disabled", "");

  const firstNameValid = validateFirstNameField();
  const lastNameValid = validateLastNameField();
  const streetValid = validateStreetField();
  const postCodeValid = validatePostCodeField();
  const cityValid = validateCityField();
  const phoneValid = validatePhoneField();
  const emailValid = validateEmailField();
  const ssnValid = validateSSNField();

  if (!firstNameValid) {
    return;
  }
  if (!lastNameValid) {
    return;
  }
  if (!streetValid) {
    return;
  }
  if (!postCodeValid) {
    return;
  }
  if (!cityValid) {
    return;
  }
  if (!phoneValid) {
    return;
  }

  if (!emailValid) {
    return;
  }

  if (!ssnValid) {
    return;
  }

  if (!gdprCheckbox.checked) {
    return;
  }

  orderBtn.removeAttribute("disabled");
}

// order reset function -----------------------------------------------------------
function resetOrder() {
  orderForm.reset();

  const allFields = [
    firstName,
    lastName,
    streetField,
    postCodeField,
    cityField,
    phoneField,
    emailField,
    ssnField,
  ];

  allFields.forEach((field) => {
    field.classList.remove("invalid");
    field.nextElementSibling.classList.add("hidden");
  });

  radioCard.checked = true;
  togglePaymentFields();

  orderBtn.setAttribute("disabled", "");
}

// initialize form function -----------------------------------------------------
export function initForm() {
  orderForm.addEventListener("focusout", checkFormFieldsValidity);

  togglePaymentFields();
}

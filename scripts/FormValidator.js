export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._config.inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);
    hasInvalidInput ? this._disableSubmitButton() : this._enableSubmitButton();
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState();
    });

    this._formElement.addEventListener('reset', () => {
      this._inputList.forEach(inputElement => {
        this._hideInputError(inputElement);
      });
      this._disableSubmitButton();
    });

    this._setEventListeners();
    this._toggleButtonState();
  }
}
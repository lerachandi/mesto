
const validationConfig = {
  formSelector: '.popup__form', //форма для валидации
  inputSelector: '.popup__input', //поле для ввода
  submitButtonSelector: '.popup__save-button', //кнопка "Сохранить"
  inactiveButtonClass: 'popup__save-button_disabled', //Состоянеи disabled для кнопки "Сохранить"
  inputErrorClass: 'popup__border-error', //Красная строка под полем ввода
  errorClass: 'popup__input-error_visible' //Видимость ошибки
};


// Добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const formErrorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(config.inputErrorClass);
  formErrorElement.textContent = errorMessage;
  formErrorElement.classList.add(config.errorClass);
};

// Удаление класса с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const formErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  formErrorElement.classList.remove(config.errorClass);
  formErrorElement.textContent = '';
};

//Отображение сообщения об ошибках
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  };
};

//Функция для сброса ошибок после закрытия попапов
function resetInputError(input) {
  const inputList = input.querySelectorAll('.popup__input');
  inputList.forEach(inputElement => {
    hideInputError(input, inputElement, validationConfig);
  });
};

//Проверка валидности инпута
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

//Включение кнопки сохранения
const disableButton = (button, config) => {
  button.classList.add(config.inactiveButtonClass); 
  button.disabled = true;
};

//Отсключение кнопки сохранения
const enableButton = (button, config) => {
  button.classList.remove(config.inactiveButtonClass); 
  button.disabled = false;
};

//Переключение кнопки сохранения в зависимости от валидности
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } 
  else {
    enableButton(buttonElement, config);
  };
};

//Слушатели
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//Функция валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation(validationConfig);


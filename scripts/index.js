import Card from './Card.js';
import FormValidator from './FormValidator.js';

const validationConfig = {
  formSelector: '.popup__form', //форма для валидации
  inputSelector: '.popup__input', //поле для ввода
  submitButtonSelector: '.popup__save-button', //кнопка "Сохранить"
  inactiveButtonClass: 'popup__save-button_disabled', //Состоянеи disabled для кнопки "Сохранить"
  inputErrorClass: 'popup__border-error', //Красная строка под полем ввода
  errorClass: 'popup__input-error_visible' //Видимость ошибки
};
// Попапы
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupPlace = document.querySelector(".popup_add-mesto"); // попап добавления нового места
//Попап открытия фотокарточки
const cardPopupImage = document.querySelector(".popup_opened-image"); // попап открытия карточки
const modalImage = cardPopupImage.querySelector(".popup__image"); // попап открытия карточки места
// Профиль: элемент профиля и отображаемые имя с описанием
const profile = document.querySelector(".profile"); // элемент профиля
const profileDescription = profile.querySelector(".profile__description"); //отображаемое описание
const profileName = profile.querySelector(".profile__name"); //отображаемое имя
const editProfileButton = profile.querySelector(".profile__edit-button"); // кнопка редактирования профиля
//Профиль: форма
const profileFormElement = popupEditProfile.querySelector(".popup__form"); // форма: название, описание, кнопка
const nameInput = profileFormElement.querySelector(".popup__input_profile_edit-name"); // инпут имени
const descriptionInput = profileFormElement.querySelector(".popup__input_profile_edit-description"); // инпут описание
const profileSubmitButton = profileFormElement.querySelector('.popup__save-button');
//Место: для загрузки картинок
const cardsContainer = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#cards-template").content;
//Место: форма
const addFormElement = popupPlace.querySelector(".popup__form");
const cardNameInput = popupPlace.querySelector(".popup__input_mesto-name"); // инпут названия
const cardUrlInput = popupPlace.querySelector(".popup__input_mesto-url"); // инпут ссылки на изображение
const buttonAddPlace = document.querySelector(".profile__add-button"); // кнопка добавления места
const addSubmitButton = addFormElement.querySelector('.popup__save-button');
// Кнопка закрытия попапов (для всех) 
const closeButtons = document.querySelectorAll(".popup__close-button");
//Попап открытой карточки места
const modalTitle = cardPopupImage.querySelector(".popup__description");
//Все формы
const forms = document.querySelectorAll('.popup__form');

//Функция открытия изображения в полном размере
function handleOpenPopup(imageSrc, imageCaption) {
  modalImage.src = imageSrc;
  modalTitle.textContent = imageCaption; // Set the caption text
  openPopup(cardPopupImage);
}

//Функция создания новой карточки
function createNewCard(cardData) {
  const card = new Card(cardData, '#cards-template', handleOpenPopup);
  return card.createCard();
}

//считываем и передаем элементы из массива initialCards
initialCards.forEach((item) => {
  const cardElement = createNewCard(item);
  cardsContainer.append(cardElement);
});

//добавление карточки в начало списка
function renderCard(itemData) {
  const cardElement = createNewCard(itemData);
  cardsContainer.prepend(cardElement);
};

//Открытие попапа
function openPopup(evt) {
  evt.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc);

}

//Функция для закрытия попапов по клику на esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//Функция для закрытия попапов по клику на оверлей
function overlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

//Закрытие попапов
function closePopup(evt) {
  evt.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
};

//Попап добавления карточки
function openAddPopup() {
  openPopup(popupPlace);
  addFormElement.reset();
}
buttonAddPlace.addEventListener('click', openAddPopup);

// Редактирование профиля: обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получение значений полей descriptionInput и nameInput из свойства value:
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  // disableButton(profileSubmitButton, validationConfig); 
  closePopup(popupEditProfile); // попап закроется по клику на кнопку сохранения
};

//Отмена стандартной отправки формы для попапа добавления карточек
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: cardNameInput.value, link: cardUrlInput.value });
  addFormElement.reset();
  closePopup(popupPlace);
}


//Создание слушателей для кнопок закрытия
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//Слушатель для редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // resetFormErrors(popupEditProfile, profileFormElement, validationConfig);
  openPopup(popupEditProfile);
});

//Слушатели для закрытия попапов (оверлей)
popupEditProfile.addEventListener('mousedown', overlayClick);
popupPlace.addEventListener('mousedown', overlayClick);
cardPopupImage.addEventListener('mousedown', overlayClick);



forms.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();

  if (formElement.id === 'edit-form') {
    formElement.addEventListener('submit', handleProfileFormSubmit);
  } else if (formElement.id === 'add-form') {
    formElement.addEventListener('submit', handlePlaceFormSubmit);
  }
});


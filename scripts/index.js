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
const profileFormElement = popupEditProfile.querySelector("#edit-profile"); // форма: название, описание, кнопка
const nameInput = profileFormElement.querySelector(".popup__input_profile_edit-name"); // инпут имени
const descriptionInput = profileFormElement.querySelector(".popup__input_profile_edit-description"); // инпут описание

//Место: для загрузки картинок
const cardsContainer = document.querySelector(".cards");
//Место: форма
const addFormElement = popupPlace.querySelector("#add-place");
const cardNameInput = popupPlace.querySelector(".popup__input_mesto-name"); // инпут названия
const cardUrlInput = popupPlace.querySelector(".popup__input_mesto-url"); // инпут ссылки на изображение
const buttonAddPlace = document.querySelector(".profile__add-button"); // кнопка добавления места

// Кнопка закрытия попапов (для всех) 
const closeButtons = document.querySelectorAll(".popup__close-button");
//Попап открытой карточки места
const modalTitle = cardPopupImage.querySelector(".popup__description");
//Все формы
const forms = document.querySelectorAll('.popup__form');

//Функция открытия изображения в полном размере
function openImagePopup(imageSrc, imageCaption) {
  modalImage.src = imageSrc;
  modalTitle.textContent = imageCaption; 
  modalImage.alt = imageCaption;
  openPopup(cardPopupImage);
}

//Функция создания новой карточки
function createNewCard(cardData) {
  const card = new Card(cardData, '#cards-template', openImagePopup);
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
function openPopup(popup) {
  popup.classList.add("popup_opened");
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
function handleClosePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
};

//Попап добавления карточки
function openAddPopup() {
  openPopup(popupPlace);
  addFormElement.reset();
}


// Редактирование профиля: обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получение значений полей descriptionInput и nameInput из свойства value:
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
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


// Функция для обработки события нажатия на кнопку редактирования профиля
function handleEditProfileButtonClick() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

// Добавляем слушатель события на кнопку редактирования профиля
editProfileButton.addEventListener("click", handleEditProfileButtonClick);


//Слушатели для закрытия попапов (оверлей)
popupEditProfile.addEventListener('mousedown', handleClosePopupByOverlay);
popupPlace.addEventListener('mousedown', handleClosePopupByOverlay);
cardPopupImage.addEventListener('mousedown', handleClosePopupByOverlay);

buttonAddPlace.addEventListener('click', openAddPopup);



// Валидаторы для профиля и карточки
const profileValidator = new FormValidator(validationConfig, profileFormElement);
const cardValidator = new FormValidator(validationConfig, addFormElement);

// Включение валидации в формах
profileValidator.enableValidation();
cardValidator.enableValidation();

// Добавление обработчиков событий для отправки формы
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handlePlaceFormSubmit);
 



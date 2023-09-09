// Включаем строгий режим
'use strict'
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

//Создание карточек
function createCard(cardData) {
  // сначала копируем ноду с темплейтом
  // затем находим селекторы изображения, названием, удалением и лайка
  const card = cardsTemplate.cloneNode(true);
  const cardImage = card.querySelector(".cards__image");
  const cardName = card.querySelector(".cards__title");
  const cardDeleteButton = card.querySelector(".cards__delete");
  const cardLikeButton = card.querySelector(".cards__like");

  cardName.textContent = cardData.name; // подтягиваем название из initialCards
  cardImage.src = cardData.link; // подтягиваем ссылку из initialCards
  cardImage.alt = `Фотография ${cardData.name}`; // альтернативный текст

  // слушатель на клик по лайку, после клика класс должен меняться,
  // т.е. после клика лайк становится черным
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("cards__like_active");
  });

  // слушатель для клика по корзине
  cardDeleteButton.addEventListener("click", () => {
    const cardItem = cardDeleteButton.closest(".cards__item");
    cardItem.remove();
  });

  // слушатель для открытия попапа картинки
  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = `Фотография ${cardData.name}`;
    modalTitle.textContent = cardData.name;
    openPopup(cardPopupImage);
  });

  return card;
};

//добавление карточки в начало списка ё
function renderCard(item) {
  cardsContainer.prepend(createCard(item));
};

//считываем и передаем элементы из массива initialCards
function renderCardsArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    renderCard(arr[i]);
  }
};

//функция создания нового места из формы
function handleAddPlace(evt) {
  evt.preventDefault();
  const createCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  renderCard(createCard);
  disableButton(addSubmitButton, validationConfig);
  closePopup(popupPlace);
};

// Редактирование профиля: обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получение значений полей descriptionInput и nameInput из свойства value:
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  isProfileEdited = true;
  disableButton(profileSubmitButton, validationConfig);  
  closePopup(popupEditProfile); // попап закроется по клику на кнопку сохранения
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
  document.removeEventListener('keydown',closePopupEsc);
 
};

//Создание слушателей для кнопок закрытия
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddPlace);
buttonAddPlace.addEventListener("click", () => {
addFormElement.reset(); // Очищение полей при открытии, т.е.
//   //без этого в форме могут отображаться старые значения, если они не были отправлены 
  resetFormErrors(popupPlace, addFormElement, validationConfig); 
  openPopup(popupPlace);
}); 


//Слушатель для редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent; 
  resetFormErrors(popupEditProfile, profileFormElement, validationConfig);
  openPopup(popupEditProfile);
});

//Слушатели для закрытия попапов (оверлей)
popupEditProfile.addEventListener('mousedown',overlayClick);
popupPlace.addEventListener('mousedown', overlayClick);
cardPopupImage.addEventListener('mousedown', overlayClick);

//карточки из initialCards
renderCardsArray(initialCards);
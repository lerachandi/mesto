// Попапы
const popupElement = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupMesto = document.querySelector(".popup_add-mesto"); // попап добавления нового места

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
const profileSubmitButton = popupEditProfile.querySelector(".popup__button-save"); // кнопку отправки

//Место: для загрузки картинок
const cards = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#cards-template").content;

//Место: форма
const addFormElement = popupMesto.querySelector(".popup__form");
const cardNameInput = popupMesto.querySelector(".popup__input_mesto-name"); // инпут названия
const cardUrlInput = popupMesto.querySelector(".popup__input_mesto-url"); // инпут ссылки на изображение
const buttonAddMesto = document.querySelector(".profile__add-button"); // кнопка добавления места
const formAddMestoSubmitButton = popupMesto.querySelector(".popup__button-save"); // кнопка отправки формы Места "Создать"
const cardsImage = document.querySelector(".cards__image");

// Кнопка закрытия попапов (для всех)
const closeButtons = document.querySelectorAll(".popup__close-button");

//Попап открытой карточки места
const modalTitle = cardPopupImage.querySelector(".popup__description");

//Создание карточек
function createCards(elements) {
  // сначала копируем ноду с темплейтом,
  // затем находим селекторы изображения, названием, удалением и лайка
  const cards = cardsTemplate.cloneNode(true);
  const cardsImage = cards.querySelector(".cards__image");
  const cardsName = cards.querySelector(".cards__title");
  const cardsDeleteButton = cards.querySelector(".cards__delete");
  const cardsLikeButton = cards.querySelector(".cards__like");

  cardsName.textContent = elements.name; // подтягиваем название из initialCards
  cardsImage.src = elements.link; // подтягиваем ссылку из initialCards
  cardsImage.alt = `Фотография ${elements.name}`; // альтернативный текст

  // слушатель на клик по лайку, после клика класс должен меняться,
  // т.е. после клика лайк становится черным
  cardsLikeButton.addEventListener("click", () => {
    cardsLikeButton.classList.toggle("cards__like_active");
  });

  // слушатель для клика по корзине
  cardsDeleteButton.addEventListener("click", () => {
    const cardsItem = cardsDeleteButton.closest(".cards__item");
    cardsItem.remove();
  });

  // слушатель для открытия попапа картинки
  cardsImage.addEventListener("click", () => {
    modalImage.src = elements.link;
    modalImage.alt = `Фотография ${elements.name}`;
    modalTitle.textContent = elements.name;
    openPopup(cardPopupImage);
  });

  return cards;
}

//добавление карточки в начало списка
function renderCard(item) {
  cards.prepend(createCards(item));
}

//считываем и передаем элементы из массива initialCards
function cardArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    renderCard(arr[i]);
  }
}

//функция создания нового места из формы
function addMesto(evt) {
  evt.preventDefault();
  const createMesto = {};
  createMesto.name = cardNameInput.value;
  createMesto.link = cardUrlInput.value;
  renderCard(createMesto);
  closePopup(popupMesto);
}

// Редактирование профиля: обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получение значений полей descriptionInput и nameInput из свойства value:
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile); // попап закроется по клику на кнопку сохранения
}

//Открытие попапа
function openPopup(evt) {
  evt.classList.add("popup_opened");
}

//Закрытие попапов
function closePopup(evt) {
  evt.classList.remove("popup_opened");
}

//Создание слушателей для кнопок закрытия
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener("submit", handleFormSubmit);
addFormElement.addEventListener("submit", addMesto);

buttonAddMesto.addEventListener("click", () => {
  addFormElement.reset(); // Очищение полей при открытии, т.е.
  //без этого в форме могут отображаться старые значения, если они не были отправлены
  openPopup(popupMesto);
});

//Слушатель для редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

//карточки из initialCards
cardArray(initialCards);

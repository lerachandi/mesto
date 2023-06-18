// Popup
const popupElement = document.querySelector(".popup");
// Кнпока редактирования личного профиля
const editProfileButton = document.querySelector(".profile__edit-button");

// Кнопка закрытия редактирования личного профиля
const closeProfileButton = document.querySelector(".popup__close-button");

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");

// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_profile_edit-name");
let descriptionInput = document.querySelector(
  ".popup__input_profile_edit-description"
);

// Клик по карандашу для открытия попапа
editProfileButton.addEventListener("click", openPopup);

// Клик по крестику для закрытия попапа
closeProfileButton.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получение значений полей descriptionInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

//Открытие попапа
function openPopup() {
  popupElement.classList.add("popup_opened");
  //Берем значения из профиля и  кладем в инпуты
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

//Закрытие попапа
function closePopup() {
  popupElement.classList.remove("popup_opened");
}

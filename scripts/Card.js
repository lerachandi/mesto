export default class Card {
  constructor(cardData, templateSelector, handleOpenCard) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleOpenCard = handleOpenCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.cards__image').src = this._link;
    this._element.querySelector('.cards__image').alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._element.querySelector('.cards__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.cards__like').addEventListener('click', (event) => {
      this._handleLikeCard(event);
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleOpenCard(this._link, this._name);
    });
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard(event) {
    event.target.classList.toggle('cards__like_active');
  }
}






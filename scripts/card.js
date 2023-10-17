export class Card {
    constructor(data, cardTemplate, openPhotosPopup) {
        this._imageLink = data.link;
        this._imageName = data.name;
        this._cardTemplate = cardTemplate;
        this._openPhotosPopup = openPhotosPopup;

    }

    _getTemplate() {
        const cardElement = this._cardTemplate.cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._setEventListeners();

        this._image.src = this._imageLink;
        this._image.alt = this._imageName;
        this._element.querySelector('.element__caption').textContent = this._imageName;

        return this._element;
    }

    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._openPhotosPopup(this._image.src, this._image.alt)
        });

        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            this._handleLikeButton(evt);
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
            this._handleDeleteButton(evt)
        });
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('element__like-button_active');
    }

    _handleDeleteButton(evt) {
        evt.target.closest('.element').remove();
    }

}
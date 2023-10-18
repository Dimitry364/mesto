export class Card {
    constructor(data, selectorTemplate, openPhotosPopup) {
        this._imageLink = data.link;
        this._imageName = data.name;
        this._selectorTemplate = selectorTemplate;
        this._openPhotosPopup = openPhotosPopup;

    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._selectorTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._buttonLike = this._element.querySelector('.element__like-button');
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

        this._buttonLike.addEventListener('click', () => {
            this._handleLikeButton();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteButton()
        });
    }

    _handleLikeButton() {
        this._buttonLike.classList.toggle('element__like-button_active');
    }

    _handleDeleteButton() {
        this._element.remove();
    }

}
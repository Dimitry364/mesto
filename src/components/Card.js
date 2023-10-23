export default class Card {
    constructor(data, ownerId, selectorTemplate) {
        this._imageLikes = data.likes;
        this._imageLink = data.link;
        this._imageName = data.name;
        this._cardOwner = data.owner._id;
        this._id = data._id;
        this._selectorTemplate = selectorTemplate;
        this._ownerId = ownerId;
    }

    setImageClickCallBack(imageClickCallBack) {
        this._imageClickCallBack = imageClickCallBack;
    }

    setDeleteButtonClickCallback(deleteButtonClickCallback) {
        this._deleteButtonClickCallback = deleteButtonClickCallback;
    }

    setLikeButtonClickCallBack(likeButtonClickCallBack) {
        this._likeButtonClickCallBack = likeButtonClickCallBack;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._buttonLike = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._setEventListeners();

        this._image.src = this._imageLink;
        this._image.alt = this._imageName;
        this._element.querySelector('.element__caption').textContent = this._imageName;
        this._updateLikes();

        if (this._ownerId == this._cardOwner)
            this._deleteButton.classList.add('element__delete-button_active');

        return this._element;
    }


    _getTemplate() {
        const cardElement = document
            .querySelector(this._selectorTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._imageClickCallBack(this._image.src, this._image.alt)
        });

        this._buttonLike.addEventListener('click', () => {
            this._likeButtonClickCallBack(this._update.bind(this), this._id, this._isLiked);
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteButtonClickCallback(this._handleDeleteButton.bind(this), this._id);
        });
    }

    _update(newData) {
        this._imageLikes = newData.likes;
        this._updateLikes();
    }

    _updateLikes() {
        this._isLiked = this._imageLikes.some((user) => user._id == this._ownerId);
        this._likeCounter.textContent = this._imageLikes.length;

        if (this._isLiked) {
            if (!this._buttonLike.classList.contains('element__like-button_active'))
                this._buttonLike.classList.add('element__like-button_active');
        }
        else
            this._buttonLike.classList.remove('element__like-button_active');
    }

    _handleDeleteButton() {
        this._element.remove();
    }

}
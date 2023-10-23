export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);

        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._onPopupClick.bind(this));
        this._popup.querySelector('.popup__cancel-button').addEventListener('click', this.close.bind(this));
    }

    _onPopupClick(event) {
        if (event.target.classList.contains('popup'))
            this.close();
    }

    _handleEscClose(event) {
        if (event.key === "Escape")
            this.close();
    }
}
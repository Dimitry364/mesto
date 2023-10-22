import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);

        this._formElement = this._popup.querySelector('.popup__form');
        this._formSubmitCallback = formSubmitCallback;
    }

    getFormElement() {
        return this._formElement;
    }

    close() {
        super.close();

        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit',
            evt => this._formSubmitCallback(evt, this._getInputValues()));
    }

    _getInputValues() {
        this._inputList = this._formElement.querySelectorAll('.popup__input');
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }
}
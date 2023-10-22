import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    
    constructor(popupSelector) {
        super(popupSelector);
        
        this._formElement = this._popup.querySelector('.popup__form');
    }
    
    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', evt => this._formSubmitAction(evt));
    }

    setFormSubmitAction(formSubmitAction) {
        this._formSubmitAction = formSubmitAction;
    }
}
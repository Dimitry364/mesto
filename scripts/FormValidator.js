export default class FormValidator {
    constructor(validationInfo, formElement) {

        this._validationInfo = validationInfo;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationInfo.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationInfo.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState();
            });
        });
    }

    _showInputError(element) {
        element.classList.add(this._validationInfo.inputErrorClass);

        const errorElement = this._formElement.querySelector(`.${element.id}-error`);
        errorElement.classList.add(this._validationInfo.errorClass);
        errorElement.textContent = element.errorMessage;
    }

    _hideInputError(element) {
        element.classList.remove(this._validationInfo.inputErrorClass);

        const errorElement = this._formElement.querySelector(`.${element.id}-error`);
        errorElement.classList.remove(this._validationInfo.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _enableButton() {
        this._buttonElement.classList.remove(this._validationInfo.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _disableButton() {
        this._buttonElement.classList.add(this._validationInfo.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList))
            this._disableButton();
        else
            this._enableButton();
    }

}
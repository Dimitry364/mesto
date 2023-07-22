const validationInfo = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const showInputError = (form, element, errorMessage, validationInfo) => {
    element.classList.add(validationInfo.inputErrorClass);

    const errorElement = form.querySelector(`.${element.id}-error`);
    errorElement.classList.add(validationInfo.errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (form, element, validationInfo) => {
    element.classList.remove(validationInfo.inputErrorClass);

    const errorElement = form.querySelector(`.${element.id}-error`);
    errorElement.classList.remove(validationInfo.errorClass);
    errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, validationInfo) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationInfo.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationInfo.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const isValid = (formElement, inputElement, validationInfo) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationInfo);
    } else {
        hideInputError(formElement, inputElement, validationInfo);
    }
};

const setEventListeners = (formElement, validationInfo) => {
    const inputList = Array.from(formElement.querySelectorAll(validationInfo.inputSelector));
    const submitButton = formElement.querySelector(validationInfo.submitButtonSelector);

    toggleButtonState(inputList, submitButton, validationInfo);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationInfo);
            toggleButtonState(inputList, submitButton, validationInfo);
        });
    });
};

const enableValidation = (validationInfo) => {
    const formList = Array.from(document.querySelectorAll(validationInfo.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, validationInfo);
    });
};

enableValidation(validationInfo);
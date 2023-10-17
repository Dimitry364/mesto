import { Card } from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationInfo, escapeKeyCode, templateCardId } from './initialCards.js';

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#popup-edit');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupNameInput = editPopupForm.querySelector('[name=name]');
const editPopupAboutInput = editPopupForm.querySelector('[name=about]');
const editPopupCloseButton = editPopupForm.querySelector('.popup__cancel-button');

const editPopupFormValidator = new FormValidator(validationInfo, editPopupForm);
editPopupFormValidator.enableValidation();

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#popup-add');
const addPopupNameInput = addPopup.querySelector('[name=name]');
const addPopupLinkInput = addPopup.querySelector('[name=link]');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupCancelButton = addPopup.querySelector('.popup__cancel-button');

const addPopupFormValidator = new FormValidator(validationInfo, addPopupForm);
addPopupFormValidator.enableValidation();

const photoPopup = document.querySelector('#popup-photos');
const photoPopupTitle = photoPopup.querySelector('.popup__photos-title');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCloseButton = photoPopup.querySelector('.popup__cancel-button');

const elementsList = document.querySelector('.elements__list');

const addPopupInfo = {
    popup: addPopup,
    openButton: addButton,
    cancelButton: addPopupCancelButton,
    popupForm: addPopupForm,
    handleOpenButton: () => openPopup(addPopup),
    handleFormSubmit: handleAddPopupFormSubmit
};

const editPopupInfo = {
    popup: editPopup,
    openButton: editButton,
    cancelButton: editPopupCloseButton,
    popupForm: editPopupForm,
    handleOpenButton: onEditButtonClick,
    handleFormSubmit: handleEditPopupFormSubmit
};

const photoPopupInfo = {
    popup: photoPopup,
    cancelButton: photoPopupCloseButton
}

function addCard(cardInfo) {
    const card = new Card(cardInfo, templateCardId, openPhotosPopup);
    const finishCard = card.generateCard();

    elementsList.prepend(finishCard);
}

function onEditButtonClick() {
    editPopupNameInput.value = profileName.textContent;
    editPopupAboutInput.value = profileAbout.textContent;

    openPopup(editPopup);
}

function handleEditPopupFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = editPopupNameInput.value;
    profileAbout.textContent = editPopupAboutInput.value;

    closePopup(editPopup);
}

function handleAddPopupFormSubmit(evt) {
    evt.preventDefault();

    addCard({ link: addPopupLinkInput.value, name: addPopupNameInput.value });
    closePopup(addPopup);

    addPopupForm.reset();
    addPopupFormValidator._toggleButtonState();
}

const openPhotosPopup = (link, name) => {
    photoPopupImage.src = link;
    photoPopupImage.alt = name;
    photoPopupTitle.textContent = name;

    openPopup(photoPopup);
}

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscapeClick);
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscapeClick);
    addPopupForm.reset();
    addPopupFormValidator.resetValidation();
    editPopupFormValidator.resetValidation();
}

function closePopupEscapeClick(event) {
    if (event.keyCode == escapeKeyCode) {
        const element = document.querySelector('.popup_opened');
        closePopup(element);
    }
}

function onPopupClick(event) {
    if (event.target.classList.contains('popup'))
        closePopup(event.target);
}

function initPopupEvents(popupInfo) {
    popupInfo.popup.addEventListener('mousedown', onPopupClick);
    popupInfo.cancelButton.addEventListener('click', () => closePopup(popupInfo.popup));

    if ('openButton' in popupInfo)
        popupInfo.openButton.addEventListener('click', popupInfo.handleOpenButton);

    if ('popupForm' in popupInfo)
        popupInfo.popupForm.addEventListener('submit', popupInfo.handleFormSubmit);
}

initialCards.forEach(addCard);

initPopupEvents(addPopupInfo);
initPopupEvents(editPopupInfo);
initPopupEvents(photoPopupInfo);
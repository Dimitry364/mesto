let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__cancel-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('[name=name]');
let aboutInput = formElement.querySelector('[name=about]');

function onEditButtonClick() {
    popup.classList.add('popup_opened');
    
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function onCancelButtonClick() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    onCancelButtonClick();
}

editButton.addEventListener('click', onEditButtonClick);
closeButton.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', handleFormSubmit);
const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let popupEdit = document.querySelector('#popup-edit');
let formElement = popupEdit.querySelector('.popup__form');
let nameInput = formElement.querySelector('[name=name]');
let aboutInput = formElement.querySelector('[name=about]');
let closeButton = formElement.querySelector('.popup__cancel-button');

const popupAdd = document.querySelector('#popup-add');
let addNameInput = popupAdd.querySelector('[name=name]');
let addLinkInput = popupAdd.querySelector('[name=link]');
const addPopupForm = popupAdd.querySelector('.popup__form');
const addPopupCancelButton = popupAdd.querySelector('.popup__cancel-button');

const popupPhotos = document.querySelector('#popup-photos');
const popupPhotosTitle = popupPhotos.querySelector('.popup__photos-title');
const popupImage = popupPhotos.querySelector('.popup__image');
const popupPhotosCloseButton = popupPhotos.querySelector('.popup__cancel-button');


let elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#template-element').content;

function onEditButtonClick() {
    popupEdit.classList.add('popup_opened');

    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function onCancelButtonClick() {
    popupEdit.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    onCancelButtonClick();
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addCard(card) {
    const cardTemplate = elementTemplate.cloneNode(true);

    let image = cardTemplate.querySelector('.element__image');
    image.src = card.link;
    image.alt = card.name;
    image.addEventListener('click', () => openPhotosPopupTitle(card.name));
    image.addEventListener('click', () => openPhotosPopup1Link(card.link));

    cardTemplate.querySelector('.element__caption').textContent = card.name;

    cardTemplate.querySelector('.element__like-button').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like-button_active'))
            evt.target.classList.remove('element__like-button_active');
        else
            evt.target.classList.add('element__like-button_active');
    });

    cardTemplate.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        const card = evt.target.closest('.element');
        card.remove();
    });

    elementsList.prepend(cardTemplate);
}

function cancelCardPopup() {
    popupAdd.classList.remove('popup_opened')
}

function openPhotosPopupTitle(cardName) {
    popupPhotosTitle.textContent = cardName;
    popupPhotos.classList.add('popup_opened')

}

function openPhotosPopup1Link(cardLink) {
    popupImage.src = cardLink;
    popupPhotos.classList.add('popup_opened')
}

initialCards.forEach(addCard);

addCardButton.addEventListener('click', () => popupAdd.classList.add('popup_opened'));
addPopupCancelButton.addEventListener('click', cancelCardPopup);
addPopupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    addCard({ link: addLinkInput.value, name: addNameInput.value });
    cancelCardPopup();
});
popupPhotosCloseButton.addEventListener('click', () => popupPhotos.classList.remove('popup_opened'));

editButton.addEventListener('click', onEditButtonClick);
closeButton.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', handleFormSubmit);
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#popup-edit');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupNameInput = editPopupForm.querySelector('[name=name]');
const editPopupAboutInput = editPopupForm.querySelector('[name=about]');
const editPopupCloseButton = editPopupForm.querySelector('.popup__cancel-button');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#popup-add');
const addPopupNameInput = addPopup.querySelector('[name=name]');
const addPopupLinkInput = addPopup.querySelector('[name=link]');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupSubmutButton = addPopup.querySelector('.popup__button');
const addPopupCancelButton = addPopup.querySelector('.popup__cancel-button');

const photoPopup = document.querySelector('#popup-photos');
const photoPopupTitle = photoPopup.querySelector('.popup__photos-title');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCloseButton = photoPopup.querySelector('.popup__cancel-button');

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#template-element').content;

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
    cancelButton: photoPopupCloseButton,
}

function createCard(cardInfo) {
    const cardTemplate = elementTemplate.cloneNode(true);

    const image = cardTemplate.querySelector('.element__image');
    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    image.addEventListener('click', () => openPhotosPopup(cardInfo.name, cardInfo.link));

    cardTemplate.querySelector('.element__caption').textContent = cardInfo.name;

    cardTemplate.querySelector('.element__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-button_active');
    });

    cardTemplate.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
    });

    return cardTemplate;
}

function addCard(cardInfo) {
    const card = createCard(cardInfo)

    elementsList.prepend(card);
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
    disableButton(addPopupSubmutButton, validationInfo);
}

function openPhotosPopup(name, link) {
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
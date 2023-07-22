const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#popup-edit');
const editPopupContainer = editPopup.querySelector('.popup__container');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupNameInput = editPopupForm.querySelector('[name=name]');
const editPopupAboutInput = editPopupForm.querySelector('[name=about]');
const editPopupCloseButton = editPopupForm.querySelector('.popup__cancel-button');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#popup-add');
const addPopupContainer = addPopup.querySelector('.popup__container');
const addPopupNameInput = addPopup.querySelector('[name=name]');
const addPopupLinkInput = addPopup.querySelector('[name=link]');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupCancelButton = addPopup.querySelector('.popup__cancel-button');

const photoPopup = document.querySelector('#popup-photos');
const photoPopupContainer = photoPopup.querySelector('.popup__photos-container');
const photoPopupTitle = photoPopup.querySelector('.popup__photos-title');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCloseButton = photoPopup.querySelector('.popup__cancel-button');

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#template-element').content;

const escapeKeyCode = 27;

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
}

function openPhotosPopup(name, link) {
    photoPopupImage.src = link;
    photoPopupImage.alt = name;
    photoPopupTitle.textContent = name;

    openPopup(photoPopup);
}

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => closePopupEscapeClick(evt, element));
}

function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => closePopupEscapeClick(evt, element));
}

function closePopupEscapeClick(event, element)
{
    if (event.keyCode == escapeKeyCode)
        closePopup(element);
}

function stopPopupPropagation(event)
{
    event.stopPropagation();
}

initialCards.forEach(addCard);

addPopup.addEventListener('click', () => closePopup(addPopup));
addPopupContainer.addEventListener('click', stopPopupPropagation);
addButton.addEventListener('click', () => openPopup(addPopup));
addPopupCancelButton.addEventListener('click', () => closePopup(addPopup));
addPopupForm.addEventListener('submit', handleAddPopupFormSubmit);

editPopup.addEventListener('click', () => closePopup(editPopup));
editPopupContainer.addEventListener('click', stopPopupPropagation);
editButton.addEventListener('click', onEditButtonClick);
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
editPopupForm.addEventListener('submit', handleEditPopupFormSubmit);

photoPopup.addEventListener('click', () => closePopup(photoPopup));
photoPopupContainer.addEventListener('click', stopPopupPropagation);
photoPopupCloseButton.addEventListener('click', () => closePopup(photoPopup));
import './index.css';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationInfo, templateCardId, editButton, addButton } from '../utils/constants.js';

function addCard(cardInfo) {
    const card = new Card(cardInfo, templateCardId, popupWithImage.open);
    section.addItem(card.generateCard());
}

const userInfo = new UserInfo({
    nameSelector : '.profile__name',
    aboutSelector : '.profile__about'
});

const section = new Section({
    items : initialCards,
    renderer : addCard
}, '.elements__list');

const addPopup = new PopupWithForm('#popup-add', onAddPopupSubmit);
addPopup.setEventListeners();

const addPopupFormValidator = new FormValidator(validationInfo, addPopup.getFormElement());
addPopupFormValidator.enableValidation();

addButton.addEventListener('click', () => {
    addPopupFormValidator.resetValidation();
    addPopup.open();
});

function onAddPopupSubmit(evt, {name, link})
{
    evt.preventDefault();
    
    addCard({ link: link, name: name });
    
    addPopup.close();
}

const editPopup = new PopupWithForm('#popup-edit', onEditPoputSubmit);
editPopup.setEventListeners();

const editPopupFormValidator = new FormValidator(validationInfo, editPopup.getFormElement());
editPopupFormValidator.enableValidation();

editButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    const formElement = editPopup.getFormElement();
    
    formElement.elements.name.value = info.name;
    formElement.elements.about.value = info.about;
    
    editPopupFormValidator.resetValidation();
    editPopup.open();
})

function onEditPoputSubmit(evt, {name, about})
{
    evt.preventDefault();
    
    userInfo.setUserInfo(name, about);
    
    editPopup.close();
}

const popupWithImage = new PopupWithImage('#popup-photos');
popupWithImage.setEventListeners();

section.renderAll();
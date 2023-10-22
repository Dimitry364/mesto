import './index.css';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { validationInfo, templateCardId, editButton, editAvatarButton, addButton } from '../utils/constants.js';
import Api from '../components/Api';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: '1a5c2685-c177-4bf1-8fad-293b36b650f1',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar'
});

const section = new Section({
    items: [],
    renderer: addCard
}, '.elements__list');

function addCard(cardInfo) {
    const card = new Card(cardInfo, userInfo.getUserInfo()._id, templateCardId);
    card.setImageClickCallBack(popupWithImage.open);
    card.setDeleteButtonClickCallback((handleDeleteButton, id) => {
        popupWithConfirmation.setFormSubmitAction((evt) => {
            evt.preventDefault();

            api.deleteCard(id).then((result) => {
                handleDeleteButton();
                popupWithConfirmation.close();
            }).catch((err) => {
                console.log(err);
            });
        });
        popupWithConfirmation.open();
    });
    card.setLikeButtonClickCallBack((handleLikeButton, id, isLiked) => {
        api.likeCard(id, isLiked).then((result) => {
            handleLikeButton(result);
        }).catch((err) => {
            console.log(err);
        });
    });
    section.addItem(card.generateCard());
}

const addPopup = new PopupWithForm('#popup-add', onAddPopupSubmit);
const addPopupFormValidator = new FormValidator(validationInfo, addPopup.getFormElement());
const editPopup = new PopupWithForm('#popup-edit', onEditPopupSubmit);
const editPopupFormValidator = new FormValidator(validationInfo, editPopup.getFormElement());
const editAvatarPopup = new PopupWithForm('#popup-add-avatar', onEditAvatarPopupSubmit);
const editAvatarPopupFormValidator = new FormValidator(validationInfo, editAvatarPopup.getFormElement());
const popupWithImage = new PopupWithImage('#popup-photos');
const popupWithConfirmation = new PopupWithConfirmation('#popup-del');

addPopup.setEventListeners();
addPopupFormValidator.enableValidation();
addButton.addEventListener('click', () => {
    addPopupFormValidator.resetValidation();
    addPopup.open();
});

function onAddPopupSubmit(evt, { name, link }) {
    evt.preventDefault();

    const submitElement = addPopup.getFormElement().elements.submit;
    const oldValue = submitElement.textContent;
    submitElement.textContent = 'Сохранение...';

    api.addCard({ name, link }).then((result) => {
        addCard(result);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        addPopup.close();
        submitElement.textContent = oldValue;
    });
}

editPopup.setEventListeners();

editPopupFormValidator.enableValidation();

editButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    const formElement = editPopup.getFormElement();

    formElement.elements.name.value = info.name;
    formElement.elements.about.value = info.about;

    editPopupFormValidator.resetValidation();
    editPopup.open();
})

function onEditPopupSubmit(evt, { name, about }) {
    evt.preventDefault();

    const submitElement = editPopup.getFormElement().elements.submit;
    const oldValue = submitElement.textContent;
    submitElement.textContent = 'Сохранение...';

    api.setUser({ name, about }).then((result) => {
        userInfo.setUserInfo(result);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        editPopup.close();
        submitElement.textContent = oldValue;
    });
}

editAvatarPopup.setEventListeners();
editAvatarPopupFormValidator.enableValidation();
editAvatarButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    const formElement = editAvatarPopup.getFormElement();

    formElement.elements.link.value = info.avatar;

    editAvatarPopupFormValidator.resetValidation();
    editAvatarPopup.open();
})

function onEditAvatarPopupSubmit(evt, { link }) {
    evt.preventDefault();

    const submitElement = editAvatarPopup.getFormElement().elements.submit;
    const oldValue = submitElement.textContent;
    submitElement.textContent = 'Сохранение...';

    api.updateAvatar(link).then((result) => {
        userInfo.setUserInfo(result);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        editAvatarPopup.close();
        submitElement.textContent = oldValue;
    });
}

popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();

api.getUser().then((result) => {
    userInfo.setUserInfo(result);

    api.getInitialCards().then((result) => {
        section.setItems(result);
        section.renderAll();
    }).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});
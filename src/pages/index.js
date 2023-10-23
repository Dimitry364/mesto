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

    
    const oldValue = evt.submitter.textContent;
    evt.submitter.textContent = 'Сохранение...';

    api.addCard({ name, link }).then((result) => {
        addCard(result);
        addPopup.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        evt.submitter.textContent = oldValue;
    });
}

editPopup.setEventListeners();

editPopupFormValidator.enableValidation();

editButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    editPopup.setInpuValues(info);

    editPopupFormValidator.resetValidation();
    editPopup.open();
})

function onEditPopupSubmit(evt, { name, about }) {
    evt.preventDefault();

    const oldValue = evt.submitter.textContent;
    evt.submitter.textContent = 'Сохранение...';

    api.setUser({ name, about }).then((result) => {
        userInfo.setUserInfo(result);
        editPopup.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        evt.submitter.textContent = oldValue;
    });
}

editAvatarPopup.setEventListeners();
editAvatarPopupFormValidator.enableValidation();
editAvatarButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    editAvatarPopup.setInpuValues(info);

    editAvatarPopupFormValidator.resetValidation();
    editAvatarPopup.open();
})

function onEditAvatarPopupSubmit(evt, { link }) {
    evt.preventDefault();

    const oldValue = evt.submitter.textContent;
    evt.submitter.textContent = 'Сохранение...';

    api.updateAvatar(link).then((result) => {
        userInfo.setUserInfo(result);
        editAvatarPopup.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        evt.submitter.textContent = oldValue;
    });
}

popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();

api.getInitialData().then(([userData, initialCardsData]) => {
    userInfo.setUserInfo(userData);
    section.setItems(initialCardsData);
    section.renderAll();
}).catch((err) => {
    console.log(err);
});
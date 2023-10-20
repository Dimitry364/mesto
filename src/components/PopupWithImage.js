import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    _image = this._popup.querySelector('.popup__image');
    _title = this._popup.querySelector('.popup__photos-title');
    
    constructor(selector) {
        super(selector);
        
        this.open = this.open.bind(this);
    }

    open(link, name) {
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;

        super.open();
    }
}
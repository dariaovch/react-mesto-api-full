import React from 'react';

function PopupWithImage(props) {
    return (
        <div className={props.isOpen ? `popup popup_type_show-card popup_opened` : `popup popup_type_show-card`}>
            <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="close" onClick={props.onClose}></button>
            <figure className="popup__figure">
                <img className="popup__image" alt="Фотография места" src={props.card.link} />
                <figcaption className="popup__image-caption">{props.card.name}</figcaption>
            </figure>
            </div>
        </div>
    )
}

export default PopupWithImage;
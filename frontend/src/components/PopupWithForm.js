import React from 'react';

function PopupWithForm(props) {

    return (
        <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
            <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="close" onClick={props.onClose}></button>
            <form className={`popup__form popup__form_type_${props.name}`} method="POST" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
                <h2 className="popup__heading">{props.title}</h2>
                {props.children}
                <button type="submit" className="popup__save-button">{props.buttonText}</button>
            </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
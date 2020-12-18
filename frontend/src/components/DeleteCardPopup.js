//Заготовка для попапа "Вы уверены?"

import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function DeleteCardPopup(props) {

    function handleSubmit(evt, item) {
        evt.preventDefault();

        props.onCardDelete(item)
    }
    return (
        <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} />
    )
}
import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddCardPopup(props) {

    // Создаем рефы для инпутов
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    // Логика сбора данных из формы и сабмита
    function handleSubmit(evt) {
        evt.preventDefault();
        
        props.onAddCard({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
    }

    //  Очистка полей ввода
    React.useEffect(() => {
          nameRef.current.value = '';
          linkRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
          <input className="popup__input popup__input_place" type="text" name="name" id="place" ref={nameRef} placeholder="Название" required minLength="1" maxLength="30" />
          <span className="popup__form-error" id="place-error"></span>
          <input className="popup__input popup__input_link" type="url" name="link" id="link" ref={linkRef} placeholder="Ссылка на картинку" required />
          <span className="popup__form-error" id="link-error"></span>
        </PopupWithForm>
    )
}
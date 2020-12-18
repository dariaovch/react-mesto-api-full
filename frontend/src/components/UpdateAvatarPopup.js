import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function UpdateAvatarPopup(props) {

    //Создаем реф для инпута
    const inputRef = React.useRef();

    //Сабмит формы
    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

     //  Очистка полей ввода
     React.useEffect(() => {
        inputRef.current.value = '';
  }, [props.isOpen]);

    return (
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonText="Обновить" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
              <input className="popup__input popup__input_avatar-url" type="url" name="url" id="avatar-url" ref={inputRef} placeholder="Ссылка на картинку" required />
              <span className="popup__form-error" id="avatar-url-error"></span>
        </PopupWithForm>
    )
}
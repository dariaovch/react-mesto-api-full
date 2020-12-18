import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {
    
    //Стейт-переменные для данных формы
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    //Получение данных из инпутов
    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handDescriptionChange(evt) {
        setDescription(evt.target.value)
    }

    //Подписка на контекст текущего пользователя
    const currentUser = React.useContext(CurrentUserContext);
    
    //Обновление данных текущего пользователя
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    //Сабмит формы
    function handleSubmit(evt) {
        evt.preventDefault();
        
        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return ( 
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
                <input className="popup__input popup__input_name" type="text" name="name" id="name" onChange={handleNameChange} value={name} required minLength="2" maxLength="40" />
                <span className="popup__form-error" id="name-error"></span>
                <input className="popup__input popup__input_occupation" type="text" name="about" id="occupation" onChange={handDescriptionChange} value={description} required minLength="2" maxLength="200" />
                <span className="popup__form-error" id="occupation-error"></span>
        </PopupWithForm>
    )
}
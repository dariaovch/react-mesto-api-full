import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

    //Подписка на контекст текущего пользователя
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
                <section className="profile">
                    <div className="profile__info-container">
                        <div className="profile__img-container" onClick={props.onUpdateAvatar}><img className="profile__avatar" alt="Аватар пользователя" src={currentUser.avatar} /></div>
                        <div className="profile__info">
                            <div className="profile__edit-container">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button className="profile__edit-button" type="button" aria-label="edit" onClick={props.onEditProfile}></button>
                            </div>
                            <p className="profile__occupation">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="add" onClick={props.onAddCard}></button>
                </section>

                <section className="cards">
                    <ul className="cards__grid">
                    {props.cards.map((item) => <Card item={item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)}
                    </ul>
                </section>
            </main>
    )
}

export default Main;
import React from 'react';
import { Link } from 'react-router-dom';
 
export default function Register(props) {
    const [ data, setData ] = React.useState({
        email: '',
        password: ''
    });
    
    function handleChange(evt) {
        const {name, value} = evt.target;
        setData({
            ...data,
            [name]: value
        });
    }
    
    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = data;
        console.log({ email, password });
        props.handleRegister(email, password);
    }
    
    return(

    <form className='sign-form sign-form_type_register' method="POST" name='register' onSubmit={handleSubmit} noValidate>
        <h2 className="sign-form__heading">Регистрация</h2>
        <input type="email" name="email" placeholder="Email" className="sign-form__input" value={data.email} onChange={handleChange} />
        <input type="password" name='password' placeholder="Пароль" className="sign-form__input" value={data.password} onChange={handleChange} />
        <button type="submit" className="sign-form__button">Зарегистрироваться</button>
       
       <p className="sign-form__hint">Уже зарегистрированы? <Link to="/sign-in" className="sign-form__link">Войти</Link></p>
       </form>
       )
}
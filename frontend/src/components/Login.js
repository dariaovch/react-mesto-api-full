import React from 'react';
import { Link } from 'react-router-dom';

 
export default function Login(props) {
    const [ data, setData ] = React.useState({
        email: '',
        password: ''
    });
    
    function handleChange(evt) {
      const {name, value} = evt.target;
      setData({
          ...data,
          [name]: value
      })
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = data;
        console.log({ email, password });
        props.handleLogin(email, password);
        props.tokenCheck();
    }
    
    return (
    <form className='sign-form sign-form_type_login' method="POST" name='login' onSubmit={handleSubmit} noValidate>
        <h2 className="sign-form__heading">Вход</h2>
        <input type="email" name="email" placeholder="Email" className="sign-form__input" value={data.email} onChange={handleChange} />
        <input type="password" name='password' placeholder="Пароль" className="sign-form__input" value={data.password} onChange={handleChange} />
        <button type="submit" className="sign-form__button">Войти</button>
       
        <p className="sign-form__hint">Ещё нет аккаунта? <Link to="/sign-up" className="sign-form__link">Зрегистрироваться</Link></p>
        </form>
        )
}
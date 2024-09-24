import React, { useState } from 'react'
import classes from './loginForm.module.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from '../../slices/filesSlice';


const LoginForm = (props) => {
  const admin = props.info
  const [ form, setForm ] = useState({
    UseLogin: '',
    password: '',
  })
  const { UseLogin, password } = form;

  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prevForm => ({...prevForm, [name]: value}))

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin()).then(response =>
    console.log(response.payload))
  }

  return (
    <form className={classes['form']} onSubmit={handleSubmit}>
      <label htmlFor="login">Введите логин</label>
      <input className={classes['input']} id='login' name='UseLogin' type="text" value={UseLogin} placeholder='Login' onChange={handleChange} required/>
      <label htmlFor="password">Введите пароль</label>
      <input className={classes['input']} id='password' name='password' type="text" value={password} placeholder='Пароль' onChange={handleChange} required/>
      <button className={classes['button']} type='submit'>{admin ? 'Войти как администратор' : 'Войти как пользователь'}</button>
    </form>
  )
}

export default LoginForm
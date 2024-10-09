import React from 'react'
import { useSelector } from "react-redux";
import NavigateMenu from '../components/NavigateMenu/NavigateMenu';

const HomePage = () => {
  const { fullName } = useSelector(state => state.user)

  return (
    <>
      <nav><NavigateMenu href={{login: '/', exit: '/login', registration: '/login'}}/></nav>
      <div>{fullName}, вы вошли в хранилище!!!</div>
    </>
  )
}

export default HomePage

import React from 'react'
import { useSelector } from "react-redux";

const HomePage = () => {
  const { fullName } = useSelector(state => state.user)

  return (
    <div>
      {fullName}, вы вошли в хранилище!!!
    </div>
  )
}

export default HomePage

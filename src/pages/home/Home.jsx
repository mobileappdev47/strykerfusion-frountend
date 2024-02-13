import React from 'react'
import style from './home.module.css'
import Handcraft from '../../components/handcraft/Handcraft'
import OurBrand from '../../components/ourbrands/OurBrand'
import Process from '../../components/process/Process'

const Home = () => {
  return (
    <>
      <div className={style.maindiv}>
        <Handcraft />
        <OurBrand />
        <Process />
      </div>
    </>
  )
}

export default Home
import React from 'react'
import style from './home.module.css'
import Handcraft from '../../components/handcraft/Handcraft'
import OurBrand from '../../components/ourbrands/OurBrand'
import Process from '../../components/process/Process'
import Revolution from '../../components/revolution/Revolution'

const Home = () => {
  return (
    <>
      <div className={style.maindiv}>
        <Handcraft />
        <OurBrand />
        <Process />
        <Revolution />
      </div>
    </>
  )
}

export default Home
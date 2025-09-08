import React from 'react'
import {HeroSection, UseCases, Footer} from "../components/export.js"

function Home() {
  return (
    <div className={`flex flex-col w-full h-full`}>
      <HeroSection/>
      <UseCases/>
      <Footer/>
    </div>
  )
}

export default Home

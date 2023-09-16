import React from 'react'
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
  return (

    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={800}
      recycle={false}
      tweenDuration={4000}
    />


  )
}
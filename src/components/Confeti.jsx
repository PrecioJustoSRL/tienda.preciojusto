import React from 'react'
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
  return (

    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={1000}
      recycle={false}
      tweenDuration={2000}
    />


  )
}
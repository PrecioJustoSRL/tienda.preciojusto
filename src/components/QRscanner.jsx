'use client'
import Webcam from "react-webcam";
import React, { useState, useEffect } from 'react'
import Button from '@/components/Button'
import { useUser } from '@/context/Context.js'
import { QRreaderUtils } from "@/utils/QRreader";
import { readUserData } from '@/supabase/utils'
const videoConstraints = {
  width: 360,
  height: 360,
  facingMode: "environment"
};

export default function WebCamp({ takePhoto }) {
  const { image1, setImage1, webcamRef1, setFilterQR, setFilter, setRecetaDBP } = useUser()

  function Base64ToImage(base64img) {
    var img = new Image();
    img.src = base64img;
    return img;
  }

  const height = 360
  const width = 360

  const capture = async () => {
    setImage1(null)
    console.log('img')


    const imageSrc = webcamRef1.current.getScreenshot();

    if (imageSrc) {

     const res = await fetch(imageSrc)
     const blob = await res.blob()
 
      console.log(blob)
   
      const fileIMG = new File([blob], 'image', { type: 'image/webp' },)

      console.log(fileIMG)

      

      QRreaderUtils({ target: { files: [fileIMG] } }, setFilterQR, setFilter, readUserData, setRecetaDBP)
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
      capture()
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Webcam
    audio={false}
    height={height}
    ref={webcamRef1}
    screenshotFormat="image/webp"
    width={width}
    videoConstraints={videoConstraints}
    mirrored={false}
  />




}





























// 'use client'

// import { QrScanner } from '@yudiel/react-qr-scanner';
// import { useUser } from '@/context/Context.js'
// import { readUserData } from '@/supabase/utils'
// import { useRouter } from 'next/navigation';

//  const Component = () => {
//   const { setRecetaDBP, setWebScann, setFilter, setFilterQR } = useUser()
//   const router = useRouter()



//  const handlerQR = async (result) => {
//     if (result) {
//       console.log(result)
//       const data = await readUserData('Receta', result, setRecetaDBP, 'qr')
//       setFilterQR(result)
//       return router.replace('/')
//     }
//   }


//   return  <QrScanner
//       constraints={{
//          facingMode:  'environment'
//       }}
//       onDecode={(result) => handlerQR(result)}
//       onError={(error) => console.log(error?.message)}
//     /> 
//   }
//   export default Component
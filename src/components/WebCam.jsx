'use client'
import Webcam from "react-webcam";
import React, { useState, useEffect } from 'react'
import Button from '@/components/Button'
import { useUser } from '@/context/Context.js'


const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "environment"
};

export default function WebCamp({ takePhoto }) {
    const { image1, setImage1, webcamRef1 } = useUser()

    // function Base64ToImage(base64img) {
    //     var img = new Image();
    //     img.src = base64img;
    //     return img;
    // }

    const height = 360
    const width = 360

     React.useCallback(
        () => {
            const  imageSrc = webcamRef1.current.getScreenshot();
            //    const img = Base64ToImage(imageSrc)
               console.log(imageSrc)
            setImage1(imageSrc)
        },
        [webcamRef1]
    );


    return <div className="relative">
        <Webcam
            audio={false}
            height={height}
            ref={webcamRef1}
            screenshotFormat="image/webp"
            width={width}
            videoConstraints={videoConstraints}
            mirrored={true}
        />

    </div>


}



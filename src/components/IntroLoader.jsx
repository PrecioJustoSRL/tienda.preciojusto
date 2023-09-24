'use client'
import style from './IntroLoader.module.css'
import { useEffect, useState } from 'react'
export default function Loader() {

    const [visible, setVisible] = useState(true)

    function off() {
        if (visible === true) {
            let timer = setTimeout(() => {
                console.log('ejec')
                setVisible(false)
            }, 6000)
        }
        return () => {
            clearTimeout(timer)
        };
    }
    
    useEffect(() => {
        off()
    }, []);
    return (
        visible && <div className={`fixed top-0 left-0 w-screen h-screen flex flex-col justify-center  items-center z-50 ${style.animation}`}>
            <div className={`relative md:max-w-[500px] w-full flex flex-col justify-center items-center overflow-hidden`}>
                <img src='/logo-circle.png' className={`h-[100px] w-[100px] ${style.animation1}`} />
                <br />
                <div className={`flex items-center space-x-2 ${style.animation2}`}>
                    <span className={`text-[20px] font-medium`}>Precio Justo</span>
                </div>
            </div>
        </div>
    )
}



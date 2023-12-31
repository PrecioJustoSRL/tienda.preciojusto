'use client'
import { readUserData } from '@/supabase/utils'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'
import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Paragraph from '@/components/Paragraph'
import { WithAuth } from '@/HOCs/WithAuth'

function Home() {
    const router = useRouter()

    const { user, userDB, setUserData } = useUser()

    const redirectHandler = (ref) => {
        router.push(ref)
    }

    console.log(userDB)
   
    return (
        <div className='w-full flex justify-center p-5'>
            {userDB !== undefined && userDB !== null
                ? <div className=" bg-white  w-full max-w-[800px] p-5 py-10 shadow-2xl ">
                    <h3 className='text-center text-[14px] pb-3 font-bold'>Datos Empresariales</h3>
                    <br />
                    <div className=''>
                        <Paragraph> <img className="inline pr-5" src="/whatsapp.svg" alt="" />{userDB['whatsapp']}</Paragraph>
                        <Paragraph> <img className="inline pr-5" src="/telefono.svg" alt="" />{userDB['telefono']}</Paragraph>
                        <Paragraph> <img className="inline pr-5" src="/ubicacion.svg" alt="" />{userDB['ciudad']}</Paragraph>
                    </div>
                    <br />
                    <Button theme="Success" click={() => redirectHandler(`/${user.rol}`)}>Editar Perfil</Button>
                    <img className="fixed bottom-5 right-5" src="/whatsapp.svg" alt="" />
                </div>
                : <div className='w-full flex justify-center'>
                    <div className=" w-full max-w-[800px] p-5 flex flex-col items-center justify-center bg-white h-[80vh]">
                        <img src="/logo-circle.png" className='w-[150px] h-[150px]' alt="" />
                        <br />
                        <Button theme="Success" click={() => redirectHandler(`/${user.rol}`)}>Completa tu Perfil</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home

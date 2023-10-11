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
    const [state, setState] = useState({})




    const redirectHandler = (ref) => {
        router.push(ref)
    }

    console.log(userDB)
  
    return (
        <div className='w-full flex justify-center p-5'>
            {userDB !== undefined && userDB !== null
                ? <div className=" bg-white  w-full max-w-[800px] p-5 py-10 shadow-2xl ">
                    <br />
                    <div className="flex justify-center">
                        <img className='h-[100px] w-[100px] rounded-full' src={userDB.url} alt="" />
                    </div>
                    <br />
                    <h3 className='w-full font-base  font-normal text-center '>{userDB['nombre']}</h3>
                    <br />
                    <Subtitle styled="flex">Quienes Somos</Subtitle>
                    <Paragraph> {userDB['descripcion']}</Paragraph>
                    <Subtitle styled="flex">Contactos</Subtitle>
                    <div className=''>
                    <Paragraph> <img className="inline pr-5" src="/whatsapp.svg" alt="" />{userDB['whatsapp']}</Paragraph>
                        <Paragraph> <img className="inline pr-5" src="/ubicacion.svg" alt="" />{userDB['ciudad']}</Paragraph></div>
                    <br />
                    <Button theme="Success" click={() => redirectHandler('Distribuidor/')}>Editar Perfil</Button>
                </div>
                : <div className='w-full flex justify-center'>
                    <div className=" w-full max-w-[800px] p-5 flex flex-col items-center justify-center bg-white h-[80vh]">
                        <img src="/logo-circle.png" className='w-[150px] h-[150px]' alt="" />
                        <br />
                        <p className='text-[14px] text center'>Completa tu perfila y enviala a verficacion para promocionar tus productos en PRECIO JUSTO</p>
                        <Button theme="Success" click={() => redirectHandler(`/${user.rol}`)}>Completa tu Perfil</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home

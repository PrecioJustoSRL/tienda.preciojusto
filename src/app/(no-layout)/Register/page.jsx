'use client'
import { writeUserData, readUserData, onAuth, signOut, getUserData, readUserAllData } from '@/supabase/utils'
import { useUser } from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { WithAuth } from '@/HOCs/WithAuth'
import Video from '@/components/Video'
import { departamentos } from '@/constants'
import Msg from '@/components/Msg'


import { useRouter } from 'next/navigation';
import { data } from 'autoprefixer'

function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, productDB, setUserProduct } = useUser()
    const router = useRouter()

    const [rol, setRol] = useState('Cliente')
    const [ciudad, setCiudad] = useState('Seleccionar')


    const onClickHandler = (name, value) => {
        setRol(value)
    }
    const onClickHandlerCity = (name, value) => {
        value !== 'Seleccionar' && success === null && setUserSuccess('Importand', 6000)
        setCiudad(value)
    }
    const registerHandler = async (e) => {
        e.preventDefault()
        console.log('button')
        let nombre = e.target[0].value

        if (ciudad !== 'Seleccionar' && rol && user) {
            const res = await writeUserData('Users', { uuid: user.id, nombre, rol, ciudad, correo: user.email }, user.id, user, null)
    
        } else {
            setUserSuccess('Complete')
        }
    }

    const redirectLogin = () => {
        setUserProfile(null)
        signOut()
        router.push('/Login')
    }

    useEffect(() => {
        user === undefined && onAuth(setUserProfile)
        if (user && user.rol) { router.push('/') }
    }, [user]);
    console.log(user)


    return (
        <div className="min-h-full "
            style={{
                backgroundImage: 'url(/bg-signup.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>
            <Video />
            <div className='w-screen h-screen  flex flex-col justify-center items-center p-5'>

                <form className={`space-y-6 lg:space-y-3 w-[100%] bg-[#00000090] rounded-[30px] sm:max-w-[400px] ${introVideo == true ? 'h-0 overflow-hidden' : 'h-auto px-5 py-10 lg:p-10'}`} onSubmit={registerHandler} >
                    <div className='w-full text-center flex justify-center'>
                        <Image src="/logo-main.svg" width="150" height="150" alt="User" />
                    </div>
                    <br />
                    <h5 className="text-[18px] text-center text-white">Registrate</h5>
                    <br />                        <div>
                        <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Nombre</label>
                        <Input type="text" name="email" id="email" placeholder="" require />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Tipo de cuenta</label>
                        <Select arr={['Cliente', 'Medico', 'Clinica', 'Distribuidor']} name='rol' click={onClickHandler} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Departamento</label>
                        <Select arr={departamentos} name='Ciudad' click={onClickHandlerCity} />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-[16px] h-[16px] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 " required />
                            </div>
                            <Link href="/Politicas" className="ml-2 text-[14px] font-medium text-gray-100 underline">Políticas de Servicio</Link>
                        </div>
                    </div>
                    <Button type="submit" theme="Primary">Continuar</Button>
                    <br />
                    <div className="text-[14px] text-center font-medium text-white dark:text-gray-300">Ya tienes una cuenta? <span onClick={redirectLogin} className="text-gray-100 font-bold underline cursor-pointer">Inicia Sessión</span >
                    </div>
                </form>
            </div>
            {success == 'Complete' && <Msg>Complete el formulario</Msg>}

            {/* {success == 'Importand' && <Msg>Esta información es importante,<br /> por favor revisa que sea correcta.</Msg>} */}
        </div>
    )
}


export default Home

'use client'
import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'

import { useState } from 'react'
import { useUser } from '../../../context/Context.js'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'

import Button from '../../../components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess } = useUser()
    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '__ ___ ___', replacement: { _: /\d/ } });

    function manageInputIMG(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]
        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))
    }

    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    function onChangeHandlerCheck(e) {
        setState({ ...state, ['dias de atencion']: { ...state['dias de atencion'], [e.target.name]: e.target.checked } })
    }
    function onClickHandler(name, value) {
        setState({ ...state, [name]: value })
    }
    function save(e) {
        e.preventDefault()
        writeUserData('Distribuidor', { ...state, uuid: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        uploadStorage('Distribuidor', postImage, user.uuid, updateUserData)
        router.push('/Distribuidor/Perfil')
    }

    // console.log(state)

    return (
        <div className='w-full flex justify-center p-5'>
            <form className='p-5 bg-white w-full max-w-[800px] p-5 py-10 shadow-2xl ' onSubmit={save}>
                <h3 className='text-center text-[16px] pb-3'>Agregar Perfil</h3>
                <div className="w-full flex justify-center">
                    <label htmlFor="file" className="block flex justify-center items-center w-[100px] h-[100px] bg-white border border-gray-300 text-gray-900 text-[14px] focus:ring-blue-500 focus:border-blue-500 rounded-[100px]" >
                        {urlPostImage ? <img className="block flex justify-center items-center w-[100px] h-[100px] bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[100px]" style={{ objectPosition: 'center' }} src={urlPostImage} alt="" />
                            : 'Subir Imagen'}
                    </label>
                    <input className="hidden" id='file' name='name' onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" type="file" required/>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">

                    <div>
                        <Label htmlFor="">Nombre de la empresa</Label>
                        <Input type="text" name="nombre" onChange={onChangeHandler} />
                    </div>

                    <div>
                        <Label htmlFor="">Quienes somos</Label>
                        <Input type="text" name="descripcion" onChange={onChangeHandler} />
                    </div>
                    <div>
                        <Label htmlFor="">Whatsapp</Label>
                        <Input type="text" name="whatsapp" onChange={onChangeHandler} reference={inputRefWhatsApp} category='phone'  require />
                    </div>
                </div>
                <div className='flex w-full justify-around'>
                    <Button theme='Primary'>Enviar a verficación</Button>
                </div>
            </form>
        </div>
    )
}

export default Home






// <div>
//                         <Label htmlFor="">Numero de tarjeta</Label>
//                         <Input type="text" reference={inputRefCard} name="numero de tarjeta" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
//                     </div>
//                     <div>
//                         <div className='w-full flex justify-between'>
//                             <div className='w-5/12'>
//                                 <Label htmlFor="">Fecha</Label>
//                                 <Input reference={inputRefDate} name="fecha de tarjeta" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
//                             </div>
//                             <div className='w-5/12'>
//                                 <Label htmlFor="">CVC</Label>
//                                 <Input reference={inputRefCVC} name="cvc" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
//                             </div>
//                         </div>
//                     </div>






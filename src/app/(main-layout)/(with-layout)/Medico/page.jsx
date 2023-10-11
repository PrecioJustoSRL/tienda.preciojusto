'use client'

import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import LoaderBlack from '@/components/LoaderBlack'
import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, success, setUserSuccess } = useUser()
    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)


    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '_ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '__ ___ ___', replacement: { _: /\d/ } });
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
        console.log(item)
    }

    async function deletConfirm() {
        await deleteUserData('Pedido', item.idBCP, 'idBCP')
        userDB && userDB.access === 'Verificadora' && userDB['ID Verificador']
            ? readUserData('Pedido', userDB['ID Verificador'], setUserPedidos, 'cliente')
            : readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')
        setModal('')
    }
    function manageInputIMG(e) {
        const file = e.target.files[0]

        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))
    }
    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    function onClickHandler(name, value) {
        setState({ ...state, [name]: value })
    }
    async function save(e) {
        e.preventDefault()
        if (userDB && userDB['nombre']) {
            setUserSuccess('Cargando')
            await updateUserData('Medico', { ...state, ciudad: user.ciudad, nombre: user.nombre }, user.uuid)
            postImage && uploadStorage('Medico', postImage, user.uuid, updateUserData, true)
            router.push('/Medico/Perfil')
            setUserSuccess('')
        } else {
            setUserSuccess('Cargando')
            await writeUserData('Medico', { especialidad: 'Traumatologo', ...state, uuid: user.uuid, ciudad: user.ciudad, nombre: user.nombre }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente',)
            await uploadStorage('Medico', postImage, user.uuid, updateUserData)
            router.push('/Medico/Perfil')
            setUserSuccess('')
        }
    }
    // console.log(user.nombre)
    useEffect(() => {
        // if (user && user.rol !== undefined) readUserData(user.rol, user.uuid, setUserData,)
    }, [user]);

    return (
        <div className='w-full flex justify-center p-5'>
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de eliminar el pedido del siguiente paciente:  {item['nombre del paciente']}</Modal>}

            <form className='p-5 py-10 bg-white w-full max-w-[800px] shadow-2xl' onSubmit={save} >
                {success === "Cargando" && <LoaderBlack></LoaderBlack>}
                <h3 className='text-left text-[14px] pb-3'>Bienvenido {user.nombre}</h3>
                <h3 className='text-center text-[14px] pb-3'>Agregar Perfil</h3>
                <div className="w-full flex justify-center">
                    <label htmlFor="file" className="block flex justify-center items-center w-[100px] h-[100px] bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[100px]" >
                        {urlPostImage || (userDB && userDB.url) ? <img className="block flex justify-center items-center w-[100px] h-[100px] bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[100px]" style={{ objectPosition: 'center' }} src={urlPostImage ? urlPostImage : userDB.url} alt="" />
                            : 'Subir Imagen'}
                    </label>
                    <input className="sr-only" onChange={manageInputIMG} accept="image/*" id='file' type="file" required={userDB && userDB['nombre'] ? false : true} />
                </div>
                <br />
                <br />
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {/* <div>
                        <Label htmlFor="">Nombre</Label>
                        <Input type="text" name="nombre" onChange={onChangeHandler} defValue={userDB && userDB['nombre']} require />
                    </div> */}
                    <div>
                        <Label htmlFor="">Especialidad</Label>
                        <Select arr={['Traumatólogo', 'Neurocirujano', 'Cirujano Plástico', 'Cirujano Maxilofacial', 'Cirujano Toráxico', 'Otros']} name='especialidad' defaultValue={userDB && userDB['especialidad']} click={onClickHandler} />
                    </div>
                    <div>
                        <Label htmlFor="">Whatsapp</Label>
                        <Input type="text" name="whatsapp" onChange={onChangeHandler} reference={inputRefWhatsApp} defValue={userDB && userDB['whatsapp']} category='phone' require />
                    </div>
                </div>
                <br />
                <br />
                <td className="w-[150px] px-3 py-4 text-gray-900 text-center border-r">
                    {i.estado === 'Pendiente' && i.message !== 'Correcto'
                        ? <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                        : 'No permitido'
                    }
                </td>
            </form>
        </div>
    )
}

export default Home










// function onChangeHandlerCheck(e) {
//     setState({ ...state, ['dias de atencion']: { ...state['dias de atencion'], [e.target.name]: e.target.checked} })
// }




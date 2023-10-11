'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData, readUserAllData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'

function Home() {
    const { user, setUserUuid, userDB, msg, setMsg, modal, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, item } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [filter, setFilter] = useState('')

    function autorizar(i, data) {
        setUserItem(i)
        setModal('autorizar')
    }
    async function autorizarConfirm() {
        console.log(item)
        await updateUserData('Distribuidor', { autorizacion: !item.autorizacion }, item.uuid, null)
        // await updateUserData('Distribuidor', { autorizacion: !item.autorizacion }, item['ID Verificador'], null)
        await readUserAllData('Distribuidor', null, setTemporal)
        setModal('')
    }
    function onChangeHandler(e) {
        setFilter(e.target.value.toLowerCase())
    }
    async function save(i) {
        await updateUserData('Producto', state[i.uuid], i.uuid)
        postImage[i.uuid] && await uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        const obj = { ...state }
        delete obj[i.uuid]
        setState(obj)
        readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
    }
    async function deletConfirm() {
        await deleteUserData('Producto', userUuid)
        readUserData('Producto', userUuid, setUserDistributorPDB, 'distribuidor')
    }
    function delet(i, data) {
        setUserItem(i)
        setModal(data)
    }
    async function blockConfirm() {
        console.log(item)
        await updateUserData('Distribuidor', { bloqueado: !item.bloqueado }, item.uuid, null)
        await readUserAllData('Distribuidor', null, setTemporal)
        setModal('')

    }
    async function deletConfirm() {
        await deleteUserData('Distribuidor', item.uuid)
        readUserAllData('Distribuidor', null, setTemporal)
        setModal('')

    }
    function redirect(id) {
        setUserUuid(id)
        return router.push('Administrador/Distribuidores/Productos')
    }
    function redirectPedidos(id) {
        setUserUuid(id)
        return router.push('Administrador/Distribuidores/Pedidos')
    }
    function sortArray(x, y) {
        if (x['nombre'].toLowerCase() < y['nombre'].toLowerCase()) { return -1 }
        if (x['nombre'].toLowerCase() > y['nombre'].toLowerCase()) { return 1 }
        return 0
    }

    useEffect(() => {
        readUserAllData('Distribuidor', null, setTemporal)
    }, [])

    return (

        <div className='h-full'>
            <div className="relative h-full overflow-x-auto shadow-2xl p-5 bg-white min-h-[80vh]">
                {modal === 'autorizar' && <Modal funcion={autorizarConfirm}>Estas seguro de {item.autorizacion ? 'AUTORIZAR' : 'DESAUTORIZAR'} al siguiente usuario: {item.nombre}</Modal>}

                {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario: {item.nombre}</Modal>}
                {modal === 'Block' && <Modal funcion={blockConfirm}>Estas seguro de BLOQUEAR al siguiente usuario {item.nombre}</Modal>}
                <h3 className='font-medium text-[16px]'>Distribuidores</h3>
                <br />
                <div className='flex justify-center w-full'>
                    <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre' />
                </div>
                <div className='min-w-[1500px] flex justify-start items-center my-5 '>
                    <h3 className="flex pr-12 text-[14px]" htmlFor="">Ciudad</h3>
                    <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px) 100px 100px 100px 200px 200px 100px' }}>
                        <Tag theme={ciudad == 'Sucre' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Sucre' ? '' : 'Sucre')}>Sucre</Tag>
                        <Tag theme={ciudad == 'La paz' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'La paz' ? '' : 'La paz')}>La paz</Tag>
                        <Tag theme={ciudad == 'Cochabamba' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Cochabamba' ? '' : 'Cochabamba')}>Cochabamba</Tag>
                        <Tag theme={ciudad == 'Santa Cruz' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Santa Cruz' ? '' : 'Santa Cruz')}>Santa Cruz</Tag>
                        <Tag theme={ciudad == 'Oruro' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Oruro' ? '' : 'Oruro')}>Oruro</Tag>
                        <Tag theme={ciudad == 'Beni' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Beni' ? '' : 'Beni')}>Beni</Tag>
                        <Tag theme={ciudad == 'Pando' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Pando' ? '' : 'Pando')}>Pando</Tag>
                        <Tag theme={ciudad == 'Tarija' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Tarija' ? '' : 'Tarija')}>Tarija</Tag>
                        <Tag theme={ciudad == 'Potosi' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Potosi' ? '' : 'Potosi')}>Potosi</Tag>
                    </div>
                </div>
                <table className="w-[1900px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
                    <thead className="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Nombre empresarial
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Descripcón
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Ciudad
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Telefono
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Whatsapp
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Ver Pedidos
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Ver Productos
                            </th>

                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Estado de<br />
                                Autorización
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Estado de<br />
                                Actividad
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {temporal && temporal !== undefined && temporal.sort(sortArray).map((i, index) => {

                            return i.ciudad.includes(ciudad) && i.nombre.toLowerCase().includes(filter) && 
                            <tr className="text-[14px] border-b hover:bg-gray-50" key={index}>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r" onClick={(e) => redirect(i.uuid)}>
                                    {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                    {i['nombre']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 2' defaultValue={i['nombre de producto 2']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                    {i['descripcion']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 3' defaultValue={i['nombre de producto 3']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                    {i['ciudad']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} className="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                    {i['telefono']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} className="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                    {i['whatsapp']}
                                </td>
                                <td className="px-3 py-4 border-r">
                                    <Button theme={"Primary"} click={(e) => redirectPedidos(i.uuid)}>Ver pedidos</Button>
                                </td>
                                <td className="px-3 py-4 border-r">
                                    <Button theme={"Primary"} click={(e) => redirect(i.uuid)}>Ver productos</Button>
                                </td>
                                <td className="px-3 py-4 border-r">
                                    {i.autorizacion == true
                                        ? <Button theme={"Danger"} click={() => autorizar(i, 'Access')}>Sin autoriación</Button>
                                        : <Button theme={"Success"} click={() => autorizar(i, 'Access')}>Autorizado</Button>
                                    }
                                </td>
                                <td className="px-3 py-4 border-r">
                                    {i.bloqueado == true
                                        ? <Button theme={"Danger"} click={() => delet(i, 'Block')}>Bloqueado</Button>
                                        : <Button theme={"Success"} click={() => delet(i, 'Block')}>Activo</Button>
                                    }
                                </td>
                                <td className="px-3 py-4 ">
                                            <Button theme={"Danger"} click={() => delet(i, 'Delete')}>Eliminar</Button>
                                        </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>


            </div>
        </div>

    )
}


export default Home








// const onClickHandlerCategory = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['categoria']: value } })
// }
// const onClickHandlerCity = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['ciudad']: value } })
// }
// function manageInputIMG(e, uuid) {
//     const file = e.target.files[0]
//     setPostImage({ ...postImage, [uuid]: file })
//     setUrlPostImage({ ...urlPostImage, [uuid]: URL.createObjectURL(file) })
//     setState({ ...state, [uuid]: { ...state[uuid], uuid } })
// }
// const onClickHandlerAvailability = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['disponibilidad']: value } })
// }
// const onClickHandlerSystem = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['sistema']: value } })
// }
// postImage[userUuid] && uploadStorage('Producto', postImage[userUuid], userUuid, updateUserData, true)
// const obj = { ...state }
// delete obj[userUuid]
// setState(obj)
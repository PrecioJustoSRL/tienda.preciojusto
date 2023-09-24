'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState, useRef } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import Input from '@/components/Input'
import { generateUUID } from '@/utils/UIDgenerator'
import LoaderBlack from '@/components/LoaderBlack'
import { disponibilidad as dispo } from '@/constants'
import Modal from '@/components/Modal'
import { getDayMonthYear } from '@/utils/DateFormat'


function Home() {
    const { user, userDB, pedidos, setUserPedidos, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, modal, setModal, success, item, } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [debito, setDebito] = useState('')
    const [envio, setEnvio] = useState('')
    const [sistema, setSistema] = useState('')
    const [id, setId] = useState('')
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);



    function seeMore() {
        router.push('/Producto')
    }



    console.log(distributorPDB)





    const importacionConfirm = async (e) => {
        setModal('')

        setUserSuccess('Actualizando')
        const queryUuid = e === 'Importar PrecioJustoSRL' ? 'Precio-Justo-SRL-Data' : id

        const data = await readUserData('Producto', queryUuid, null, 'distribuidor')
        await deleteUserData('Producto', user.uuid, 'distribuidor')
        data.map(async i => {
            const obj = { ...i }
            delete obj.id
            return await writeUserData('Producto', { ...obj, uuid: generateUUID(), distribuidor: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        })
        setUserDistributorPDB(undefined)
        await readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
        return setUserSuccess('')
    }

    const importacionHandler = async (e) => {
        const queryUuid = e === 'Importar PrecioJustoSRL' ? 'Precio-Justo-SRL-Data' : id

        const data = await readUserData('Producto', queryUuid, null, 'distribuidor')

        if (data.length === 0) {
            setModal('No Data')
            return
        }

        if (distributorPDB !== null && distributorPDB !== undefined) {
            setModal(e)
        }
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
        await updateUserData('Producto', { ...state[item.uuid], archivado: false }, item.uuid)
        // postImage[item.uuid] && await uploadStorage('Producto', postImage[item.uuid], item.uuid, updateUserData, true)
        const obj = { ...state }
        delete obj[item.uuid]
        setState(obj)
        readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
        setModal('')

    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
        console.log(item)
    }
    function redirect() {
        router.push('/Distribuidor/Agregar')
    }
    function sortArray(x, y) {
        if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
        if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
        return 0
    }
    console.log(state)
    function seeMore() {
        router.push('/Producto')
    }
    const onClickHandlerCategory = (name, value, idBCP) => {
        setState({ ...state, [idBCP]: { ...state[idBCP], idBCP, ['estado']: value } })
    }



    function onChangeHandler(e) {
        setFilter(e.target.value.toLowerCase())
    }


    async function save(idBCP) {
        setModal('Guardando')
        await updateUserData('Pedido', state[idBCP], idBCP, 'idBCP')
        readUserData('Pedido', user.uuid, setUserPedidos, 'distribuidor')
        const obj = { ...state }
        delete obj[idBCP]
        setState(obj)
        setModal('')
    }

    function delet(i) {
        deleteUserData('Pedido', i.uuid)
        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
    }

    function sortArray(x, y) {
        if (x['nombre del paciente'].toLowerCase() < y['nombre del paciente'].toLowerCase()) { return -1 }
        if (x['nombre del paciente'].toLowerCase() > y['nombre del paciente'].toLowerCase()) { return 1 }
        return 0
    }
    const prev = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            refFirst.current.scrollLeft = scrollLeft - itemWidth;
        });
    };

    const next = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            console.log(itemWidth)
            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };

    useEffect(() => {
        readUserData('Pedido', user.uuid, setUserPedidos, 'distribuidor')
    }, [])

    return (
        <div className='h-full'>
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de eliminar el pedido del siguiente paciente:  {item['nombre del paciente']}</Modal>}
            {modal === 'Guardando' && <LoaderBlack />}

            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smoot" ref={refFirst}>

                <h3 className='font-medium text-[16px]'>Pedidos</h3>
                <div className='flex justify-center w-full'>
                    <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre o correo' />
                </div>
                <div className=' flex justify-start items-center my-5 '>
                    <h3 className="flex pr-12 text-[14px]" htmlFor="">Debitos</h3>
                    <div className="grid grid-cols-2 gap-4 w-[300px] ">
                        <Tag theme={debito == 'Correcto' ? 'Primary' : 'Secondary'} click={() => setDebito(debito == 'Correcto' ? '' : 'Correcto')}>Sin deuda</Tag>
                        <Tag theme={debito == 'Inconcluso' ? 'Primary' : 'Secondary'} click={() => setDebito(debito == 'Inconcluso' ? '' : 'Inconcluso')}>Sin cancelar</Tag>
                    </div>
                </div>
                <div className=' flex justify-start items-center w-[500px] my-5  '>
                    <h3 className="flex pr-12 text-[14px]">Estado de envios</h3>
                    <div className="grid grid-cols-3 gap-4 w-[500px] " >
                        <Tag theme={envio == 'Pendiente' ? 'Primary' : 'Secondary'} click={() => setEnvio(envio == 'Pendiente' ? '' : 'Pendiente')}>Pendiente</Tag>
                        <Tag theme={envio == 'Atendido' ? 'Primary' : 'Secondary'} click={() => setEnvio(envio == 'Atendido' ? '' : 'Atendido')}>Atendido</Tag>
                        <Tag theme={envio == 'Felicitaciones' ? 'Primary' : 'Secondary'} click={() => setEnvio(envio == 'Felicitaciones' ? '' : 'Felicitaciones')}>Felicitaciones</Tag>
                    </div>
                </div>

                <table className="w-full min-w-[1700px] border-[1px] border-t-4 border-t-gray-400">
                    <thead className="w-full text-[14px] text-gray-900 uppercase border-b bg-gray-100">
                        <tr>
                            <th scope="col-3" className="px-3 py-3 text-center font-bold border-r">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Debito
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Estado
                            </th>
                            <th scope="col-3" className="px-3 py-3 font-bold border-r">
                                Paciente
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Producto
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Ciudad / Provincia
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Costo
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Celular Paciente
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Celular Referencia
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Correo
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Fecha
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold">
                                Guardar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos && pedidos !== undefined && pedidos.sort(sortArray).map((i, index) => {
                            return i['nombre del paciente'].toLowerCase().includes(filter.toLowerCase()) && i.estado.includes(envio) && i.message.includes(debito) && <tr className="text-[14px] border-b hover:bg-gray-50" key={index}>
                                <td className="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="w-[150px] px-3 py-4 text-gray-900 text-center border-r">
                                    <button className={`px-3 py-4 font-semibold  w-full text-center rounded-full ${i.message == 'Correcto' ? 'bg-[#32CD32] text-gray-900' : 'bg-red-500 text-white'}`} onClick={e => confeti(i)}>
                                        {i['message'] === 'Correcto' ? 'Sin deuda' : 'Sin cancelar'}
                                    </button>
                                </td>
                                <td className="w-[150px] px-3 py-4 text-gray-900 border-r">
                                    <Select arr={['Pendiente', 'Atendido', 'Felicitaciones']} name='estado' defaultValue={i.estado} uuid={i.idBCP} click={onClickHandlerCategory} />
                                    {/* {i['costo']} */}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {i['nombre del paciente']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {JSON.parse(i.compra).map((el, index) => <li key={index}>{el['nombre de producto 1']}{' *('}{el['cantidad']}{')'}</li>)}
                                </td>

                                <td className="px-3 py-4 text-gray-900 text-center border-r">
                                    {i['check'] == true ? 'Provincia' : 'Ciudad'}
                                </td>

                                <td className="w-[100px] px-3 py-4 text-gray-900 border-r">
                                    {i['amount']} Bs
                                </td>

                                <td className="w-[150px] px-3 py-4 text-gray-900 text-center border-r">
                                    {i['celular del paciente']}
                                </td>
                                <td className="w-[150px] px-3 py-4 text-gray-900 text-center border-r">
                                    {i['referencia del paciente']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {i['correo']}
                                </td>
                                <td className="w-[100px] px-3 py-4 text-gray-900 border-r">
                                    {getDayMonthYear(i['created_at'])}
                                </td>
                                <td className="w-[150px] px-3 py-4 text-gray-900">
                                    {state[i.idBCP]
                                        ? <Button theme={"Primary"} click={() => save(i.idBCP)}>Guardar</Button>
                                        : <Button theme={"Disable"}>Guardar</Button>
                                    }
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




export default WithAuth(Home)














'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState, useRef } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData, readUserAllData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { getDayMonthYear } from '@/utils/DateFormat'
import Modal from '@/components/Modal'
import LoaderBlack from '@/components/LoaderBlack'


function Home() {
    const { user, userDB, distributorPDB, setUserDistributorPDB, pedidos, setUserPedidos, item, setUserItem, setUserData, setUserSuccess, cart, modal, setModal } = useUser()
    const router = useRouter()
    const [state, setState] = useState({})
    const refFirst = useRef(null);

    function delet(i) {
        setUserItem(i)
        setModal('Delete')
        console.log(item)
    }

    async function deletConfirm() {
        await deleteUserData('Pedido', item.idBCP, 'idBCP')
        userDB && userDB[0].access === 'Verificadora' && userDB[0]['ID Verificador']
            ? readUserData('Pedido', userDB[0]['ID Verificador'], setUserPedidos, 'cliente')
            : readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')
        setModal('')
    }

    function calculator(data) {
        const val = Object.values(data).reduce((acc, i, index) => {
            const sum = i['costo'] * i['cantidad']
            return sum + acc
        }, 0)
        return val
    }
    async function save(i) {
        setUserItem(i)
        setModal('Save')
        console.log(state[i.idBCP].autorizacion)
    }

    async function saveConfirm() {
        console.log(state[item.idBCP])
        setModal('Guardando')
        const object = {
            ...state[item.idBCP], ['nombre cliente']: userDB[0].nombre, ['uuid autorizadora']: user.uuid, rol: user.rol
        }
        await updateUserData('Pedido', object, item.idBCP, 'idBCP')
        const obj = { ...state }
        delete obj[item.idBCP]
        setState(obj)


        userDB && userDB[0].access === 'Verificadora' && userDB[0]['ID Verificador']
            ? await readUserData('Pedido', userDB[0]['ID Verificador'], setUserPedidos, 'cliente')
            : await readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')


        await readUserData('Pedido', user.uuid, setUserDistributorPDB, 'Clinica')
        setModal('')
    }
    function cancelHandler() {
        // const obj = { ...state }
        // delete obj[item.idBCP]
        // setState(obj)
    }
    function confeti(i) {
        console.log('ped')
        i.message === 'Correcto'
            ? router.push(`/Cliente/Comprar/Detalle?idBCP=${i.idBCP}`)
            : router.push(`/Cliente/Comprar/Qr?idBCP=${i.idBCP}`)
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

    // const scrollToTop = () => {
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth',
    //     });
    //   };
    console.log(userDB)

    // window.onbeforeunload = function () {
    //     // return "¿Desea recargar la página web?";
    //     alert('Estas seguro de finalizar la  Compra')
    //   };

    const onClickHandlerCategory = (name, value, idBCP) => {
        setState({ ...state, [idBCP]: { ...state[idBCP], idBCP, ['autorizacion']: value } })
    }


    console.log(state)


    useEffect(() => {
        userDB && userDB[0].access === 'Verificadora' && userDB[0]['ID Verificador']
            ? readUserData('Pedido', userDB[0]['ID Verificador'], setUserPedidos, 'cliente')
            : readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')
    }, [userDB])

    return (
        <div className='h-full'>
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de eliminar el pedido del siguiente paciente:  {item['nombre del paciente']}</Modal>}
            {modal === 'Save' && <Modal funcion={saveConfirm} cancel={cancelHandler}>
                Estas seguro de {state[item.idBCP].autorizacion === 'Autorizado' && 'AUTORIZAR'} {state[item.idBCP].autorizacion === 'Rechazado' && 'RECHAZAR'} {state[item.idBCP].autorizacion === 'Pendiente' && 'autorizar'} {state[item.idBCP].autorizacion === 'Pendiente' && 'POSPONER'}el pedido del siguiente paciente:  {item['nombre del paciente']}
            </Modal>}
            {modal === 'Guardando' && <LoaderBlack />}

            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smoot" ref={refFirst}>
                <table className="relative w-[1800px]  border-[1px] border-t-4 border-t-gray-400">
                    <thead className="w-full text-[14px] text-gray-900 uppercase border-b bg-gray-100">
                        <tr>
                            <th scope="col-3" className="px-3 py-3 text-center font-bold border-r">
                                #
                            </th>
                            <th scope="col-3" className="px-3 py-3 text-center font-bold border-r">
                                Autorizacion
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Debito
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Estado / <br /> Envio
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Paciente
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Producto
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Ciudad / <br /> Provincia
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Costo
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                a cuenta
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                saldo
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Empresa
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Contacto
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Fecha
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold">
                                Editar
                            </th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {pedidos && pedidos !== undefined && pedidos.sort(sortArray).map((i, index) => {
                            return <tr className="text-[14px] border-b hover:bg-gray-50" key={index}>
                                <td className="px-3 py-4 text-gray-900 text-center font-bold border-r">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="px-3 py-4 w-[200px] text-gray-900 text-center border-r">
                                    {userDB && userDB[0].access === 'Verificadora' && userDB[0]['ID Verificador'] && i.estado === 'Pendiente'
                                        ? <Select arr={['Pendiente', 'Rechazado', 'Autorizado']} name='autorizacion' defaultValue={i.autorizacion} uuid={i.idBCP} click={onClickHandlerCategory} />
                                        : <span className={`inline-block px-3 py-4 font-semibold  w-[150px] text-center rounded-full ${i.autorizacion == 'Rechazado' && 'bg-red-400'} ${i.autorizacion == 'Autorizado' && 'bg-green-300'} ${i.autorizacion == 'Pendiente' && 'bg-gray-400'}`}>
                                            {i['autorizacion']}
                                        </span>}
                                </td>
                                <td className="px-3 py-4 text-gray-900 text-center border-r">
                                    <button className={`inline-block px-3 py-4 font-semibold  w-[150px] text-center rounded-full ${i.message == 'Correcto' ? 'bg-[#32CD32] text-gray-900' : 'bg-red-500 text-white'}`} onClick={e => confeti(i)}>
                                        {i['message'] === 'Correcto' ? 'Sin deuda' : 'Sin cancelar'}
                                    </button>
                                </td>
                                <td className={`px-3 py-4 text-gray-900 text-center border-r`}>
                                    {/* <Select arr={['Nuevo', 'Atendido', 'Felicitaciones']} name='estado' defaultValue={i.estado} uuid={i.uuid} click={onClickHandlerCategory} /> */}
                                    <span className={`inline-block px-3 py-4 font-semibold  w-[150px] text-gray-900   rounded-full ${i.estado == 'Pendiente' && 'bg-gray-400'} ${i.estado == 'Felicitaciones' && 'bg-green-400'} ${i.estado == 'Atendido' && 'bg-yellow-300'}`}>{i['estado']}</span>
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {i['nombre del paciente']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {JSON.parse(i.compra).map((el, index) => <li key={index}>{el['nombre de producto 1']}{' *('}{el['cantidad']}{')'}</li>)}
                                </td>
                                <td className="px-3 py-4 text-center  text-gray-900 text-center border-r">
                                    {i['check'] == true ? 'Provincia' : 'Ciudad'}
                                </td>
                                <td className="px-3 py-4 text-center  text-gray-900 text-center border-r">
                                    {i.costo} Bs
                                </td>
                               
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {i['amount']} Bs
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {i.costo - i.amount} Bs
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {i['empresa']}
                                </td>
                                <td className="w-[150px] px-3 py-4 text-gray-900 border-r">
                                    {i['whatsapp']}
                                </td>
                                <td className="w-[100px] px-3 py-4 text-gray-900 text-center border-r">
                                    {getDayMonthYear(i['created_at'])}
                                </td>
                                <td className="w-[150px] px-3 py-4 text-gray-900 text-center border-r">

                                    {state[i.idBCP]
                                        ? (i.estado === 'Atendido' ? 'No permitido' : <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>)
                                        : (userDB[0].access === 'Verificadora'
                                            ? (i.estado === 'Atendido' ? 'No permitido' : <Button theme={"Disable"} >Guardar</Button>)
                                            : (i.autorizacion === 'Pendiente' || i.autorizacion === 'Rechazado') && i.estado === 'Pendiente'
                                                ? <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                                                : 'no permitido')
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



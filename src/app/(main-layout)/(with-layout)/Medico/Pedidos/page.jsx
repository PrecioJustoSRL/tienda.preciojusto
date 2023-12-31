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


function Home() {
    const { user, userDB, distributorPDB, setUserDistributorPDB, pedidos, setUserPedidos, setUserItem, setUserData, setUserSuccess, cart, modal,setModal, item, } = useUser()
    const router = useRouter()
    const [state, setState] = useState({})
    const refFirst = useRef(null);
    const [envio, setEnvio] = useState('')



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

    function calculator(data) {
        const val = Object.values(data).reduce((acc, i, index) => {
            const sum = i['costo'] * i['cantidad']
            return sum + acc
        }, 0)
        return val
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
    console.log(cart)

    // window.onbeforeunload = function () {
    //     // return "¿Desea recargar la página web?";
    //     alert('Estas seguro de finalizar la  Compra')
    //   };






    useEffect(() => {
        readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')
    }, [])

    return (
        <div className='h-full'>
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de eliminar el pedido del siguiente paciente:  {item['nombre del paciente']}</Modal>}

            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smoot" ref={refFirst}>
                <h3 className='font-medium text-[16px]'>Pedidos</h3>

                <div className=' flex justify-start items-center w-[500px] my-5  '>
                    <h3 className="flex pr-12 text-[14px]">Estado de envios</h3>
                    <div className="grid grid-cols-3 gap-4 w-[500px] " >
                        <Tag theme={envio == 'Pendiente' ? 'Primary' : 'Secondary'} click={() => setEnvio(envio == 'Pendiente' ? '' : 'Pendiente')}>Pendiente</Tag>
                        <Tag theme={envio == 'Atendido' ? 'Primary' : 'Secondary'} click={() => setEnvio(envio == 'Atendido' ? '' : 'Atendido')}>Atendido</Tag>
                        <Tag theme={envio == 'Felicitaciones' ? 'Primary' : 'Secondary'} click={() => setEnvio(envio == 'Felicitaciones' ? '' : 'Felicitaciones')}>Felicitaciones</Tag>
                    </div>
                </div>

                <table className="w-full min-w-[1100px] border-[1px] border-t-4 border-t-gray-400">
                    <thead className="w-full text-[14px] text-gray-900 uppercase border-b bg-gray-100">
                        <tr>
                            <th scope="col-3" className="px-3 py-3 text-center font-bold border-r">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Debito
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold border-r">
                                Estado
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
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Empresa
                            </th>
                            <th scope="col" className="px-3 py-3 font-bold border-r">
                                Contacto
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold">
                                Fecha
                            </th>
                            <th scope="col" className="px-3 py-3 text-center font-bold">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {pedidos && pedidos !== undefined && pedidos.sort(sortArray).map((i, index) => {
                            return i.estado.includes(envio) && <tr className="text-[14px] border-b hover:bg-gray-50" key={index}>
                                <td className="px-3 py-4 text-gray-900 text-center font-bold border-r">
                                    {index + 1}
                                </td>
                                <td className="px-3 py-4 text-gray-900 text-center border-r">
                                    <button className={`w-[130px] px-3 py-4 text-center rounded-full cursor-pointer ${i.message == 'Correcto' ? 'bg-[#32CD32] text-gray-900' : 'bg-red-500 text-white'}`} onClick={e => confeti(i)}>
                                        {i['message'] === 'Correcto' ? 'Sin deuda' : 'Sin cancelar'}
                                    </button>
                                </td>
                                <td className="px-3 py-4 text-gray-900 text-center  border-r">
                                    <span className={`inline-block w-[130px] px-3 py-4 text-gray-900 rounded-full ${i.estado == 'Pendiente' && 'bg-gray-400'} ${i.estado == 'Felicitaciones' && 'bg-green-400'} ${i.estado == 'Atendido' && 'bg-yellow-300'}`}>{i['estado']}</span>
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
                                <td className="px-3 py-4 text-gray-900 text-center border-r">
                                    {calculator(JSON.parse(i.compra)) * 1 + (i['check'] == true ? 350 : 0)} Bs
                                </td>
                                <td className="px-3 py-4 text-gray-900 border-r">
                                    {i['empresa']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 text-center border-r">
                                    {i['whatsapp']}
                                </td>
                                <td className="w-[100px] px-3 py-4 text-gray-900 text-center border-r">
                                    {i.fecha}
                                </td>
                                <td className="w-[150px] px-3 py-4 text-gray-900 text-center border-r">
                                    {i.estado === 'Pendiente' && i.message !== 'Correcto'
                                        ? <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                                        : 'No permitido'
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

export default Home



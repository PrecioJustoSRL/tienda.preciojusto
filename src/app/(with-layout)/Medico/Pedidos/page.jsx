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


function Home() {
    const { user, userDB, distributorPDB, setUserDistributorPDB, pedidos, setUserPedidos, setUserItem, setUserData, setUserSuccess, cart } = useUser()
    const router = useRouter()
    const [state, setState] = useState({})
    const refFirst = useRef(null);



    function delet(i) {
        deleteUserData('Pedido', i.uuid)
        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
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
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smoot" ref={refFirst}>
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
                            {/* <th scope="col" className="px-3 py-3 text-center">
                            Eliminar
                        </th> */}
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {pedidos && pedidos !== undefined && pedidos.map((i, index) => {
                            return <tr className="text-[14px] border-b hover:bg-gray-50" key={index}>
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
                                {/* 
                            <td className="px-3 py-4">
                                {state[i.uuid]
                                    ? <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>
                                    : <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                                }
                            </td> */}
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



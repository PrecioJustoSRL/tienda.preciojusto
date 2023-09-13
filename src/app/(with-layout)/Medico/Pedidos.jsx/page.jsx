'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData, readUserAllData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { getDayMonthYear } from '@/utils/DateFormat'


function Home() {
    const { user, userDB, distributorPDB, setUserDistributorPDB, pedidos, setUserPedidos, setUserItem, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
  
   

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


    function confeti (i) {
        console.log(i)
        i.message === 'Correcto' 
        ? router.push(`/Cliente/Comprar/Detalle?idBCP=${i.idBCP}`)
        : router.push(`/Cliente/Comprar/Qr?idBCP=${i.idBCP}`)
    }



    console.log(state)
    useEffect(() => {
        readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')
    }, [])

    return (

        <div className="relative overflow-x-auto shadow-2xl  ">
            <table className=" min-w-[1200px] lg:w-full bg-white lg:min-w-[1000px] text-[12px] text-left text-gray-500 border-t-4 border-t-gray-400">
                <thead className="w-full text-[12px]  text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col-3" className="px-3 py-3 text-center">
                            #
                        </th>
                        <th scope="col-3" className="px-3 py-3 text-center">
                            Paciente
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Producto
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Ciudad/Provincia
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Estado
                        </th>

                        <th scope="col" className="px-3 py-3 text-center">
                            Costo
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Debito
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Fecha
                        </th>
                        {/* <th scope="col" className="px-3 py-3 text-center">
                            Eliminar
                        </th> */}
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {pedidos && pedidos !== undefined && pedidos.map((i, index) => {
                        return <tr className="text-[12px] border-b hover:bg-gray-50" key={index}>
                            <td className="px-3 py-4  flex font-semibold  text-gray-900  text-center">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td className="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {i['nombre del paciente']}
                            </td>
                            <td className="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {JSON.parse(i.compra).map((el, index) => <li key={index}>{el['nombre de producto 1']}{' *('}{el['cantidad']}{')'}</li>)}
                            </td>
                            <td className="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {i['check'] == true ? 'Provincia' : 'Ciudad'}
                            </td>
                            <td className={`px-3 py-4 font-semibold text-gray-900   flex justify-center w-full`}>
                                {/* <Select arr={['Nuevo', 'Atendido', 'Felicitaciones']} name='estado' defaultValue={i.estado} uuid={i.uuid} click={onClickHandlerCategory} /> */}
                                <span className={`px-3 py-4 font-semibold text-gray-900   rounded-full ${i.estado == 'Pendiente' && 'bg-gray-400'} ${i.estado == 'Felicitaciones' && 'bg-green-400'} ${i.estado == 'Atendido' && 'bg-yellow-300'}`}>{i['estado']}</span>
                            </td>
                            <td className="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {calculator(JSON.parse(i.compra)) * 1 + (i['check'] == true ? 350 : 0)}
                            </td>
                            <td className="px-3 py-4 font-semibold  text-gray-900  text-center cursor-pointer ">
                                <button className={`px-3 py-4 font-semibold  w-[100px] text-center rounded-full ${i.message == 'Correcto'?'bg-[#32CD32] text-gray-900':'bg-red-500 text-white'}`} onClick={e=>confeti(i)}>
                                {i['message'] === 'Correcto' ? 'Sin deuda' : 'Sin cancelar'} 
                                </button>
                            </td>
                            <td className="px-3 py-4 h-full font-semibold  text-gray-900  text-center">
                                {getDayMonthYear(i['created_at'])}
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

    )
}

export default WithAuth(Home)



'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import style from './Select.module.css'
import { useUser } from '@/context/Context.js'
import Tolkipt from '@/components/Tolkipt'

export default function Select({ arr, name, click, defaultValue, uuid }) {
    const { setFilterDis, user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, cart, setUserCart, modal, setModal, setFilter, success } = useUser()

    const router = useRouter()

    const [select, setSelect] = useState(false)
    const [state, setState] = useState(defaultValue ? defaultValue : arr[0])

    function handlerSelect() {
        setSelect(!select)
    }

    function handlerUserState(name, i) {
        setState(i)
        click(name, i, uuid)
    }



    return (

        <div className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full  `} onClick={handlerSelect}>
            {arr.includes('Chuquisaca') && <div className='absolute w-full top-[-130px]'>
                {success == 'Importand' && <Tolkipt>Esta información es importante,<br /> por favor revisa que sea correcta.</Tolkipt>}
            </div>}
            <div className={`p-3 font-semibold rounded-xl ${state == 'No disponible' && 'bg-red-400'} ${state == 'Inmediata' && 'bg-green-400'}  ${state == 'En 24 hrs' && 'bg-yellow-400'}  ${state == 'Rechazado' && 'bg-red-400'} ${state == 'Autorizado' && 'bg-green-300'} ${state == 'Pendiente' && 'bg-gray-400'} ${state == 'Felicitaciones' && 'bg-green-400'} ${state == 'Atendido' && 'bg-yellow-300'}`}>
                {state} <span className={select ? 'font-semibold absolute right-5 rotate-[270deg]' : 'font-semibold absolute right-5 rotate-90'}>{'>'}</span>
            </div>
            <ul className={select ? `py-3 absolute h-[150px] overflow-y-auto  left-0 top-12 bg-gray-50 outline outline-1 outline-gray-300 text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full z-50` : 'hidden'} >
                {
                    arr.map((i, index) => <li key={i} className={`mb-2 cursor-pointer py-2 px-3 font-semibold ${index % 2 === 0 ? 'bg-gray-100' : ''}`} onClick={() => handlerUserState(name, i)}>{i}</li>)
                }
            </ul>
        </div>
    )
}















'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Modal from '@/components/Modal'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState, useRef } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import dynamic from "next/dynamic";
import QRCode from "qrcode.react";

const InvoicePDF = dynamic(() => import("@/components/recetaPDF"), {
    ssr: false,
  });

function Home() {
    const { user, userDB, modal, setModal, msg, setMsg, recetaDBP, setRecetaDBP, setUserItem, item, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);

    function onChangeFilter(e) {
        setFilter(e.target.value.toLowerCase())
    }

    function onChangeHandler(e, i) {
        console.log(i)
        setState({ ...state, [i.qr]: { ...state[i.qr], qr: i.qr, [e.target.name]: e.target.value } })
    }

    function save(e, i) {
        console.log(state[i.qr])
        e.preventDefault()
        updateUserData('Receta', state[i.qr], i.qr, 'qr')
        const obj = { ...state }
        delete obj[i.qr]
        setState(obj)
    }
    function delet(i, data) {
        setUserItem(i)
        setModal(data)
    }
    async function deletConfirm(e) {
        e.preventDefault()
        await deleteUserData('Receta', item.qr, 'qr')
        readUserData('Receta', user.uuid, setRecetaDBP, 'medico',)

        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
        setModal('')
    }
    function sortArray(x, y) {
        if (x['paciente'].toLowerCase() < y['paciente'].toLowerCase()) { return -1 }
        if (x['paciente'].toLowerCase() > y['paciente'].toLowerCase()) { return 1 }
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

    console.log(recetaDBP)

    useEffect(() => {
        readUserData('Receta', user.uuid, setRecetaDBP, 'medico')
    }, [])

    return (

        <div className='h-full'>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smoot" ref={refFirst}>
                {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario {msg}</Modal>}
                <h3 className='font-medium text-[16px]'>Recetas</h3>
                <br />
                <div className='flex justify-center w-full'>
                    <input type="text" className='border-b text-[16px] border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeFilter} placeholder='Filtrar por nombre de paciente' />
                </div>
                <br />
                <table className="w-full min-w-[1800px] text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
                    <thead className="text-[12px] text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-3 py-3 text-[16px]">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3 text-[16px]">
                                Paciente
                            </th>
                            <th scope="col" className="px-3 py-3 text-[16px]">
                                Diagnostico
                            </th>
                            <th scope="col" className="px-3 py-3 text-[16px]">
                                Hospital
                            </th>
                            <th scope="col" className="px-3 py-3 text-[16px]">
                                Receta
                            </th>
                            <th scope="col" className="px-24 py-3 text-[16px]">
                                QR
                            </th>
                            <th scope="col" className="px-3 py-3 text-[16px]">
                                PDF
                            </th>
                            <th scope="col" className="px-6 py-3 text-[16px] text-center">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recetaDBP && recetaDBP !== undefined && recetaDBP.sort(sortArray).map((i, index) => {
                            return i.paciente.toLowerCase().includes(filter) && <tr className="bg-white text-[12px] border-b  hover:bg-gray-50 " key={index}>
                                <td className="px-3 py-4 align-top  text-gray-900  text-[16px]">
                                    {index + 1}
                                </td>
                             

                                <td className="px-3 py-4 align-top  text-gray-900  text-[16px]">
                                    {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='paciente' defaultValue={i['paciente']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea> */}
                                    {i['paciente']}
                                </td>
                                <td className="px-3 py-4 align-top text-gray-900  text-[16px]">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='diagnostico' defaultValue={i['diagnostico']} className="block p-0  w-full h-full text-gray-900  text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['diagnostico']} */}
                                </td>
                                <td className="px-3 py-4 align-top text-gray-900  text-[16px]">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='hospital' defaultValue={i['hospital']} className="block p-0  w-full h-full text-gray-900  text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['hospital']} */}
                                </td>
                                <td className="px-3 py-4 align-top text-gray-900   text-[16px]">
                                    {JSON.parse(i.receta).map((i, index) =>
                                        <li>{i['nombre de producto 1']}{'  (*'}{i['cantidad']}{')'}</li>
                                    )}
                                </td>
                                <td className="px-3 py-4 font-semibold  text-gray-900  text-center cursor-pointer ">
                                    <div className='w-[150px] h-[150px]'>
                                         <QRCode
                                            id='qr'
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%", border: '10px', backgroundColor: 'white' }}
                                            value={i.qr}
                                            level={'H'}
                                            includeMargin={true}
                                            renderAs={'canvas'}
                                            viewBox={`0 0 256 256`}
                                            imageSettings={{ src: '/logo-circle.png', height: 100, width: 100, escavate: false }}
                                        />
                                    </div>
                                </td>
                                <td className="w-[250px] px-3 py-4 font-semibold  text-gray-900  text-center cursor-pointer ">
                                    <InvoicePDF userDB={user} cartDB={JSON.parse(i.receta)} dbUrl={i.qr} recetaPDB={i} />
                                </td>
                                <td className="px-3 align-top py-4">
                                    {state[i.qr]
                                        ? <Button theme={"Primary"} click={(e) => save(e, i)}>Guardar</Button>
                                        : <Button theme={"Danger"} click={() => delet(i, 'Delete')}>Eliminar</Button>
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

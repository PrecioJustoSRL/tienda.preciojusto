'use client';
import { useState, useEffect } from 'react'
import Button from '@/components/Button';
import { useUser } from '@/context/Context.js'
import Title from '@/components/Title'
import { WithAuth } from '@/HOCs/WithAuth'
import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import Page from '@/components/Page'
import Label from '@/components/Label'
import MiniCard from '@/components/MiniCard'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import Msg from "@/components/Msg"
import { useMask } from '@react-input/mask';
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/supabase/config'


const InvoicePDF = dynamic(() => import("@/components/ProformaPDF"), {
    ssr: false,
});

function Comprar({ theme, styled, click, children }) {

    const { user, userDB, cart, productDB, setUserProduct, setUserItem, setUserData, setUserSuccess, setUserCart, success, state, setState, modal, setModal, qrBCP, setQrBCP, paySuccess, setPaySuccess } = useUser()
    const [dataQR, setDataQR] = useState(undefined)
    const router = useRouter()

    const searchParams = useSearchParams()
    const idBCP = searchParams.get('idBCP')
    const idBCPdiferido = searchParams.get('idBCPdiferido')

    // console.log(idBCP)




    function closeModal() {

        // console.log(window.location.href.includes('Comprar/'))
        // window.location.href.includes('Comprar/')
        // ? router.replace('/')
        router.back()
        setUserCart({})
        setState({})
        // router.back()
    }













    const requestQR = async () => {
        if (userDB.autorizacion === false) {
            setModal('RequireAutorization')
            return
        }

        const res = await readUserData('Pedido', idBCP ? idBCP : idBCPdiferido, null,  idBCP ? 'idBCP' : 'idBCPdiferido')
        // console.log(res)
        if (idBCPdiferido) {
            router.replace(`/Cliente/Comprar/Qr?idBCP=${res[0].idBCP}`)
            return

        }
        // console.log(res[0].idBCPdiferido)
        if (res && res[0] && res[0].idBCPdiferido) {
            router.replace(`/Cliente/Comprar/Qr?idBCPdiferido=${res[0].idBCPdiferido}`)
            return
        }

        try {
            console.log('her')
            //**********************BCP*************************
            const res = await fetch(window.location.href.includes('https') ? 'https://tienda.preciojusto.pro/api' : 'http://localhost:3000/api', {
                method: 'POST',
                body: JSON.stringify({ amount: 0 }),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                })
            })
            const data = await res.json()
            setQrBCP(data.data)
            // setQrBCP(data.data.qrImage)

            const write = {
                idBCPdiferido: data.data.id,
                expirationDiferido: data.data.expirationDate,
                amountDiferido: 0,
                messageDiferido: 'Inconcluso',
                qrBase64diferido: data.data
            }

            // console.log(write)
            await updateUserData('Pedido', write, idBCP, 'idBCP')

            router.replace(`/Cliente/Comprar/Qr?idBCPdiferido=${data.data.id}`)


            return setModal('')
        } catch (err) {
            // console.log(err)
        }
    }
















    async function verify() {
        setModal('verify')


        const res = await readUserData('Pedido', idBCP ? idBCP : idBCPdiferido, null, idBCP ?'idBCP':'idBCPdiferido')
        console.log(res)
        // console.log(idBCP? JSON.parse(res[0].qrBase64) : JSON.parse(res[0].qrBase64diferido))
        setDataQR(idBCP? JSON.parse(res[0].qrBase64) : JSON.parse(res[0].qrBase64diferido))
        res[0].message === 'Correcto' && router.push(`/Cliente/Comprar/Detalle?idBCP=${idBCP}`)
        // const mySuscription = supabase
        // .from('*')
        // .on('*',{event: 'UPDATE', schema: 'public'},(payload)=>{
        // console.log('change recieved')
        // })
        // .subscribe()
        setModal('')
    }


console.log(dataQR && `data:image/png;base64,${dataQR.qrImage}`)
console.log(dataQR)
    



    useEffect(() => {
    (idBCP || idBCPdiferido )&& verify()
    }, [idBCP]);

    return (<div className='w-full min-h-screen relative px-5 pb-[50px] bg-gray-100'>
        {success == 'Complete' && <Msg>Complete el formulario</Msg>}
       

        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#000000c2] z-40">
            <div className='relative p-10 bg-white'>
                <button type="button" className="absolute top-3 right-2.5 text-gray-600 bg-gray-200 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white p-3" onClick={closeModal}>
                    <span className='text-[12px] text-gray-600  pr-5'>Finalizar </span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <br />

                {userDB && userDB.access == 'Solicitadora' ? 'Comparte el Qr con tu verficador para acelerar la compra' : 'Paga por QR y adquiere tus productos'}
                <br />
                {
                    dataQR !== undefined
                        ? (modal === 'verify'
                            ? <div aria-label="Loading..." role="status" className=" h-[80vw] max-h-[300px] w-[80vw] max-w-[300px] flex items-center justify-center space-x-2 py-10">
                                <svg className="h-5 w-5 animate-spin stroke-gray-950" viewBox="0 0 256 256"><line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line></svg>
                                <span className="text-[12px] text-gray-950">Verificando...</span>
                            </div>
                            : <img src={`data:image/png;base64,${dataQR.qrImage}`} className='relative left-0 right-0 mx-auto h-[80vw] max-h-[300px] w-[80vw] max-w-[300px]' alt="" />)
                        : <div aria-label="Loading..." role="status" className=" h-[80vw] max-h-[300px] w-[80vw] max-w-[300px] flex items-center justify-center space-x-2 py-10">
                            <svg className="h-5 w-5 animate-spin stroke-gray-950" viewBox="0 0 256 256"><line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line></svg>
                            <span className="text-[12px] text-gray-950">Generando QR...</span>
                        </div>
                }
                <br />
                {dataQR !== undefined && <a
                    className="block text-gray-950 w-full rounded-full bg-[#32CD32] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-[14px]  py-4 text-center z-50"
                    href={`data:image/png;base64,${dataQR.qrImage}`} download>Guardar ImagenQR</a>}
               
                {user.rol === 'Clinica' && dataQR !== undefined && 
                 <>
                 <br />
                 <button
                    className="block text-gray-950 w-full rounded-full bg-[#32CD32] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-[14px]  py-4 text-center z-50"
                    onClick={requestQR}
                >{idBCP ? 'Pagar por diferido': 'Pagar al contado '}</button>
                 </>}
                <br />
                {dataQR !== undefined && <button
                    className="block text-gray-950 w-full rounded-full bg-[#32CD32] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-[14px]  py-4 text-center z-50"
                    onClick={verify}
                >Verificar estado de cancelación</button>}
            </div>
        </div>


        <br />
        <br />

    </div>)
}

export default WithAuth(Comprar)

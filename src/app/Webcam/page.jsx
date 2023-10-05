'use client';
import { useState, useEffect } from 'react'
import { useUser } from '@/context/Context.js'
import { WithAuth } from '@/HOCs/WithAuth'
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import WebCam from '@/components/WebCam'


function Comprar({ theme, styled, click, children }) {

    const { filterDis, setFilterDis,
        user, userDB, cart, setUserCart,
        modal, setUserData,
        setModal, productDB,
        setUserProduct, setUserPedidos, setUserItem, item, filter, setFilter, filterQR, setTienda, setFilterQR, recetaDBP, setRecetaDBP, tienda, setIntroClientVideo, search, setSearch, distributorPDB, setUserDistributorPDB, webScann, setWebScann,
        qrBCP, setQrBCP,
        ultimoPedido, setUltimoPedido } = useUser()
    const [dataQR, setDataQR] = useState(undefined)
    const router = useRouter()

   




    function closeModal() {
        router.replace('/')
    }


useEffect(() => {
    filterQR !== '' ? router.replace('/'):''
}, [filterQR]);

       

    return ( <div className={` w-screen h-screen fixed top-0 flex items-center justify-center left-0 bg-[#000000C2] z-50`}>
        <button type="button" className="absolute z-50 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
        </button>

                <WebCam></WebCam>

    </div>)
}

export default Comprar

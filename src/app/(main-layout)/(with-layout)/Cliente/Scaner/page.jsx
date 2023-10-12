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
import QRscanner from '@/components/QRscanner'


const InvoicePDF = dynamic(() => import("@/components/ProformaPDF"), {
    ssr: false,
});

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
        router.replace('/Cliente')
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

        <QRscanner></QRscanner>

    </div>)
}

export default WithAuth(Comprar)

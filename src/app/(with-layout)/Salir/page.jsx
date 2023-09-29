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
import Modal from "@/components/Modal"
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

   

function closeApp () {
    window.close()
}


    function closeModal() {
        router.replace('/')
    }


useEffect(() => {
    filterQR !== '' ? router.replace('/'):''
}, [filterQR]);



    return ( <div className={` w-screen h-screen fixed top-0 flex items-center justify-center left-0 bg-[#000000C2] z-50`}>
     <Modal funcion={closeApp} cancel={closeModal}>Estas Seguro de salir de la aplicación</Modal>
    </div>)
}

export default WithAuth(Comprar)

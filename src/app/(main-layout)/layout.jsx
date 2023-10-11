'use client'
import { useUser } from '@/context/Context'
import { readUserAllData, updateUserData, readUserData } from '@/supabase/utils'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { onAuth } from '@/supabase/utils'
function Home({ children }) {
  const router = useRouter()
  const { user, userDB, setUserProfile, setUserCart, businessData, setUserProduct, setRecetaDB, precioJustoPDB, setPrecioJustoPDB, whatsapp, setWhatsapp, setUserData, filter, setFilter, nav, setNav, modal, setModal, cart, introClientVideo, setIntroClientVideo, recetaDBP, setRecetaDBP, productDB, search, setSearch, videoClientRef, setFilterQR, webScann, setWebScann, setTienda, setBusinessData, isBack, setBack } = useUser()
  const pathname = usePathname()

  useEffect(() => {
    console.log('layout cliente')
    if (user === undefined) onAuth(setUserProfile)
    if (user === null) {
      router.push('/Login')
    }
    if (user && user.role === 'authenticated') { router.push('/Register') }
    if (user !== undefined && user !== null && user.rol !== undefined && user.rol !== null) {
      router.push('/Cliente')
    }
    if (user !== undefined && user !== null && user.rol !== undefined && user.rol !== null && userDB === undefined) {
      readUserData(user.rol, user.uuid, setUserData, null, true)
    }
    if (user !== undefined && user !== null && user.rol && businessData === undefined) {
      readUserData('Administrador', 'b9fe0a69-b218-4689-b4ac-03f52e8fe4cc', setBusinessData, null, true)
    }
    if (user !== undefined && user !== null && user.rol && businessData === undefined) {
      readUserData('Producto', 'Precio-Justo-SRL-Data', setPrecioJustoPDB, 'distribuidor')
    }
    user !== undefined && user !== null && readUserData('Producto', user.ciudad, setUserProduct, 'ciudad')
  }, [user, userDB, businessData])

  return children
}

export default Home


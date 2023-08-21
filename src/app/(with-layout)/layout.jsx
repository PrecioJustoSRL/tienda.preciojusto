'use client'
import { useUser } from '@/context/Context'
import { readUserAllData, updateUserData, readUserData } from '@/supabase/utils'

import { useState, useEffect } from 'react'
import style from './Medico.module.css'
import { signOut } from '@/supabase/utils'
import { useRouter } from 'next/navigation';
import Cart from '@/components/Cart'
import { WithAuth } from '@/HOCs/WithAuth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BottomNavigation from '@/components/BottomNavigation'
import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import VideoClient from '@/components/Vide'
import { Turret_Road } from 'next/font/google'
import Whatsapp from '@/components/Whatsapp'

function Home({ children }) {
  const router = useRouter()
  const { user, userDB, setUserProfile, setUserCart, setUserProduct, setRecetaDB, distributorPDB, setUserDistributorPDB, whatsapp, setWhatsapp, setUserData, filter, setFilter, nav, setNav, modal, setModal, cart, introClientVideo, setIntroClientVideo, recetaDBP, setRecetaDBP, productDB, search, setSearch, videoClientRef } = useUser()
  const pathname = usePathname()


  console.log(pathname)



  const redirectHandler = (ref) => {
    router.push(ref)
  }

  const handlerFilter = (e) => {
    const data = e.target.value
    setSearch(true)
    setFilter(data)
  }
  const back = () => {
    router.back()
  }
  function openNav(e) {
    e.preventDefault()
    e.stopPropagation()
    setNav(!nav)
  }

  const signOutConfirm = async () => {
    await signOut()
    setUserProfile(null)
    setUserCart({})
    setUserProduct(undefined),
      setRecetaDB(undefined),
      setUserDistributorPDB(undefined)
    setUserData(null)
    setModal('')
    return router.push('/')
  }
 
  function sortArray(x, y) {
    if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
    if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
    return 0
  }
  function handlerSearchFilter(data) {

    setFilter(data)
    setSearch(false)
  }
  function handlerClientVideo(data) {

    videoClientRef.current.pause()
    setIntroClientVideo(false)
    setWhatsapp(false)  }

  function handlerWhatsapp() {
    videoClientRef.current.pause()
    setIntroClientVideo(false)
    setWhatsapp(false)
  }


  useEffect(() => {
    readUserData('Producto', 'Precio-Justo-SRL-Data', setUserDistributorPDB, 'distribuidor')

    readUserAllData('Producto', productDB, setUserProduct)
    readUserAllData('Receta', recetaDBP, setRecetaDBP)
  }, [user]);


  return (
    // <div className="pt-[65px] pb-[65px] min-h-screen bg-gray-white"  style={{ backgroundImage: `url(bg.png)`, backgroundAttachment: 'fixed', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom' }}>
    <div className="h-screen bg-gray-white">

      {modal == 'SignOut' && <Modal funcion={signOutConfirm}>
        Estas seguro de salir...? <br /> {Object.keys(cart).length > 0 && 'Tus compras no han sido efectuadas'}
      </Modal>}
      {modal == 'Verifica' && <Modal funcion={() => { router.push(`/${user.rol}`); setModal('') }}>
        Completa tu perfil para hacer tu primera compra
      </Modal>}
      <div className={`fixed top-0 w-[220px] lg:w-[280px]   h-screen bg-[#2A52BE] h-screen transition-all	z-40  ${nav ? 'left-0  ' : 'left-[-220px] lg:left-[-280px] '} z-50`} >
        <div class="py-4 overflow-y-auto ">
          {user && user !== undefined && <Navbar rol={user.rol} />}
        </div>
      </div>

      {nav && <div className='fixed top-0 left-0 w-screen h-screen bg-[#000000C2] z-40' onClick={() => setNav(false)}></div>}
      {introClientVideo && <div className='fixed top-0 left-0 w-screen h-screen bg-[#ffffff00] z-40' onClick={handlerClientVideo}></div>}
      {whatsapp && <div className='fixed top-0 left-0 w-screen h-screen bg-[#ffffff00] z-40' onClick={handlerWhatsapp}></div>}

      <main className={`relative min-w-screen  lg:pb-0  lg:min-w-auto my-[0px]  lg:bg-blue-50 lg:min-h-screen  ${nav ? 'w-screen pl-[220px] lg:pl-[280px] ' : '  lg:px-[0px]'}`} onClick={() => setNav(false)} style={{ transition: 'all 0.5' }}>
        {/* <img src="/bg.png" className='fixed bottom-[60px] lg:bottom-0 right-[20px] w-[60vw] lg:w-[40vw]' alt="" /> */}
        <nav className="w-screen fixed top-0 border-b border-gray-200 shadow-sm flex items-center justify-between bg-[#2A52BE]  p-4 h-[70px] z-30" onClick={() => setNav(false)}>
          {pathname !== '/Cliente' && <div className='flex  hidden lg:block'>
            <div className='flex '>
              <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg hidden lg:block" onClick={openNav}>
                <svg className="w-9 h-9 text-white" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
              </button>
              <h1 className='text-[18px] hidden lg:flex lg:justify-between ml-5 lg:w-[240px] lg:items-center text-white font-medium'> <img src="/logo-circle.png" className='h-[50px] w-[50px]' alt="" /> <span className='font-medium'>PRECIO JUSTO SRL</span></h1>
            </div>
          </div>

          }
          {pathname === '/Cliente' ?
            <div className='flex '>
              <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg  " onClick={openNav}>
                <svg className="w-9 h-9 text-gray-900" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
              </button>
              <h1 className='text-[18px] hidden lg:flex lg:justify-between ml-5 lg:w-[240px] lg:items-center text-white font-medium'> <img src="/logo-circle.png" className='h-[50px] w-[50px]' alt="" /> <span className='font-medium'>PRECIO JUSTO SRL</span></h1>
            </div>
            :
            <button type="button" className="inline-flex items-center lg:hidden p-2 text-[14px] text-white rounded-lg  dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => back(!nav)}>
              <svg width="19" height="34" viewBox="0 0 19 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 32L2 17L17 2" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>}

          {pathname === '/Cliente' && <div className="relative lg:min-w-[500px]">
            <div className="absolute inset-y-0 right-[5px] flex items-center py-3 z-50 ">
              <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" onChange={handlerFilter} className="block w-full bg-white rounded-full lg:min-w-[400px] p-2 pl-10 text-[14px] text-gray-950 text-center border-b border-gray-300  bg-transparent focus:ring-white focus:border-white focus:outline-transparent" placeholder="Buscar producto..." />
          </div>}

          {user && user !== undefined && user.rol !== 'Distribuidor' && pathname === '/Cliente' && <Cart />}
        </nav>

            {search
             && filter.length > 0 
                && distributorPDB !== null 
                && distributorPDB !== undefined  && <div className='w-[100vw] fixed top-[75px] max-h-[40vh] overflow-y-auto z-30 bg-white'>
            {search 
                && filter.length > 0 
                && distributorPDB !== null 
                && distributorPDB !== undefined 
                && distributorPDB.filter((obj, index) => index === distributorPDB.findIndex(o => obj['nombre de producto 1'] === o['nombre de producto 1'])).sort(sortArray).map((i, index) => {

             
                // return (`${i['nombre de producto 1']} ${i['nombre de producto 2'] !== undefined && i['nombre de producto 2'] !== null && i['nombre de producto 2']} ${i['nombre de producto 3'] !== undefined && i['nombre de producto 3'] !== null && i['nombre de producto 3']}`).toLowerCase().includes(filter)

                if (i['nombre de producto 1'].toLowerCase().includes(filter.toLowerCase())) {
                  return <div className={`w-full text-[12px] px-5 py-2 ${(index+1)%2===0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto',}} onClick={() => handlerSearchFilter(i['nombre de producto 1'])}>
                    <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <div className='pl-5'>{i['nombre de producto 1']}</div>
                  </div>
                }
                if (i['nombre de producto 2'] && i['nombre de producto 2'].toLowerCase().includes(filter.toLowerCase())) {
                  return <div className={`w-full text-[12px] px-5 py-2 ${(index+1)%2===0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto',}} onClick={() => handlerSearchFilter(i['nombre de producto 2'])}>
                    <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <div className='pl-5'>{i['nombre de producto 2'] && i['nombre de producto 2']}</div>
                  </div>
                }
                if (i['nombre de producto 3'] && i['nombre de producto 3'].toLowerCase().includes(filter.toLowerCase())) {
                  return <div className={`w-full text-[12px] px-5 py-2 ${(index+1)%2===0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto',}} onClick={() => handlerSearchFilter(i['nombre de producto 3'])}>
                    <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <div className='pl-5'>{i['nombre de producto 3'] && i['nombre de producto 3']}</div>
                  </div>
                }
              
            }
            )}
        </div>}
        <div className="lg:px-[50px] pt-[85px] pb-[65px] md:pt-[85px] md:pb-5 h-screen overflow-y-auto">
          <VideoClient />
          {children}
        </div>
        {user && user !== undefined && <div className="fixed bottom-0  z-50 w-full h-[65px] bg-[#2A52BE] rounded-t-[40px] border-t-[1px] border-gray-50 border- lg:hidden">
          <BottomNavigation rol={user.rol} />
        </div>}
        {/* {user && user !== undefined && <div className="fixed bottom-0  z-30 w-full h-[65px] bg-gray-50 border-t-8 border-white rounded-t-[40px] lg:hidden">
          <BottomNavigation rol={user.rol} />
        </div>} */}
      </main>
      {/* <Whatsapp /> */}
    </div>
  )
}






export default Home


{/* <button type="button" onClick={() => setNav(!nav)} data-drawer-hide="drawer-navigation" class="absolute top-[-0px] bottom-0 right-[0px] m-auto bg-transparent hover:bg-gray-200 hover:text-white rounded-lg px-[2px]" >
<svg width="12" height="122" viewBox="0 0 24 122" fill="none" xmlns="http://www.w3.org/2000/svg">
  {nav
    ? <path d="M5 61L17.75 8.17245L17.75 113.828L5 61Z" fill="white" />
    : <path d="M19 61L6.25 113.828L6.25 8.17245L19 61Z" fill="white" />
  }
</svg>
<span class="sr-only" >Close menu</span>
</button> */}


{/* {
   productDB.reduce( (acumulador, elemento) => {
    if (acumulador.indexOf(elemento) === -1) {
      acumulador.push(elemento);
    }
    return acumulador;
  }, [])
}

{
  productDB.filter((current) => {
    var exists = !hash[current.id];
    hash[current.id] = true;
    return exists;
  })
} */}



           {/* {
 distributorPDB !== null && distributorPDB !== undefined && console.log(distributorPDB.map(i=>i['nombre de producto 1']))
} */}
{/* {
 distributorPDB !== null && distributorPDB !== undefined && console.log(distributorPDB.filter((obj, index) => index === distributorPDB.findIndex(o => obj['nombre de producto 1'] === o['nombre de producto 1'])).sort(sortArray).map(i=>i['nombre de producto 1']))
} */}




{/* <ul class="space-y-2 text-[16px]  text-gray-600 font-medium">
<li>
  <Link href="/Distribuidor/Perfil" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
    <span class="flex-1 ml-3 whitespace-nowrap">Perfil</span>
  </Link>
</li>
<li>
  <Link href="/Distribuidor/Transacciones" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
    <span class="flex-1 ml-3 text-left whitespace-nowrap">Pedidos</span>
  </Link>
</li>
<li>
  {
    user && user.rol == 'Medico'
      ? <Link href="/Medico/Recetas" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        <span class="flex-1 ml-3 whitespace-nowrap">Recetas</span>
      </Link>

      : <Link href="/Distribuidor/Productos" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        <span class="flex-1 ml-3 whitespace-nowrap">Productos</span>
      </Link>
  }
</li>

<li>
  <Link href="#" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    <svg aria-hidden="true" class="w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
    <span class="ml-3">Reportes</span>
  </Link>
</li>
<li onClick={signOutHandler}>
  <Link href="#" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
    <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
  </Link>
</li>
</ul> */}








// {user !== undefined && <div className="fixed bottom-0 left-0 z-50 w-full h-[65px] bg-gray-50 border-t-8 border-white rounded-t-[40px] lg:hidden">
// <div className={`grid h-full max-w-lg ${user && user.rol === 'Distribuidor' ? 'grid-cols-5' : 'grid-cols-4'} mx-auto font-medium`}>
//   <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Cliente`)}>
//     <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//       <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
//     </svg>
//     {/* <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Inicio</span> */}
//   </button>
//   <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Distribuidor/Productos`)}>
//     <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//       <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>

//     {/* <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Publicar</span> */}
//   </button>
//   {user && user.rol == 'Distribuidor' ? <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Distribuidor/Agregar`)}>
//       <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//         <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
//       </svg>
//       {/* <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Publicar</span> */}
//     </button>
//     : ''
//   }
//   <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Distribuidor/Transacciones`)}>
//     <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//       <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
//     </svg>
//     {/* <span class="text-[12px] text-gray-600  group-hover:text-blue-600 ">Pagos</span> */}
//   </button>

//   <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Distribuidor/Agregar`)}>

//     <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//       <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
//     </svg>
//     {/* <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Publicar</span> */}
//   </button>
// </div>
// </div>}












































{/* <svg className="w-8 h-8 mb-1 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 20C14.1667 20 13.4583 19.7083 12.875 19.125C12.2917 18.5417 12 17.8333 12 17C12 16.8833 12.0083 16.7623 12.025 16.637C12.0417 16.5117 12.0667 16.3993 12.1 16.3L5.05 12.2C4.76667 12.45 4.45 12.646 4.1 12.788C3.75 12.93 3.38333 13.0007 3 13C2.16667 13 1.45833 12.7083 0.875 12.125C0.291667 11.5417 0 10.8333 0 10C0 9.16667 0.291667 8.45833 0.875 7.875C1.45833 7.29167 2.16667 7 3 7C3.38333 7 3.75 7.071 4.1 7.213C4.45 7.355 4.76667 7.55067 5.05 7.8L12.1 3.7C12.0667 3.6 12.0417 3.48767 12.025 3.363C12.0083 3.23833 12 3.11733 12 3C12 2.16667 12.2917 1.45833 12.875 0.875C13.4583 0.291667 14.1667 0 15 0C15.8333 0 16.5417 0.291667 17.125 0.875C17.7083 1.45833 18 2.16667 18 3C18 3.83333 17.7083 4.54167 17.125 5.125C16.5417 5.70833 15.8333 6 15 6C14.6167 6 14.25 5.92933 13.9 5.788C13.55 5.64667 13.2333 5.45067 12.95 5.2L5.9 9.3C5.93333 9.4 5.95833 9.51267 5.975 9.638C5.99167 9.76333 6 9.884 6 10C6 10.1167 5.99167 10.2377 5.975 10.363C5.95833 10.4883 5.93333 10.6007 5.9 10.7L12.95 14.8C13.2333 14.55 13.55 14.3543 13.9 14.213C14.25 14.0717 14.6167 14.0007 15 14C15.8333 14 16.5417 14.2917 17.125 14.875C17.7083 15.4583 18 16.1667 18 17C18 17.8333 17.7083 18.5417 17.125 19.125C16.5417 19.7083 15.8333 20 15 20Z" fill="#636363" />
            </svg> */}


// <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
// <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Distribuidor/Transacciones`)}>
//   <svg class="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//     <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
//     <path clip-rule="evenodd" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
//   </svg>
//   {/* <span class="text-[12px] text-gray-600  group-hover:text-blue-600 ">Pagos</span> */}
// </button>
// <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Cliente`)}>
//   <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//     <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
//   </svg>
//   {/* <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Inicio</span> */}
// </button>
// <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`/Distribuidor/Agregar`)}>
//   <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//     <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
//   </svg>
//   {/* <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Publicar</span> */}
// </button>
// <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`${user.rol}/Perfil`)}>
//   <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//     <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
//   </svg>
//   {/* <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Perfil</span> */}
// </button>
// <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group" onClick={() => redirectHandler(`${user.rol}`)}>
//   <svg className="w-11 h-11 mb-1 text-gray-600 bg-white rounded-full group-hover:text-blue-600 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//     <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
//   </svg>
//   <span className="text-[12px] text-gray-600  group-hover:text-blue-600 ">Config</span>
// </button>
// </div>












{/* <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */ }

{/* <ul id="dropdown-example" class="hidden py-2 space-y-2">
                  <li>
                    <a href="#" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                  </li>
                </ul> */}

{/* <li>
<a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
  <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
  <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
  <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
</a>
</li> */}


{/* <div className={`absolute items-center justify-between top-[40px] w-1/2 h-screen bg-transparent md:flex md:w-auto  transition-all	z-0 ${nav ? 'left-0' : 'left-[-400px]'}`} >
          <ul className="flex flex-col bg-[#1D0F4A] p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Nosotros</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Servicios</a>
            </li>
            <li>
              <span href="#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={signOutHandler}>Cerrar sesión</span>
            </li>
          </ul>
        </div> */}






{/* <nav className="w-screen fixed top-0 border-b border-gray-200 z-50 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between bg-[#0064FA] mx-auto p-4 h-[60px] z-50">
          <a className="flex items-center">
            <img src="/logo-dark.svg" className="h-12 mr-3" alt="Flowbite Logo" />
          </a>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-[14px] text-white border-b border-gray-300  bg-transparent focus:ring-white focus:border-white focus:outline-transparent" placeholder="Busca tu producto..." />
          </div>
          <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setNav(!nav)}>
            <span className="sr-only">Open menu</span>
            <svg className="w-9 h-9" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
          </button>
        </div>
        <div className={`absolute items-center justify-between top-[40px] w-1/2 bg-transparent md:flex md:w-auto  transition-all	z-0 ${nav ? 'right-0' : 'right-[-400px]'}`} >
          <ul className="flex flex-col bg-[#1D0F4A] p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Nosotros</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Servicios</a>
            </li>
            <li>
              <span href="#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={signOutHandler}>Cerrar sesión</span>
            </li>
          </ul>
        </div>
      </nav>  */}





{/* <nav className="w-screen fixed top-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between bg-white mx-auto p-4 h-[60px] z-50">
          <a className="flex items-center">
            <img src="/logo-dark.svg" className="h-12 mr-3" alt="Flowbite Logo" />
          </a>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-white" aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-[14px] text-gray-950 border-b border-gray-300  bg-transparent focus:ring-white focus:border-white focus:outline-transparent" placeholder="Busca tu producto..." />
          </div>
          <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setNav(!nav)}>
            <span className="sr-only">Open menu</span>
            <svg className="w-9 h-9" aria-hidden="true" fill="#0064FA" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
          </button>
        </div>
        <div className={`absolute items-center justify-between top-[40px] w-1/2 bg-transparent md:flex md:w-auto  transition-all	z-0 ${nav ? 'right-0' : 'right-[-400px]'}`} >
          <ul className="flex flex-col bg-[#1D0F4A] p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Nosotros</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Servicios</a>
            </li>
            <li>
              <span href="#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={signOutHandler}>Cerrar sesión</span>
            </li>
          </ul>
        </div>
      </nav> */}
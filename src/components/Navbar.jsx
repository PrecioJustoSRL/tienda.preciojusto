'use client';
import { useRouter } from 'next/navigation';

import { useUser } from '@/context/Context'
import Link from 'next/link'
import { signOut } from '@/supabase/utils'
import Modal from '@/components/Modal'




export default function BottomNavigation({ rol }) {
    const { user, userDB, modal, setModal, setUserProfile, setUserData, setUserProduct, setRecetaDB, setUserCart, setUserDistributorPDB, filter, setFilter, nav, setNav } = useUser()

    const router = useRouter()

    const redirectHandler = (ref) => {
        router.push(ref)
    }

    const signOutHandler = () => {
        setModal('SignOut')
    }
    
    const redirectHandlerWindow = () => {
        window.open("https://api.whatsapp.com/send?phone=+59169941749&text=hola%20mundo", '_blank')
        setNav(false)
        // setWhatsapp(!whatsapp)
    }

    switch (rol) {
        case 'Cliente':
            return <ul class="space-y-3 text-[16px]  text-gray-600 font-medium">
                <li className="flex flex-col justify-center items-center px-[10px] py-5 border-b border-gray-[1px]  w-full">
                    <img src="/logo-circle.png" className='h-[70px] w-[70px]' alt="" />
                    <h1 className='16px font-medium text-center text-white py-[10px]'>Precio Justo</h1>
                    <h3 className='text-white text-center'>Bienvenido </h3>
                    <h3 className='text-white text-center'>{user.nombre}</h3>
                </li>
                {/* <li className="px-5">
                    <Link href="/Distribuidor/Perfil" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Perfil</span>
                    </Link>
                </li> */}
                <li className="px-5">
                    <Link href="/Cliente" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Tienda</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Cliente/Pedidos" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Pedidos</span>
                    </Link>
                </li>
                <li className="px-5">
                    <button onClick={redirectHandlerWindow} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <span className="w-8 h-8 mb-1 text-gray-600 group-hover:text-blue-600 p-1">
                            <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.853564 19.7608C0.852627 23.1216 1.73763 26.4031 3.42044 29.2955L0.692627 39.178L10.8851 36.5262C13.7042 38.0491 16.8628 38.847 20.0726 38.8472H20.0811C30.6772 38.8472 39.3026 30.2917 39.3072 19.7759C39.3092 14.6802 37.3111 9.88857 33.6808 6.28361C30.0511 2.67896 25.2237 0.692755 20.0803 0.69043C9.48294 0.69043 0.858096 9.24547 0.853721 19.7608" fill="transparent" />
                                <path d="M0.167188 19.7544C0.166094 23.2361 1.08281 26.635 2.82562 29.631L0 39.8678L10.558 37.1209C13.467 38.6947 16.7423 39.5245 20.0752 39.5257H20.0837C31.06 39.5257 39.9953 30.6625 40 19.7702C40.0019 14.4915 37.9319 9.5276 34.1719 5.79349C30.4114 2.05984 25.4114 0.00217054 20.0837 0C9.10562 0 0.171563 8.86202 0.167188 19.7544ZM6.45469 29.115L6.06047 28.4941C4.40328 25.8795 3.52859 22.8581 3.52984 19.7557C3.53344 10.7022 10.9591 3.33643 20.09 3.33643C24.5119 3.33829 28.6675 5.04868 31.7931 8.15194C34.9186 11.2555 36.6384 15.3811 36.6373 19.769C36.6333 28.8225 29.2075 36.1891 20.0837 36.1891H20.0772C17.1064 36.1876 14.1928 35.396 11.6519 33.9L11.0472 33.5442L4.78188 35.1741L6.45469 29.1149V29.115Z" fill="white" />
                                <path d="M14.5541 11.3207C14.1812 10.4986 13.7889 10.482 13.4344 10.4675C13.1441 10.4551 12.8122 10.4561 12.4806 10.4561C12.1487 10.4561 11.6095 10.5799 11.1537 11.0737C10.6975 11.568 9.41187 12.7624 9.41187 15.1917C9.41187 17.6212 11.1951 19.9689 11.4437 20.2987C11.6926 20.6279 14.8864 25.7727 19.9445 27.7519C24.1483 29.3967 25.0037 29.0696 25.9161 28.9871C26.8286 28.9049 28.8605 27.793 29.275 26.6399C29.6898 25.4871 29.6898 24.4989 29.5655 24.2923C29.4411 24.0866 29.1092 23.963 28.6116 23.7162C28.1137 23.4692 25.6672 22.2747 25.2111 22.1099C24.7548 21.9452 24.4231 21.863 24.0912 22.3575C23.7594 22.8511 22.8064 23.963 22.5159 24.2923C22.2258 24.6224 21.9353 24.6635 21.4378 24.4165C20.9398 24.1688 19.3372 23.648 17.4358 21.966C15.9564 20.6572 14.9576 19.0409 14.6673 18.5465C14.377 18.0528 14.6362 17.7852 14.8858 17.5392C15.1094 17.3179 15.3836 16.9626 15.6326 16.6744C15.8808 16.386 15.9636 16.1803 16.1295 15.851C16.2956 15.5213 16.2125 15.233 16.0883 14.986C15.9636 14.739 14.9966 12.297 14.5541 11.3207Z" fill="white" />
                            </svg>
                        </span>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Soporte</span>
                    </button>
                </li>
                <li className="px-5" onClick={signOutHandler}>
                    <button onClick={() => setNav(false)} class="w-full flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 text-left ml-3 whitespace-nowrap text-white  hover:font-medium">Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
            break
        case 'Medico':
            return <ul class="space-y-2 text-[16px]  text-gray-600 font-medium">
                <li className="flex flex-col justify-center items-center px-[10px] py-5 border-b border-gray-[1px]  w-full">
                    <img src="/logo-circle.png" className='h-[70px] w-[70px]' alt="" />
                    <h1 className='16px font-medium  text-center  text-white py-[10px]'>Precio Justo</h1>
                    <h3 className='text-white text-center'>Bienvenido {user.nombre}</h3>
                    <h3 className='text-white text-center'>{rol}</h3>
                </li>
                <li className="px-5">
                    <Link href="/Medico/Perfil" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Perfil</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Cliente" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Tienda</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Medico/Recetas" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Recetas</span>
                    </Link>
                </li>
                <li className="px-5">
                    <button onClick={redirectHandlerWindow} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <span className="w-8 h-8 mb-1 text-gray-600 group-hover:text-blue-600 p-1">
                            <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.853564 19.7608C0.852627 23.1216 1.73763 26.4031 3.42044 29.2955L0.692627 39.178L10.8851 36.5262C13.7042 38.0491 16.8628 38.847 20.0726 38.8472H20.0811C30.6772 38.8472 39.3026 30.2917 39.3072 19.7759C39.3092 14.6802 37.3111 9.88857 33.6808 6.28361C30.0511 2.67896 25.2237 0.692755 20.0803 0.69043C9.48294 0.69043 0.858096 9.24547 0.853721 19.7608" fill="transparent" />
                                <path d="M0.167188 19.7544C0.166094 23.2361 1.08281 26.635 2.82562 29.631L0 39.8678L10.558 37.1209C13.467 38.6947 16.7423 39.5245 20.0752 39.5257H20.0837C31.06 39.5257 39.9953 30.6625 40 19.7702C40.0019 14.4915 37.9319 9.5276 34.1719 5.79349C30.4114 2.05984 25.4114 0.00217054 20.0837 0C9.10562 0 0.171563 8.86202 0.167188 19.7544ZM6.45469 29.115L6.06047 28.4941C4.40328 25.8795 3.52859 22.8581 3.52984 19.7557C3.53344 10.7022 10.9591 3.33643 20.09 3.33643C24.5119 3.33829 28.6675 5.04868 31.7931 8.15194C34.9186 11.2555 36.6384 15.3811 36.6373 19.769C36.6333 28.8225 29.2075 36.1891 20.0837 36.1891H20.0772C17.1064 36.1876 14.1928 35.396 11.6519 33.9L11.0472 33.5442L4.78188 35.1741L6.45469 29.1149V29.115Z" fill="white" />
                                <path d="M14.5541 11.3207C14.1812 10.4986 13.7889 10.482 13.4344 10.4675C13.1441 10.4551 12.8122 10.4561 12.4806 10.4561C12.1487 10.4561 11.6095 10.5799 11.1537 11.0737C10.6975 11.568 9.41187 12.7624 9.41187 15.1917C9.41187 17.6212 11.1951 19.9689 11.4437 20.2987C11.6926 20.6279 14.8864 25.7727 19.9445 27.7519C24.1483 29.3967 25.0037 29.0696 25.9161 28.9871C26.8286 28.9049 28.8605 27.793 29.275 26.6399C29.6898 25.4871 29.6898 24.4989 29.5655 24.2923C29.4411 24.0866 29.1092 23.963 28.6116 23.7162C28.1137 23.4692 25.6672 22.2747 25.2111 22.1099C24.7548 21.9452 24.4231 21.863 24.0912 22.3575C23.7594 22.8511 22.8064 23.963 22.5159 24.2923C22.2258 24.6224 21.9353 24.6635 21.4378 24.4165C20.9398 24.1688 19.3372 23.648 17.4358 21.966C15.9564 20.6572 14.9576 19.0409 14.6673 18.5465C14.377 18.0528 14.6362 17.7852 14.8858 17.5392C15.1094 17.3179 15.3836 16.9626 15.6326 16.6744C15.8808 16.386 15.9636 16.1803 16.1295 15.851C16.2956 15.5213 16.2125 15.233 16.0883 14.986C15.9636 14.739 14.9966 12.297 14.5541 11.3207Z" fill="white" />
                            </svg>
                        </span>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Soporte</span>
                    </button>
                </li>
                <li className="px-5" onClick={signOutHandler}>
                    <button onClick={() => setNav(false)} class="w-full flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 text-left ml-3 whitespace-nowrap text-white  hover:font-medium">Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
            break
        case 'Clinica':
            return <ul class="space-y-3 text-[16px]  text-gray-600 font-medium">
                <li className="flex flex-col justify-center items-center px-[10px] py-5 border-b border-gray-[1px]  w-full">
                    <img src="/logo-circle.png" className='h-[70px] w-[70px]' alt="" />
                    <h1 className='16px font-medium  text-center text-white py-[10px]'>Precio Justo</h1>
                    <h3 className='text-white text-center'>Bienvenido {user.nombre}</h3>
                    <h3 className='text-white text-center'>{rol}</h3>
                </li>

                <li className="px-5">
                    <Link href="/Clinica/Perfil" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Perfil</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Cliente" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Tienda</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Clinica/Pedidos" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Pedidos</span>
                    </Link>
                </li>
                {userDB && userDB.access && userDB.access == 'verificador' && <li className="px-5">
                    <Link href="/Clinica/Verificar" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Verificar</span>
                    </Link>
                </li>}
                <li className="px-5">
                    <button onClick={redirectHandlerWindow} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <span className="w-8 h-8 mb-1 text-gray-600 group-hover:text-blue-600 p-1">
                            <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.853564 19.7608C0.852627 23.1216 1.73763 26.4031 3.42044 29.2955L0.692627 39.178L10.8851 36.5262C13.7042 38.0491 16.8628 38.847 20.0726 38.8472H20.0811C30.6772 38.8472 39.3026 30.2917 39.3072 19.7759C39.3092 14.6802 37.3111 9.88857 33.6808 6.28361C30.0511 2.67896 25.2237 0.692755 20.0803 0.69043C9.48294 0.69043 0.858096 9.24547 0.853721 19.7608" fill="transparent" />
                                <path d="M0.167188 19.7544C0.166094 23.2361 1.08281 26.635 2.82562 29.631L0 39.8678L10.558 37.1209C13.467 38.6947 16.7423 39.5245 20.0752 39.5257H20.0837C31.06 39.5257 39.9953 30.6625 40 19.7702C40.0019 14.4915 37.9319 9.5276 34.1719 5.79349C30.4114 2.05984 25.4114 0.00217054 20.0837 0C9.10562 0 0.171563 8.86202 0.167188 19.7544ZM6.45469 29.115L6.06047 28.4941C4.40328 25.8795 3.52859 22.8581 3.52984 19.7557C3.53344 10.7022 10.9591 3.33643 20.09 3.33643C24.5119 3.33829 28.6675 5.04868 31.7931 8.15194C34.9186 11.2555 36.6384 15.3811 36.6373 19.769C36.6333 28.8225 29.2075 36.1891 20.0837 36.1891H20.0772C17.1064 36.1876 14.1928 35.396 11.6519 33.9L11.0472 33.5442L4.78188 35.1741L6.45469 29.1149V29.115Z" fill="white" />
                                <path d="M14.5541 11.3207C14.1812 10.4986 13.7889 10.482 13.4344 10.4675C13.1441 10.4551 12.8122 10.4561 12.4806 10.4561C12.1487 10.4561 11.6095 10.5799 11.1537 11.0737C10.6975 11.568 9.41187 12.7624 9.41187 15.1917C9.41187 17.6212 11.1951 19.9689 11.4437 20.2987C11.6926 20.6279 14.8864 25.7727 19.9445 27.7519C24.1483 29.3967 25.0037 29.0696 25.9161 28.9871C26.8286 28.9049 28.8605 27.793 29.275 26.6399C29.6898 25.4871 29.6898 24.4989 29.5655 24.2923C29.4411 24.0866 29.1092 23.963 28.6116 23.7162C28.1137 23.4692 25.6672 22.2747 25.2111 22.1099C24.7548 21.9452 24.4231 21.863 24.0912 22.3575C23.7594 22.8511 22.8064 23.963 22.5159 24.2923C22.2258 24.6224 21.9353 24.6635 21.4378 24.4165C20.9398 24.1688 19.3372 23.648 17.4358 21.966C15.9564 20.6572 14.9576 19.0409 14.6673 18.5465C14.377 18.0528 14.6362 17.7852 14.8858 17.5392C15.1094 17.3179 15.3836 16.9626 15.6326 16.6744C15.8808 16.386 15.9636 16.1803 16.1295 15.851C16.2956 15.5213 16.2125 15.233 16.0883 14.986C15.9636 14.739 14.9966 12.297 14.5541 11.3207Z" fill="white" />
                            </svg>
                        </span>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Soporte</span>
                    </button>
                </li>
                <li className="px-5" onClick={signOutHandler}>
                    <button onClick={() => setNav(false)} class="w-full flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 text-left ml-3 whitespace-nowrap text-white  hover:font-medium">Cerrar Sesión</span>
                    </button>
                </li>
            </ul>

        case 'Distribuidor':
            return <ul class="space-y-2 text-[16px]  text-gray-600 font-medium">
                <li className="flex flex-col justify-center items-center px-[5px] py-5 border-b border-gray-[1px]  w-full">
                    <img src="/logo-circle.png" className='h-[70px] w-[70px]' alt="" />
                    <h1 className='16px font-medium text-center text-white py-[10px]'>Precio Justo</h1>
                    <h3 className='text-white text-center'>Bienvenido {user.nombre}</h3>
                    <h3 className='text-white text-center'>{rol}</h3>
                </li>
                <li className="px-5">
                    <Link href="/Distribuidor/Perfil" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Perfil</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Cliente" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Tienda</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Distribuidor/Productos" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Productos</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Distribuidor/Archivados" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Archivados</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Distribuidor/Pedidos" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Pedidos</span>
                    </Link>
                </li>
                <li className="px-5">
                    <button onClick={redirectHandlerWindow} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <span className="w-8 h-8 mb-1 text-gray-600 group-hover:text-blue-600 p-1">
                            <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.853564 19.7608C0.852627 23.1216 1.73763 26.4031 3.42044 29.2955L0.692627 39.178L10.8851 36.5262C13.7042 38.0491 16.8628 38.847 20.0726 38.8472H20.0811C30.6772 38.8472 39.3026 30.2917 39.3072 19.7759C39.3092 14.6802 37.3111 9.88857 33.6808 6.28361C30.0511 2.67896 25.2237 0.692755 20.0803 0.69043C9.48294 0.69043 0.858096 9.24547 0.853721 19.7608" fill="transparent" />
                                <path d="M0.167188 19.7544C0.166094 23.2361 1.08281 26.635 2.82562 29.631L0 39.8678L10.558 37.1209C13.467 38.6947 16.7423 39.5245 20.0752 39.5257H20.0837C31.06 39.5257 39.9953 30.6625 40 19.7702C40.0019 14.4915 37.9319 9.5276 34.1719 5.79349C30.4114 2.05984 25.4114 0.00217054 20.0837 0C9.10562 0 0.171563 8.86202 0.167188 19.7544ZM6.45469 29.115L6.06047 28.4941C4.40328 25.8795 3.52859 22.8581 3.52984 19.7557C3.53344 10.7022 10.9591 3.33643 20.09 3.33643C24.5119 3.33829 28.6675 5.04868 31.7931 8.15194C34.9186 11.2555 36.6384 15.3811 36.6373 19.769C36.6333 28.8225 29.2075 36.1891 20.0837 36.1891H20.0772C17.1064 36.1876 14.1928 35.396 11.6519 33.9L11.0472 33.5442L4.78188 35.1741L6.45469 29.1149V29.115Z" fill="white" />
                                <path d="M14.5541 11.3207C14.1812 10.4986 13.7889 10.482 13.4344 10.4675C13.1441 10.4551 12.8122 10.4561 12.4806 10.4561C12.1487 10.4561 11.6095 10.5799 11.1537 11.0737C10.6975 11.568 9.41187 12.7624 9.41187 15.1917C9.41187 17.6212 11.1951 19.9689 11.4437 20.2987C11.6926 20.6279 14.8864 25.7727 19.9445 27.7519C24.1483 29.3967 25.0037 29.0696 25.9161 28.9871C26.8286 28.9049 28.8605 27.793 29.275 26.6399C29.6898 25.4871 29.6898 24.4989 29.5655 24.2923C29.4411 24.0866 29.1092 23.963 28.6116 23.7162C28.1137 23.4692 25.6672 22.2747 25.2111 22.1099C24.7548 21.9452 24.4231 21.863 24.0912 22.3575C23.7594 22.8511 22.8064 23.963 22.5159 24.2923C22.2258 24.6224 21.9353 24.6635 21.4378 24.4165C20.9398 24.1688 19.3372 23.648 17.4358 21.966C15.9564 20.6572 14.9576 19.0409 14.6673 18.5465C14.377 18.0528 14.6362 17.7852 14.8858 17.5392C15.1094 17.3179 15.3836 16.9626 15.6326 16.6744C15.8808 16.386 15.9636 16.1803 16.1295 15.851C16.2956 15.5213 16.2125 15.233 16.0883 14.986C15.9636 14.739 14.9966 12.297 14.5541 11.3207Z" fill="white" />
                            </svg>
                        </span>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Soporte</span>
                    </button>
                </li>
                <li className="px-5" onClick={signOutHandler}>
                    <button onClick={() => setNav(false)} class="w-full flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 text-left ml-3 whitespace-nowrap text-white  hover:font-medium">Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        case 'Administrador':
            return <ul class="space-y-2 text-[16px]  text-gray-600 font-medium">
                <li className="flex flex-col justify-center items-center px-[10px] py-5 border-b border-gray-[1px]  w-full">
                    <img src="/logo-circle.png" className='h-[70px] w-[70px]' alt="" />
                    <h1 className='16px font-medium  text-center text-white py-[10px]'>Precio Justo</h1>
                    <h3 className='text-white text-center'>Bienvenido {user.nombre}</h3>
                    <h3 className='text-white text-center'>{rol}</h3>
                </li>
                <li className="px-5">
                    <Link href="/Administrador/Pedido" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Perfil</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Cliente" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Tienda</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Administrador/Plantilla" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Datos de productos</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Administrador/Usuarios" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 17.0001V19.0001H2V17.0001C2 17.0001 2 13.0001 9 13.0001C16 13.0001 16 17.0001 16 17.0001ZM12.5 7.50005C12.5 6.80782 12.2947 6.13113 11.9101 5.55556C11.5256 4.97998 10.9789 4.53138 10.3394 4.26647C9.69985 4.00157 8.99612 3.93226 8.31718 4.0673C7.63825 4.20235 7.01461 4.5357 6.52513 5.02518C6.03564 5.51466 5.7023 6.1383 5.56725 6.81724C5.4322 7.49617 5.50152 8.1999 5.76642 8.83944C6.03133 9.47899 6.47993 10.0256 7.0555 10.4102C7.63108 10.7948 8.30777 11.0001 9 11.0001C9.92826 11.0001 10.8185 10.6313 11.4749 9.97493C12.1313 9.31855 12.5 8.42831 12.5 7.50005ZM15.94 13.0001C16.5547 13.4758 17.0578 14.0805 17.4137 14.7716C17.7696 15.4626 17.9697 16.2233 18 17.0001V19.0001H22V17.0001C22 17.0001 22 13.3701 15.94 13.0001ZM15 4.00005C14.3117 3.99622 13.6385 4.20201 13.07 4.59005C13.6774 5.43879 14.0041 6.45634 14.0041 7.50005C14.0041 8.54377 13.6774 9.56132 13.07 10.4101C13.6385 10.7981 14.3117 11.0039 15 11.0001C15.9283 11.0001 16.8185 10.6313 17.4749 9.97493C18.1313 9.31855 18.5 8.42831 18.5 7.50005C18.5 6.57179 18.1313 5.68156 17.4749 5.02518C16.8185 4.3688 15.9283 4.00005 15 4.00005Z" fill="white" />
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Usuarios</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Administrador/Medicos" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 7C4.83696 7 4.20107 6.73661 3.73223 6.26777C3.26339 5.79893 3 5.16304 3 4.5V2.5C3 2.36739 3.05268 2.24021 3.14645 2.14645C3.24021 2.05268 3.36739 2 3.5 2H4C4.13261 2 4.25979 1.94732 4.35355 1.85355C4.44732 1.75979 4.5 1.63261 4.5 1.5C4.5 1.36739 4.44732 1.24021 4.35355 1.14645C4.25979 1.05268 4.13261 1 4 1H3.5C3.10218 1 2.72064 1.15804 2.43934 1.43934C2.15804 1.72064 2 2.10218 2 2.5V4.5C2.00064 5.06487 2.13839 5.62114 2.4014 6.12104C2.66441 6.62094 3.04484 7.04953 3.51 7.37C3.95691 7.76401 4.31935 8.2445 4.57544 8.78246C4.83153 9.32041 4.97596 9.90468 5 10.5C5 11.4283 5.36875 12.3185 6.02513 12.9749C6.6815 13.6313 7.57174 14 8.5 14C9.42826 14 10.3185 13.6313 10.9749 12.9749C11.6313 12.3185 12 11.4283 12 10.5V9.93C12.4713 9.8083 12.8821 9.51889 13.1553 9.116C13.4285 8.71311 13.5454 8.22441 13.4841 7.7415C13.4227 7.25859 13.1874 6.81463 12.8221 6.49284C12.4569 6.17104 11.9868 5.99351 11.5 5.99351C11.0132 5.99351 10.5431 6.17104 10.1779 6.49284C9.81263 6.81463 9.57728 7.25859 9.51594 7.7415C9.4546 8.22441 9.57149 8.71311 9.8447 9.116C10.1179 9.51889 10.5287 9.8083 11 9.93V10.5C11 11.163 10.7366 11.7989 10.2678 12.2678C9.79893 12.7366 9.16304 13 8.5 13C7.83696 13 7.20107 12.7366 6.73223 12.2678C6.26339 11.7989 6 11.163 6 10.5C6.02531 9.90395 6.1713 9.31923 6.42912 8.78123C6.68695 8.24322 7.05126 7.76313 7.5 7.37C7.96331 7.04842 8.34179 6.61934 8.60303 6.11951C8.86426 5.61968 9.00048 5.06398 9 4.5V2.5C9 2.10218 8.84196 1.72064 8.56066 1.43934C8.27936 1.15804 7.89782 1 7.5 1H7C6.86739 1 6.74021 1.05268 6.64645 1.14645C6.55268 1.24021 6.5 1.36739 6.5 1.5C6.5 1.63261 6.55268 1.75979 6.64645 1.85355C6.74021 1.94732 6.86739 2 7 2H7.5C7.63261 2 7.75979 2.05268 7.85355 2.14645C7.94732 2.24021 8 2.36739 8 2.5V4.5C8 4.8283 7.93534 5.15339 7.8097 5.45671C7.68406 5.76002 7.49991 6.03562 7.26777 6.26777C7.03562 6.49991 6.76002 6.68406 6.45671 6.8097C6.15339 6.93534 5.8283 7 5.5 7ZM11.5 9C11.2348 9 10.9804 8.89464 10.7929 8.70711C10.6054 8.51957 10.5 8.26522 10.5 8C10.5 7.73478 10.6054 7.48043 10.7929 7.29289C10.9804 7.10536 11.2348 7 11.5 7C11.7652 7 12.0196 7.10536 12.2071 7.29289C12.3946 7.48043 12.5 7.73478 12.5 8C12.5 8.26522 12.3946 8.51957 12.2071 8.70711C12.0196 8.89464 11.7652 9 11.5 9Z" fill="white" />
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Médicos</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Administrador/Clinicas" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_102_384)">
                                <path d="M15 4V0H8V4H0V16H6V13H10V16H16V4H15ZM4 11H2V9H4V11ZM4 8H2V6H4V8ZM7 11H5V9H7V11ZM7 8H5V6H7V8ZM10 3V2H11V1H12V2H13V3H12V4H11V3H10ZM11 11H9V9H11V11ZM11 8H9V6H11V8ZM14 11H12V9H14V11ZM14 8H12V6H14V8Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_102_384">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Clínicas</span>
                    </Link>
                </li>
                <li className="px-5">
                    <Link href="/Administrador/Distribuidores" onClick={() => setNav(false)} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 17H17V14H18V12L17 7H2L1 12V14H2V20H11V14H15V17ZM9 18H4V14H9V18ZM2 4H17V6H2V4Z" fill="white" />
                            <path d="M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" fill="white" />
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Ditribuidores</span>
                    </Link>
                </li>
                <li className="px-5">
                    <button onClick={redirectHandlerWindow} class="flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <span className="w-8 h-8 mb-1 text-gray-600 group-hover:text-blue-600 p-1">
                            <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.853564 19.7608C0.852627 23.1216 1.73763 26.4031 3.42044 29.2955L0.692627 39.178L10.8851 36.5262C13.7042 38.0491 16.8628 38.847 20.0726 38.8472H20.0811C30.6772 38.8472 39.3026 30.2917 39.3072 19.7759C39.3092 14.6802 37.3111 9.88857 33.6808 6.28361C30.0511 2.67896 25.2237 0.692755 20.0803 0.69043C9.48294 0.69043 0.858096 9.24547 0.853721 19.7608" fill="transparent" />
                                <path d="M0.167188 19.7544C0.166094 23.2361 1.08281 26.635 2.82562 29.631L0 39.8678L10.558 37.1209C13.467 38.6947 16.7423 39.5245 20.0752 39.5257H20.0837C31.06 39.5257 39.9953 30.6625 40 19.7702C40.0019 14.4915 37.9319 9.5276 34.1719 5.79349C30.4114 2.05984 25.4114 0.00217054 20.0837 0C9.10562 0 0.171563 8.86202 0.167188 19.7544ZM6.45469 29.115L6.06047 28.4941C4.40328 25.8795 3.52859 22.8581 3.52984 19.7557C3.53344 10.7022 10.9591 3.33643 20.09 3.33643C24.5119 3.33829 28.6675 5.04868 31.7931 8.15194C34.9186 11.2555 36.6384 15.3811 36.6373 19.769C36.6333 28.8225 29.2075 36.1891 20.0837 36.1891H20.0772C17.1064 36.1876 14.1928 35.396 11.6519 33.9L11.0472 33.5442L4.78188 35.1741L6.45469 29.1149V29.115Z" fill="white" />
                                <path d="M14.5541 11.3207C14.1812 10.4986 13.7889 10.482 13.4344 10.4675C13.1441 10.4551 12.8122 10.4561 12.4806 10.4561C12.1487 10.4561 11.6095 10.5799 11.1537 11.0737C10.6975 11.568 9.41187 12.7624 9.41187 15.1917C9.41187 17.6212 11.1951 19.9689 11.4437 20.2987C11.6926 20.6279 14.8864 25.7727 19.9445 27.7519C24.1483 29.3967 25.0037 29.0696 25.9161 28.9871C26.8286 28.9049 28.8605 27.793 29.275 26.6399C29.6898 25.4871 29.6898 24.4989 29.5655 24.2923C29.4411 24.0866 29.1092 23.963 28.6116 23.7162C28.1137 23.4692 25.6672 22.2747 25.2111 22.1099C24.7548 21.9452 24.4231 21.863 24.0912 22.3575C23.7594 22.8511 22.8064 23.963 22.5159 24.2923C22.2258 24.6224 21.9353 24.6635 21.4378 24.4165C20.9398 24.1688 19.3372 23.648 17.4358 21.966C15.9564 20.6572 14.9576 19.0409 14.6673 18.5465C14.377 18.0528 14.6362 17.7852 14.8858 17.5392C15.1094 17.3179 15.3836 16.9626 15.6326 16.6744C15.8808 16.386 15.9636 16.1803 16.1295 15.851C16.2956 15.5213 16.2125 15.233 16.0883 14.986C15.9636 14.739 14.9966 12.297 14.5541 11.3207Z" fill="white" />
                            </svg>
                        </span>
                        <span class="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Soporte</span>
                    </button>
                </li>
                <li className="px-5" onClick={signOutHandler}>
                    <button onClick={() => setNav(false)} class="w-full flex items-center p-2 rounded-lg dark:text-white   hover:bg-[#00000030] dark:hover:bg-gray-700">
                        <svg aria-hidden="true" class="flex-shrink-0 w-8 h-8 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                        <span class="flex-1 text-left ml-3 whitespace-nowrap text-white  hover:font-medium">Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        default:
    }
}
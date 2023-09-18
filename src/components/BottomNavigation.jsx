'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context'
import { usePathname } from 'next/navigation'

function Button({ click, children, name }) {
    const { introClientVideo } = useUser()

    const pathname = usePathname()
    const query = pathname.split('/').pop().toString()
    return <button type="button" className={`relative flex flex-col items-center justify-between p-2.5 group text-white `} onClick={click}>
        {children}
        <span className={`absolute h-[5px] bottom-0 ${name == query && introClientVideo == false && 'bg-gray-50 absolute w-full h-[5px] bottom-0'} ${name == 'video' && introClientVideo && 'bg-gray-50 absolute w-full h-[5px] bottom-0'}`}></span>

    </button>
}



export default function BottomNavigation({ rol }) {
    const { user, userDB, setUserProfile, filter, setFilter, nav, setNav, setIntroClientVideo, introClientVideo, videoClientRef, setSoundClient, whatsapp, setWhatsapp, businessData } = useUser()

    const router = useRouter()

    const redirectHandler = (ref, name) => {
        if (name !== 'video') {
            videoClientRef.current.currentTime = 0
            videoClientRef.current.pause()
            setIntroClientVideo(false)
            router.push(ref)
            return
        }
        // if (name == 'video' && introClientVideo === true) {

        //     return
        // }

        if (introClientVideo === true) {
            videoClientRef.current.pause()
            videoClientRef.current.currentTime = 0

            setIntroClientVideo(false)
        } else {
            setIntroClientVideo(true)
            videoClientRef.current.currentTime = 0

            videoClientRef.current.play()

            setSoundClient(true)

        }
        videoClientRef.current.muted = false

    }

    // const redirectHandlerWindow = (ref) => {
    //     businessData && businessData[0] && businessData[0].whatsapp
    //         ? window.open(`https://api.whatsapp.com/send?phone=${businessData[0].whatsapp}&text=hola%20mundo`, '_blank')
    //         : window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=hola%20mundo`, '_blank')
    //     // setWhatsapp(!whatsapp)
    // }


    const redirectHandlerWindow = () => {
        window.open(`https://api.whatsapp.com/send?phone=${businessData[0].whatsapp.replaceAll(' ', '')}&text=hola%20necesito%20un%20implante%20de%20osteosintesis%20¿Pueden%20ayudarme?%20`, '_blank')
        setNav(false)
        // setWhatsapp(!whatsapp)
    }







    const Profile = () => {
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.4C10.3209 2.39969 8.67111 2.83978 7.21527 3.67635C5.75942 4.51292 4.54845 5.7167 3.70323 7.16754C2.85801 8.61838 2.4081 10.2655 2.39841 11.9446C2.38872 13.6237 2.81959 15.2759 3.64801 16.7364C4.20794 16.0087 4.92773 15.4195 5.75171 15.0144C6.5757 14.6092 7.48181 14.399 8.40001 14.4H15.6C16.5182 14.399 17.4243 14.6092 18.2483 15.0144C19.0723 15.4195 19.7921 16.0087 20.352 16.7364C21.1804 15.2759 21.6113 13.6237 21.6016 11.9446C21.5919 10.2655 21.142 8.61838 20.2968 7.16754C19.4516 5.7167 18.2406 4.51292 16.7847 3.67635C15.3289 2.83978 13.6791 2.39969 12 2.4ZM21.5316 19.2912C23.136 17.1995 24.0039 14.6361 24 12C24 5.3724 18.6276 0 12 0C5.37241 0 1.35039e-05 5.3724 1.35039e-05 12C-0.00394822 14.6361 0.863899 17.1996 2.46841 19.2912L2.46241 19.3128L2.88841 19.8084C4.01387 21.1242 5.41127 22.1803 6.98429 22.9039C8.5573 23.6276 10.2685 24.0015 12 24C14.4328 24.0045 16.8089 23.2655 18.81 21.882C19.6631 21.2926 20.4367 20.5956 21.1116 19.8084L21.5376 19.3128L21.5316 19.2912ZM12 4.8C11.0452 4.8 10.1296 5.17928 9.45442 5.85441C8.77929 6.52954 8.40001 7.44521 8.40001 8.39999C8.40001 9.35477 8.77929 10.2704 9.45442 10.9456C10.1296 11.6207 11.0452 12 12 12C12.9548 12 13.8705 11.6207 14.5456 10.9456C15.2207 10.2704 15.6 9.35477 15.6 8.39999C15.6 7.44521 15.2207 6.52954 14.5456 5.85441C13.8705 5.17928 12.9548 4.8 12 4.8Z" fill="white" />
        </svg>

    }

    const Store = () => {
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_522_477)">
                <mask id="mask0_522_477" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <path d="M24 0H0V24H24V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_522_477)">
                    <path d="M0 7.512L3 0H21L24 7.512C24 8.344 23.704 9.048 23.112 9.624C22.52 10.2 21.816 10.496 21 10.512C20.184 10.528 19.48 10.232 18.888 9.624C18.296 9.016 18 8.312 18 7.512C18 8.344 17.704 9.048 17.112 9.624C16.52 10.2 15.816 10.496 15 10.512C14.184 10.528 13.48 10.232 12.888 9.624C12.296 9.016 12 8.312 12 7.512C12 8.344 11.704 9.048 11.112 9.624C10.52 10.2 9.816 10.496 9 10.512C8.184 10.528 7.48 10.232 6.888 9.624C6.296 9.016 6 8.312 6 7.512C6 8.344 5.704 9.048 5.112 9.624C4.52 10.2 3.816 10.496 3 10.512C2.184 10.528 1.48 10.232 0.888 9.624C0.296 9.016 0 8.312 0 7.512ZM1.512 22.512H22.512V24H1.512V22.512ZM3 21V12C4.136 12 5.136 11.616 6 10.848V18H18V10.848C18.864 11.616 19.864 12 21 12V21H3Z" fill="white" />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_522_477">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>

    }

    const Order = () => {
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_522_467)">
                <path d="M12.5217 12.127C12.5217 11.4857 12.0696 10.9657 11.5119 10.9657C10.9542 10.9657 10.5021 11.4857 10.5021 12.127H12.5217ZM11.5119 22.8388H10.5021C10.5021 23.2242 10.6685 23.5847 10.9463 23.8007C11.2241 24.0167 11.577 24.0601 11.8881 23.9164L11.5119 22.8388ZM19.2457 19.2682L19.6219 20.3458C20.0047 20.1691 20.2556 19.7424 20.2556 19.2682H19.2457ZM20.2556 11.8452C20.2556 11.2038 19.8034 10.6839 19.2457 10.6839C18.6881 10.6839 18.2359 11.2038 18.2359 11.8452H20.2556ZM12.1251 11.2043C11.6819 10.8149 11.0482 10.9123 10.7095 11.4219C10.3709 11.9314 10.4557 12.6602 10.8987 13.0496L12.1251 11.2043ZM14.2694 14.5502L13.6562 15.4729C13.9564 15.7367 14.3596 15.7859 14.7011 15.6L14.2694 14.5502ZM19.6735 12.895C20.1776 12.6206 20.393 11.9283 20.1546 11.3486C19.916 10.7689 19.3141 10.5212 18.8099 10.7954L19.6735 12.895ZM11.1357 11.0493C10.6181 11.2882 10.367 11.9644 10.5748 12.5596C10.7826 13.1548 11.3706 13.4436 11.8881 13.2047L11.1357 11.0493ZM19.6219 9.6341C20.1394 9.39518 20.3906 8.71896 20.1829 8.12377C19.9751 7.5286 19.3871 7.23979 18.8695 7.47874L19.6219 9.6341ZM18.8696 9.6341C19.3872 9.87301 19.9752 9.58409 20.1829 8.98889C20.3906 8.39369 20.1393 7.71752 19.6218 7.47868L18.8696 9.6341ZM11.8879 3.90965C11.3704 3.6708 10.7824 3.9597 10.5748 4.55491C10.367 5.15014 10.6183 5.8263 11.1359 6.06516L11.8879 3.90965ZM19.7405 7.54567C19.2545 7.23138 18.6388 7.42982 18.3654 7.98889C18.0921 8.54797 18.2647 9.25598 18.7509 9.57031L19.7405 7.54567ZM22.0073 10.3433L22.4385 11.3934C22.7801 11.2079 23.0031 10.8186 23.0164 10.3844C23.0299 9.95028 22.8314 9.54383 22.5021 9.33092L22.0073 10.3433ZM18.8099 10.7954C18.3056 11.0693 18.0904 11.7611 18.3286 12.3412C18.5667 12.921 19.1691 13.1689 19.6735 12.895L18.8099 10.7954ZM18.4929 7.77718C18.1187 8.2527 18.1506 8.98703 18.564 9.41748C18.9775 9.84778 19.6161 9.81124 19.9904 9.33572L18.4929 7.77718ZM22.5526 4.34947L23.3013 5.12873C23.5299 4.83812 23.6158 4.43444 23.5294 4.05529C23.4431 3.67613 23.1963 3.37262 22.873 3.24823L22.5526 4.34947ZM14.2694 1.16135L14.5898 0.060111C14.1947 -0.0919711 13.759 0.0506654 13.4926 0.419227L14.2694 1.16135ZM10.7284 4.24528C10.372 4.7386 10.4309 5.47076 10.8598 5.88062C11.2888 6.2905 11.9255 6.22284 12.2819 5.72953L10.7284 4.24528ZM3.39526 7.47868C2.87768 7.71752 2.62647 8.39369 2.83416 8.98889C3.04186 9.58409 3.62983 9.87301 4.14742 9.6341L3.39526 7.47868ZM11.8813 6.06516C12.3988 5.8263 12.65 5.15014 12.4423 4.55491C12.2347 3.9597 11.6467 3.6708 11.1291 3.90965L11.8813 6.06516ZM4.26619 9.56875C4.75234 9.25444 4.92489 8.54642 4.6516 7.98734C4.37829 7.42828 3.76264 7.22983 3.27649 7.54412L4.26619 9.56875ZM1.00983 10.3417L0.514984 9.32938C0.185851 9.54212 -0.0125709 9.94842 0.0006375 10.3823C0.0138459 10.8163 0.236463 11.2056 0.577739 11.3914L1.00983 10.3417ZM3.33925 12.8948C3.84331 13.1692 4.44539 12.9217 4.68404 12.3421C4.92267 11.7624 4.70751 11.0701 4.20343 10.7955L3.33925 12.8948ZM4.14755 7.47874C3.63001 7.23979 3.042 7.5286 2.83422 8.12377C2.62643 8.71896 2.87757 9.39518 3.39512 9.6341L4.14755 7.47874ZM11.129 13.2047C11.6466 13.4436 12.2346 13.1548 12.4423 12.5596C12.65 11.9644 12.3989 11.2882 11.8814 11.0493L11.129 13.2047ZM3.01694 9.32845C3.38766 9.80752 4.02596 9.85025 4.44261 9.42398C4.85926 8.99771 4.89647 8.26361 4.52574 7.78446L3.01694 9.32845ZM1.00983 4.9874L0.610781 3.92064C0.312738 4.06808 0.0944561 4.37123 0.0240652 4.73545C-0.0463255 5.09968 0.039751 5.48063 0.255434 5.75936L1.00983 4.9874ZM8.74367 1.16135L9.52069 0.41966C9.23471 0.0234138 8.75592 -0.108911 8.34461 0.094593L8.74367 1.16135ZM10.7281 5.7291C11.0842 6.22261 11.721 6.2906 12.1502 5.88097C12.5792 5.47135 12.6385 4.73921 12.2822 4.24571L10.7281 5.7291ZM12.515 12.1285C12.515 11.4872 12.0628 10.9673 11.5052 10.9673C10.9474 10.9673 10.4954 11.4872 10.4954 12.1285H12.515ZM11.5052 22.8388L11.129 23.9164C11.4402 24.0601 11.7931 24.0167 12.0709 23.8007C12.3485 23.5847 12.515 23.2242 12.515 22.8388H11.5052ZM3.77134 19.2682H2.76152C2.76152 19.7424 3.01237 20.1691 3.39512 20.3458L3.77134 19.2682ZM4.78115 11.8452C4.78115 11.2038 4.32904 10.6839 3.77134 10.6839C3.21364 10.6839 2.76152 11.2038 2.76152 11.8452H4.78115ZM12.1178 13.0501C12.5612 12.6612 12.6462 11.9324 12.3079 11.4225C11.9696 10.9126 11.3359 10.8147 10.8926 11.2038L12.1178 13.0501ZM8.74367 14.5502L8.31184 15.6C8.65319 15.7856 9.05603 15.7369 9.35629 15.4734L8.74367 14.5502ZM4.20343 10.7955C3.6993 10.5213 3.097 10.7689 2.8585 11.3486C2.62002 11.9283 2.83511 12.6205 3.33925 12.8948L4.20343 10.7955ZM10.5021 12.127V22.8388H12.5217V12.127H10.5021ZM11.8881 23.9164L19.6219 20.3458L18.8695 18.1904L11.1357 21.761L11.8881 23.9164ZM20.2556 19.2682V11.8452H18.2359V19.2682H20.2556ZM10.8987 13.0496L13.6562 15.4729L14.8825 13.6276L12.1251 11.2043L10.8987 13.0496ZM14.7011 15.6L19.6735 12.895L18.8099 10.7954L13.8376 13.5004L14.7011 15.6ZM11.8881 13.2047L19.6219 9.6341L18.8695 7.47874L11.1357 11.0493L11.8881 13.2047ZM19.6218 7.47868L11.8879 3.90965L11.1359 6.06516L18.8696 9.6341L19.6218 7.47868ZM18.7509 9.57031L21.5125 11.3556L22.5021 9.33092L19.7405 7.54567L18.7509 9.57031ZM21.576 9.29315L18.8099 10.7954L19.6735 12.895L22.4385 11.3934L21.576 9.29315ZM19.9904 9.33572L23.3013 5.12873L21.8038 3.57022L18.4929 7.77718L19.9904 9.33572ZM22.873 3.24823L14.5898 0.060111L13.9489 2.26259L22.2321 5.45071L22.873 3.24823ZM13.4926 0.419227L10.7284 4.24528L12.2819 5.72953L15.0461 1.90348L13.4926 0.419227ZM4.14742 9.6341L11.8813 6.06516L11.1291 3.90965L3.39526 7.47868L4.14742 9.6341ZM3.27649 7.54412L0.514984 9.32938L1.50469 11.354L4.26619 9.56875L3.27649 7.54412ZM0.577739 11.3914L3.33925 12.8948L4.20343 10.7955L1.44193 9.29206L0.577739 11.3914ZM3.39512 9.6341L11.129 13.2047L11.8814 11.0493L4.14755 7.47874L3.39512 9.6341ZM4.52574 7.78446L1.76423 4.21544L0.255434 5.75936L3.01694 9.32845L4.52574 7.78446ZM1.40888 6.05417L9.14275 2.22811L8.34461 0.094593L0.610781 3.92064L1.40888 6.05417ZM7.96664 1.90304L10.7281 5.7291L12.2822 4.24571L9.52069 0.41966L7.96664 1.90304ZM10.4954 12.1285V22.8388H12.515V12.1285H10.4954ZM11.8814 21.761L4.14755 18.1904L3.39512 20.3458L11.129 23.9164L11.8814 21.761ZM4.78115 19.2682V11.8452H2.76152V19.2682H4.78115ZM10.8926 11.2038L8.1311 13.6271L9.35629 15.4734L12.1178 13.0501L10.8926 11.2038ZM9.17546 13.5004L4.20343 10.7955L3.33925 12.8948L8.31184 15.6L9.17546 13.5004Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_522_467">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>

    }

    // const Recetas = () => {
    //     return <li className="px-5">
    //         <Link href={`/${rol}/Pedidos`} onClick={() => setNav(false)} className="flex items-center p-2 rounded-lg    hover:bg-[#00000030] ">
    //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                 <g clipPath="url(#clip0_522_467)">
    //                     <path d="M12.5217 12.127C12.5217 11.4857 12.0696 10.9657 11.5119 10.9657C10.9542 10.9657 10.5021 11.4857 10.5021 12.127H12.5217ZM11.5119 22.8388H10.5021C10.5021 23.2242 10.6685 23.5847 10.9463 23.8007C11.2241 24.0167 11.577 24.0601 11.8881 23.9164L11.5119 22.8388ZM19.2457 19.2682L19.6219 20.3458C20.0047 20.1691 20.2556 19.7424 20.2556 19.2682H19.2457ZM20.2556 11.8452C20.2556 11.2038 19.8034 10.6839 19.2457 10.6839C18.6881 10.6839 18.2359 11.2038 18.2359 11.8452H20.2556ZM12.1251 11.2043C11.6819 10.8149 11.0482 10.9123 10.7095 11.4219C10.3709 11.9314 10.4557 12.6602 10.8987 13.0496L12.1251 11.2043ZM14.2694 14.5502L13.6562 15.4729C13.9564 15.7367 14.3596 15.7859 14.7011 15.6L14.2694 14.5502ZM19.6735 12.895C20.1776 12.6206 20.393 11.9283 20.1546 11.3486C19.916 10.7689 19.3141 10.5212 18.8099 10.7954L19.6735 12.895ZM11.1357 11.0493C10.6181 11.2882 10.367 11.9644 10.5748 12.5596C10.7826 13.1548 11.3706 13.4436 11.8881 13.2047L11.1357 11.0493ZM19.6219 9.6341C20.1394 9.39518 20.3906 8.71896 20.1829 8.12377C19.9751 7.5286 19.3871 7.23979 18.8695 7.47874L19.6219 9.6341ZM18.8696 9.6341C19.3872 9.87301 19.9752 9.58409 20.1829 8.98889C20.3906 8.39369 20.1393 7.71752 19.6218 7.47868L18.8696 9.6341ZM11.8879 3.90965C11.3704 3.6708 10.7824 3.9597 10.5748 4.55491C10.367 5.15014 10.6183 5.8263 11.1359 6.06516L11.8879 3.90965ZM19.7405 7.54567C19.2545 7.23138 18.6388 7.42982 18.3654 7.98889C18.0921 8.54797 18.2647 9.25598 18.7509 9.57031L19.7405 7.54567ZM22.0073 10.3433L22.4385 11.3934C22.7801 11.2079 23.0031 10.8186 23.0164 10.3844C23.0299 9.95028 22.8314 9.54383 22.5021 9.33092L22.0073 10.3433ZM18.8099 10.7954C18.3056 11.0693 18.0904 11.7611 18.3286 12.3412C18.5667 12.921 19.1691 13.1689 19.6735 12.895L18.8099 10.7954ZM18.4929 7.77718C18.1187 8.2527 18.1506 8.98703 18.564 9.41748C18.9775 9.84778 19.6161 9.81124 19.9904 9.33572L18.4929 7.77718ZM22.5526 4.34947L23.3013 5.12873C23.5299 4.83812 23.6158 4.43444 23.5294 4.05529C23.4431 3.67613 23.1963 3.37262 22.873 3.24823L22.5526 4.34947ZM14.2694 1.16135L14.5898 0.060111C14.1947 -0.0919711 13.759 0.0506654 13.4926 0.419227L14.2694 1.16135ZM10.7284 4.24528C10.372 4.7386 10.4309 5.47076 10.8598 5.88062C11.2888 6.2905 11.9255 6.22284 12.2819 5.72953L10.7284 4.24528ZM3.39526 7.47868C2.87768 7.71752 2.62647 8.39369 2.83416 8.98889C3.04186 9.58409 3.62983 9.87301 4.14742 9.6341L3.39526 7.47868ZM11.8813 6.06516C12.3988 5.8263 12.65 5.15014 12.4423 4.55491C12.2347 3.9597 11.6467 3.6708 11.1291 3.90965L11.8813 6.06516ZM4.26619 9.56875C4.75234 9.25444 4.92489 8.54642 4.6516 7.98734C4.37829 7.42828 3.76264 7.22983 3.27649 7.54412L4.26619 9.56875ZM1.00983 10.3417L0.514984 9.32938C0.185851 9.54212 -0.0125709 9.94842 0.0006375 10.3823C0.0138459 10.8163 0.236463 11.2056 0.577739 11.3914L1.00983 10.3417ZM3.33925 12.8948C3.84331 13.1692 4.44539 12.9217 4.68404 12.3421C4.92267 11.7624 4.70751 11.0701 4.20343 10.7955L3.33925 12.8948ZM4.14755 7.47874C3.63001 7.23979 3.042 7.5286 2.83422 8.12377C2.62643 8.71896 2.87757 9.39518 3.39512 9.6341L4.14755 7.47874ZM11.129 13.2047C11.6466 13.4436 12.2346 13.1548 12.4423 12.5596C12.65 11.9644 12.3989 11.2882 11.8814 11.0493L11.129 13.2047ZM3.01694 9.32845C3.38766 9.80752 4.02596 9.85025 4.44261 9.42398C4.85926 8.99771 4.89647 8.26361 4.52574 7.78446L3.01694 9.32845ZM1.00983 4.9874L0.610781 3.92064C0.312738 4.06808 0.0944561 4.37123 0.0240652 4.73545C-0.0463255 5.09968 0.039751 5.48063 0.255434 5.75936L1.00983 4.9874ZM8.74367 1.16135L9.52069 0.41966C9.23471 0.0234138 8.75592 -0.108911 8.34461 0.094593L8.74367 1.16135ZM10.7281 5.7291C11.0842 6.22261 11.721 6.2906 12.1502 5.88097C12.5792 5.47135 12.6385 4.73921 12.2822 4.24571L10.7281 5.7291ZM12.515 12.1285C12.515 11.4872 12.0628 10.9673 11.5052 10.9673C10.9474 10.9673 10.4954 11.4872 10.4954 12.1285H12.515ZM11.5052 22.8388L11.129 23.9164C11.4402 24.0601 11.7931 24.0167 12.0709 23.8007C12.3485 23.5847 12.515 23.2242 12.515 22.8388H11.5052ZM3.77134 19.2682H2.76152C2.76152 19.7424 3.01237 20.1691 3.39512 20.3458L3.77134 19.2682ZM4.78115 11.8452C4.78115 11.2038 4.32904 10.6839 3.77134 10.6839C3.21364 10.6839 2.76152 11.2038 2.76152 11.8452H4.78115ZM12.1178 13.0501C12.5612 12.6612 12.6462 11.9324 12.3079 11.4225C11.9696 10.9126 11.3359 10.8147 10.8926 11.2038L12.1178 13.0501ZM8.74367 14.5502L8.31184 15.6C8.65319 15.7856 9.05603 15.7369 9.35629 15.4734L8.74367 14.5502ZM4.20343 10.7955C3.6993 10.5213 3.097 10.7689 2.8585 11.3486C2.62002 11.9283 2.83511 12.6205 3.33925 12.8948L4.20343 10.7955ZM10.5021 12.127V22.8388H12.5217V12.127H10.5021ZM11.8881 23.9164L19.6219 20.3458L18.8695 18.1904L11.1357 21.761L11.8881 23.9164ZM20.2556 19.2682V11.8452H18.2359V19.2682H20.2556ZM10.8987 13.0496L13.6562 15.4729L14.8825 13.6276L12.1251 11.2043L10.8987 13.0496ZM14.7011 15.6L19.6735 12.895L18.8099 10.7954L13.8376 13.5004L14.7011 15.6ZM11.8881 13.2047L19.6219 9.6341L18.8695 7.47874L11.1357 11.0493L11.8881 13.2047ZM19.6218 7.47868L11.8879 3.90965L11.1359 6.06516L18.8696 9.6341L19.6218 7.47868ZM18.7509 9.57031L21.5125 11.3556L22.5021 9.33092L19.7405 7.54567L18.7509 9.57031ZM21.576 9.29315L18.8099 10.7954L19.6735 12.895L22.4385 11.3934L21.576 9.29315ZM19.9904 9.33572L23.3013 5.12873L21.8038 3.57022L18.4929 7.77718L19.9904 9.33572ZM22.873 3.24823L14.5898 0.060111L13.9489 2.26259L22.2321 5.45071L22.873 3.24823ZM13.4926 0.419227L10.7284 4.24528L12.2819 5.72953L15.0461 1.90348L13.4926 0.419227ZM4.14742 9.6341L11.8813 6.06516L11.1291 3.90965L3.39526 7.47868L4.14742 9.6341ZM3.27649 7.54412L0.514984 9.32938L1.50469 11.354L4.26619 9.56875L3.27649 7.54412ZM0.577739 11.3914L3.33925 12.8948L4.20343 10.7955L1.44193 9.29206L0.577739 11.3914ZM3.39512 9.6341L11.129 13.2047L11.8814 11.0493L4.14755 7.47874L3.39512 9.6341ZM4.52574 7.78446L1.76423 4.21544L0.255434 5.75936L3.01694 9.32845L4.52574 7.78446ZM1.40888 6.05417L9.14275 2.22811L8.34461 0.094593L0.610781 3.92064L1.40888 6.05417ZM7.96664 1.90304L10.7281 5.7291L12.2822 4.24571L9.52069 0.41966L7.96664 1.90304ZM10.4954 12.1285V22.8388H12.515V12.1285H10.4954ZM11.8814 21.761L4.14755 18.1904L3.39512 20.3458L11.129 23.9164L11.8814 21.761ZM4.78115 19.2682V11.8452H2.76152V19.2682H4.78115ZM10.8926 11.2038L8.1311 13.6271L9.35629 15.4734L12.1178 13.0501L10.8926 11.2038ZM9.17546 13.5004L4.20343 10.7955L3.33925 12.8948L8.31184 15.6L9.17546 13.5004Z" fill="white" />
    //                 </g>
    //                 <defs>
    //                     <clipPath id="clip0_522_467">
    //                         <rect width="24" height="24" fill="white" />
    //                     </clipPath>
    //                 </defs>
    //             </svg>
    //             <span className="flex-1 ml-3 whitespace-nowrap text-white  hover:font-medium">Pedidos</span>
    //         </Link>
    //     </li>
    // }
    const Products = () => {
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_522_469)">
                <path d="M11.0006 16.665C11.0998 16.6643 11.196 16.7 11.2706 16.7654C11.3453 16.8308 11.3933 16.9214 11.4056 17.02V22.78C11.4059 23.0934 11.2857 23.395 11.0697 23.6221C10.8537 23.8493 10.5586 23.9846 10.2456 24H2.03556C1.72574 23.9995 1.42762 23.8816 1.20125 23.67C0.974872 23.4586 0.837059 23.1691 0.815561 22.86V17.075C0.814802 16.9757 0.850541 16.8796 0.915989 16.8049C0.981437 16.7303 1.07203 16.6823 1.17056 16.67H11.0006V16.665ZM22.8055 16.665C22.9045 16.6654 23 16.7015 23.0746 16.7666C23.149 16.8319 23.1973 16.9219 23.2105 17.02V22.78C23.2109 23.0942 23.0899 23.3965 22.8728 23.6238C22.6559 23.8511 22.3595 23.9858 22.0456 24H13.8355C13.5263 23.9994 13.2287 23.8813 13.0032 23.6696C12.7776 23.4581 12.6408 23.1686 12.6205 22.86V17.075C12.6198 16.9757 12.6556 16.8796 12.721 16.8049C12.7865 16.7303 12.8771 16.6823 12.9756 16.67H22.7806L22.8055 16.665ZM7.84556 18.35L7.80056 18.385L5.50056 20.915L4.44556 19.915C4.39418 19.864 4.32654 19.8325 4.25438 19.826C4.18223 19.8197 4.11012 19.8388 4.05056 19.88L4.01056 19.915L3.57556 20.305C3.54911 20.3254 3.52711 20.351 3.51091 20.3802C3.49472 20.4095 3.48468 20.4416 3.4814 20.475C3.47812 20.5082 3.48168 20.5417 3.49186 20.5736C3.50203 20.6054 3.5186 20.6348 3.54056 20.66L3.57556 20.7L5.07556 22.115C5.19156 22.2294 5.34764 22.294 5.51056 22.295C5.59166 22.2974 5.67235 22.2826 5.74733 22.2516C5.8223 22.2205 5.88985 22.174 5.94556 22.115L8.70556 19.195C8.74688 19.1453 8.77193 19.0841 8.77729 19.0198C8.78266 18.9553 8.76809 18.8909 8.73556 18.835L8.70556 18.8L8.27056 18.41C8.22192 18.346 8.14998 18.3038 8.0704 18.2926C7.99081 18.2814 7.91002 18.302 7.84556 18.35ZM19.6506 18.35L19.6056 18.385L17.2756 20.915L16.2205 19.915C16.17 19.8643 16.1032 19.833 16.0319 19.8266C15.9606 19.8203 15.8893 19.8391 15.8305 19.88L15.7855 19.915L15.3505 20.305C15.3245 20.3257 15.3029 20.3516 15.2872 20.381C15.2714 20.4104 15.2618 20.4428 15.2591 20.4761C15.2562 20.5093 15.2603 20.5427 15.2708 20.5744C15.2814 20.606 15.2983 20.6351 15.3205 20.66L15.3505 20.7L16.8505 22.115C16.9666 22.2294 17.1227 22.294 17.2855 22.295C17.3668 22.2977 17.4475 22.283 17.5225 22.252C17.5975 22.221 17.6651 22.1742 17.7205 22.115L20.5006 19.17C20.5361 19.1167 20.5549 19.0541 20.5549 18.99C20.5549 18.9259 20.5361 18.8633 20.5006 18.81V18.775L20.0656 18.385C20.0137 18.3276 19.942 18.2921 19.8649 18.2856C19.7879 18.2791 19.7113 18.3022 19.6506 18.35ZM10.2706 12.59C10.5689 12.6012 10.8518 12.725 11.0624 12.9366C11.273 13.1482 11.3957 13.4316 11.4056 13.73V15.035C11.4072 15.1306 11.375 15.2237 11.3146 15.2978C11.2542 15.372 11.1695 15.4223 11.0756 15.44H0.380561C0.285428 15.4381 0.194286 15.4014 0.124297 15.337C0.0543082 15.2725 0.0103006 15.1847 0.000561168 15.09V13.815C-0.00865781 13.5148 0.0959958 13.2222 0.293525 12.9959C0.491053 12.7696 0.766843 12.6264 1.06556 12.595H10.2706V12.59ZM22.8606 12.59C23.1598 12.6 23.4439 12.7232 23.6556 12.9349C23.8673 13.1466 23.9905 13.4309 24.0006 13.73V15.035C24.0022 15.1306 23.97 15.2237 23.9096 15.2978C23.8492 15.372 23.7646 15.4223 23.6706 15.44H12.9706C12.8755 15.4367 12.7849 15.3989 12.7159 15.3335C12.6468 15.2681 12.6041 15.1798 12.5956 15.085V13.815C12.5863 13.5148 12.691 13.2222 12.8885 12.9959C13.086 12.7696 13.3619 12.6264 13.6606 12.595H22.8606V12.59ZM16.8606 4.09C16.959 4.09046 17.0539 4.12675 17.1275 4.19208C17.2012 4.25742 17.2484 4.34732 17.2606 4.445V10.185C17.2613 10.4952 17.1437 10.794 16.932 11.0206C16.7202 11.2472 16.43 11.3847 16.1206 11.405H7.93556C7.62528 11.4032 7.32714 11.2842 7.10088 11.0719C6.87463 10.8596 6.737 10.5695 6.71556 10.26V4.5C6.71603 4.40158 6.75232 4.30668 6.81764 4.23307C6.88298 4.15945 6.97289 4.11215 7.07056 4.1H16.8805L16.8606 4.09ZM13.7256 5.775L13.6855 5.81L11.3556 8.34L10.3006 7.34C10.25 7.28933 10.1832 7.25806 10.1119 7.25165C10.0406 7.24525 9.96933 7.26414 9.91056 7.305L9.86556 7.34L9.43056 7.73C9.4047 7.75084 9.38324 7.77661 9.36745 7.80583C9.35167 7.83504 9.34186 7.8671 9.3386 7.90016C9.33534 7.93321 9.3387 7.96657 9.34848 7.99831C9.35826 8.03005 9.37427 8.05951 9.39556 8.085L9.43056 8.125L10.9306 9.535C10.9871 9.59323 11.0547 9.63959 11.1294 9.67135C11.2041 9.70312 11.2844 9.71965 11.3656 9.72C11.4471 9.7224 11.5282 9.70711 11.6033 9.67518C11.6784 9.64325 11.7457 9.59542 11.8006 9.535L14.5656 6.62C14.6048 6.56918 14.6281 6.50786 14.6326 6.44378C14.6371 6.37972 14.6225 6.31576 14.5906 6.26L14.5656 6.225L14.1306 5.835C14.0849 5.78003 14.0216 5.74254 13.9514 5.72887C13.8812 5.7152 13.8085 5.7262 13.7455 5.76L13.7256 5.775ZM16.8805 0C17.1899 0.000601974 17.4874 0.118665 17.713 0.330305C17.9386 0.541944 18.0752 0.83136 18.0955 1.14V2.445C18.0942 2.5437 18.0577 2.63868 17.9927 2.71291C17.9276 2.78713 17.8382 2.83574 17.7406 2.85H6.31056C6.21203 2.85091 6.11654 2.81587 6.042 2.75144C5.96744 2.68702 5.91894 2.59762 5.90556 2.5V1.22C5.9048 0.910638 6.02161 0.612544 6.23233 0.386044C6.44305 0.159542 6.73195 0.0215531 7.04056 0H16.8805Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_522_469">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>


    }

    const Support = () => {
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4139 0.0150934C5.02271 0.315705 -0.0192027 5.59444 5.49822e-05 11.9397C0.00322119 13.8075 0.450834 15.6477 1.30597 17.3087L0.0325524 23.4423C0.0170149 23.519 0.0210832 23.5984 0.044381 23.6731C0.0676789 23.7478 0.109454 23.8154 0.165844 23.8697C0.222233 23.924 0.291416 23.9632 0.366996 23.9837C0.442575 24.0042 0.522111 24.0054 0.598248 23.987L6.65721 22.5633C8.26195 23.3556 10.0236 23.7796 11.8135 23.8043C18.3454 23.9041 23.7906 18.76 23.994 12.2848C24.213 5.34072 18.4369 -0.317984 11.4139 0.0138909V0.0150934ZM18.6439 18.4931C17.7707 19.3623 16.7343 20.0509 15.5942 20.5193C14.4542 20.9877 13.2327 21.2267 12 21.2226C10.5497 21.2271 9.1182 20.8944 7.81869 20.251L6.97496 19.8338L3.25942 20.7068L4.04177 16.9419L3.62532 16.1339C2.95022 14.8265 2.60013 13.376 2.60466 11.9049C2.60466 9.41581 3.58199 7.07465 5.35611 5.31547C7.12444 3.56676 9.51186 2.58549 12 2.58472C14.5107 2.58472 16.8698 3.55389 18.6439 5.31427C19.518 6.17478 20.2116 7.20072 20.6843 8.33212C21.1569 9.46353 21.399 10.6777 21.3966 11.9037C21.3966 14.3711 20.4036 16.7495 18.6439 18.4943V18.4931Z" fill="white" />
            <path d="M17.8249 14.4846L15.5008 13.8232C15.3508 13.7802 15.192 13.7783 15.041 13.8177C14.8901 13.857 14.7524 13.9362 14.6426 14.0469L14.0745 14.6217C13.957 14.7406 13.8069 14.8223 13.6432 14.8565C13.4794 14.8907 13.3092 14.876 13.1537 14.8141C12.0549 14.3728 9.74152 12.3334 9.15055 11.3125C9.06771 11.1683 9.02987 11.0027 9.04187 10.8369C9.05388 10.6711 9.1152 10.5126 9.21795 10.3818L9.71384 9.74455C9.8093 9.62244 9.86971 9.47669 9.88858 9.3229C9.90745 9.16911 9.88408 9.0131 9.82096 8.87157L8.84363 6.67831C8.78836 6.55572 8.70537 6.44761 8.6012 6.36248C8.49704 6.27735 8.37452 6.21752 8.2433 6.18769C8.11207 6.15785 7.97571 6.15884 7.84492 6.19055C7.71414 6.22227 7.5925 6.28386 7.48957 6.37048C6.84083 6.91519 6.07052 7.74127 5.97784 8.65874C5.81295 10.2736 6.51104 12.3094 9.15176 14.7551C12.2029 17.5797 14.6474 17.9536 16.2374 17.5701C17.1401 17.3536 17.8623 16.4843 18.316 15.7736C18.3886 15.6607 18.4336 15.5324 18.4475 15.399C18.4614 15.2655 18.4438 15.1307 18.396 15.0053C18.3482 14.8799 18.2717 14.7675 18.1725 14.6771C18.0733 14.5866 17.9543 14.5207 17.8249 14.4846Z" fill="white" />
        </svg>


    }





















    switch (rol) {
        case 'Cliente':
            return <div className={`grid h-full max-w-lg grid-cols-4 mx-auto font-medium `}>
                <Button click={() => redirectHandler(`/Cliente/Pedidos`, 'Pedidos')} name={'Pedidos'}>
                    <Order />
                    <span className="inline-block  text-[12px] text-white   ">Pedidos</span>
                </Button>
                <Button click={() => redirectHandler(`/`, 'Cliente')} name={'Cliente'}>
                    <Store />
                    <span className="text-[12px] text-white   ">Tienda</span>
                </Button>

                <Button click={() => redirectHandler(null, 'video')} name={'video'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5438 3.27188L15.2719 0H12.5438L15.8156 3.27188H18.5438ZM1.09219 0H0V3.27188H4.36406L1.09219 0ZM11.4562 3.27188L8.17969 0H5.45156L8.72344 3.27188H11.4562ZM19.6359 7.63594H15.2719L18.5438 4.36406H15.8156L12.5438 7.63594H8.17969L11.4516 4.36406H8.72344L5.45156 7.63594H1.09219L4.36406 4.36406H0V21.8203C0 23.0203 0.979687 24 2.17969 24H21.8156C23.0203 24 23.9953 23.0203 23.9953 21.8203V4.36406H22.9031L19.6359 7.63594ZM8.72812 20.7281V10.9078L17.4562 15.8156L8.72812 20.7281ZM19.6359 0L22.9078 3.27188H24V0H19.6359Z" fill="white" />
                    </svg>
                    <span className="text-[12px] text-white   ">Video</span>
                </Button>
                <Button click={redirectHandlerWindow}>
                    <Support />
                    <span className="text-[12px] text-white   ">Soporte</span>
                </Button>
            </div>
            break
        case 'Medico':
            return <div className={`grid h-full max-w-lg grid-cols-3 mx-auto font-medium  z-50`}>
                <Button click={() => redirectHandler(`/Medico/Recetas`)} name={'Recetas'}>
                    <svg className="w-11 h-11 mb-1 text-white rounded-full  p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span className="text-[12px] text-white   ">Recetas</span>
                </Button>
                <Button click={() => redirectHandler(`/`)} name={'Cliente'}>
                    <Store />
                    <span className="text-[12px] text-white   ">Tienda</span>
                </Button>
                <Button click={redirectHandlerWindow}>
                    <span className="w-11 h-11 mb-1 text-white rounded-full  p-1">
                        <Support />
                    </span>
                    <span className="text-[12px] text-white   ">Soporte</span>
                </Button>
            </div>
            break
        case 'Clinica':
            return userDB && userDB.access && userDB.access == 'verificador'
                ? <div className={`grid h-full max-w-lg grid-cols-4 mx-auto font-medium `}>
                    <Button click={() => redirectHandler(`/`)} name={'Cliente'}>
                        <Store />
                        <span className="text-[12px] text-white   ">Tienda</span>
                    </Button>
                    <Button click={() => redirectHandler(`/Clinica/Pedidos`)} name={'Pedidos'}>
                        <Order />

                        <span className="text-[12px] text-white   ">Pedidos</span>
                    </Button>
                    <Button click={() => redirectHandler(`/Clinica/Verficar`)} name={'Pedidos'}>
                        <svg className="w-11 h-11 mb-1 text-white rounded-full  p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <svg aria-hidden="true" className="w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        </svg>
                        <span className="text-[12px] text-white   ">Verificar</span>
                    </Button>
                    <Button click={redirectHandlerWindow}>
                        <span className="w-11 h-11 mb-1 text-white rounded-full  p-1">
                            <Support />
                        </span>
                        <span className="text-[12px] text-white   ">Soporte</span>
                    </Button>
                </div>
                : <div className={`grid h-full max-w-lg grid-cols-3 mx-auto font-medium `}>

                    <Button click={() => redirectHandler(`/Cliente/Pedidos`)} name={'Pedidos'}>
                        <Order />

                        <span className="text-[12px] text-white   ">Pedidos</span>
                    </Button>
                    <Button click={() => redirectHandler(`/`)} name={'Cliente'}>
                        <Store />
                        <span className="text-[12px] text-white   ">Tienda</span>
                    </Button>
                    <Button click={redirectHandlerWindow}>
                        <span className="w-11 h-11 mb-1 text-white rounded-full  p-1">
                            <Support />

                        </span>
                        <span className="text-[12px] text-white   ">Soporte</span>
                    </Button>
                </div>
        case 'Distribuidor':
            return <div className={`grid h-full max-w-lg ${rol === 'Distribuidor' ? 'grid-cols-5' : 'grid-cols-4'} mx-auto font-medium z-50`}>
                <Button click={() => redirectHandler(`/`)} name={'Cliente'}>
                    <Store />
                    <span className="text-[12px] text-white   ">Tienda</span>
                </Button>
                <Button click={() => redirectHandler(`/Distribuidor/Productos`)} name={'Productos'}>
                    <Products />
                    <span className="text-[12px] text-white   ">Productos</span>
                </Button>
                <Button click={() => redirectHandler(`/Distribuidor/Agregar`)} name={'Agregar'}>
                    <svg className="w-11 h-11 mb-1 text-white rounded-full  p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                    </svg>
                    <span className="text-[12px] text-white   ">Agregar</span>
                </Button>
                <Button click={() => redirectHandler(`/Distribuidor/Transacciones`)} name={'Transacciones'}>
                    <Order />
                    <span className="text-[12px] text-white   " >Pedidos</span>
                </Button>
                <Button click={redirectHandlerWindow}>
                    <span className="w-11 h-11 mb-1 text-white rounded-full  p-1">
                        <Support />
                    </span>
                    <span className="text-[12px] text-white   ">Soporte</span>
                </Button>
            </div>
        case 'Administrador':
            return <div className={`grid h-full max-w-lg   grid-cols-3 mx-auto font-medium z-50`}>
                <Button click={() => redirectHandler(`/`)} name={'Cliente'}>
                    <Store />
                    <span className="text-[12px] text-white   ">Tienda</span>
                </Button>

                <Button click={() => redirectHandler(`Administrador/Plantilla/Agregar`)} name={'Agregar'}>
                    <svg className="w-11 h-11 mb-1 text-white rounded-full  p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                    </svg>
                    <span className="text-[12px] text-white   ">Agregar</span>
                </Button>

                <Button click={() => redirectHandler(`Administrador/Plantilla`)} name={'Plantilla'}>
                    <Products />
                    <span className="text-[12px] text-white   ">Productos</span>
                </Button>
            </div>
        default:

    }




}





// <svg className="w-11 h-11 mb-1 text-white rounded-full  p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                         <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
//                     </svg>
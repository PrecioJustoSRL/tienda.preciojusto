'use client'

import React, { useState, useMemo, useRef, useContext } from 'react'

const UserContext = React.createContext()

export function UserProvider({ children }) {
	const [isBack, setBack] = useState(0)
	const [session, setSession] = useState(undefined)
	const [user, setUser] = useState(undefined)
	const [userDB, setUserDB] = useState(undefined)
	const [distributorPDB, setDistributorPDB] = useState(undefined)
	const [precioJustoPDB, setPrecioJustoPDB] = useState(undefined)
	const [productDB, setProduct] = useState(undefined)
	const [item, setItem] = useState(undefined)
	const [cart, setCart] = useState({})
	const [cartDB, setCartDB] = useState({})
	const [success, setSuccess] = useState(null)
	const [pedidos, setPedidos] = useState([])
	const [ultimoPedido, setUltimoPedido] = useState(undefined)
	const [qr, setQr] = useState('');
	const [QRurl, setQRurl] = useState('');
	const [recetaDB, setRecetaDB] = useState({});
	const [filter, setFilter] = useState('');
	const [filterQR, setFilterQR] = useState('');
	const [recetaDBP, setRecetaDBP] = useState(undefined);
	const [nav, setNav] = useState(false)
	const [temporal, setTemporal] = useState(undefined)
	const [userUuid, setUserUuid] = useState(undefined)
	const [modal, setModal] = useState('')
	const [msg, setMsg] = useState('')
	const [tienda, setTienda] = useState(undefined)
	const timer = useRef(null);
	const webcamRef1 = useRef()
	const videoRef = useRef();
	const [play, setPlay] = useState(true)
	const [sound, setSound] = useState(false)
	const [introVideo, setUserIntroVideo] = useState(undefined)

	const videoClientRef = useRef();
	const [soundClient, setSoundClient] = useState(false)
	const [introClientVideo, setUserIntroClientVideo] = useState(undefined)
	const [search, setSearch] = useState(false)
	const [sound1, setSound1] = useState(false)
	const [sound2, setSound2] = useState(false)
	const [whatsapp, setWhatsapp] = useState(false)
	const [whatsappMSG, setWhatsappMSG] = useState('')
	const [state, setState] = useState({})
	const [webScann, setWebScann] = useState(false)
	const [businessData, setBusinessData] = useState(undefined)
	const [qrBCP, setQrBCP] = useState(undefined)
	const [paySuccess, setPaySuccess] = useState(undefined)
	const [filterDis, setFilterDis] = useState('')
	const [check, setCheck] = useState(false)
	const [image1, setImage1] = useState(undefined)
	const setUserProfile = (data) => {
		setUser(data)
	}
	const setUserData = (data) => {
		setUserDB(data)
	}
	const setUserDistributorPDB = (data) => {
		setDistributorPDB(data)
	}
	const setUserProduct = (data) => {
		setProduct(data)
	}
	const setUserPedidos = (data) => {
		setPedidos(data)
	}
	const setUserCart = (data) => {
		setCart(data)
	}
	const setUserItem = (data) => {
		setItem(data)
	}
	const setUserSuccess = (data, time) => {
		console.log(data)
		success === null ? setSuccess(data) : ''

		if (data !== null) {
			let timer = setTimeout(() => {
				console.log(success)
				setUserSuccess(null)
			}, time ? time : 6000)
		}
		return () => {
			clearTimeout(timer)
		};
	}

	const setIntroVideo = (data) => {
		 setUserIntroVideo(data)
		
		
		if (introVideo === true ){const interval = setInterval(() => {
			console.log('int')
			if (videoRef && videoRef.current && videoRef.current.ended) {
				setUserIntroVideo(false)
				clearInterval(interval)
			}
		}, 1000)}

		return () => {
			videoRef && videoRef.current && videoRef.current.ended && clearInterval(interval)
			 clearInterval(interval)

		};
	}



	const setIntroClientVideo = (data) => {
		setUserIntroClientVideo(data)

		const interval = setInterval(() => {
			console.log('int')
			if (videoClientRef.current.ended) {
				setUserIntroClientVideo(false)
				clearInterval(interval)
			}
		}, 1000)
	}

	const value = useMemo(() => {
		return ({
			user,
			userDB,
			distributorPDB,
			productDB,
			pedidos,
			item,
			cart,
			success,
			qr,
			QRurl,
			recetaDB,
			filter,
			filterQR,
			recetaDBP,
			nav,
			userUuid,
			modal,
			msg,
			tienda,
			introVideo,
			play,
			sound,
			webcamRef1,
			videoRef,
			state,
			videoClientRef,
			soundClient,
			introClientVideo, search,
			sound1,
			sound2,
			whatsapp,
			whatsappMSG,
			businessData,
			webScann,
			qrBCP, paySuccess, filterDis, check,
			session,
			cartDB,
			precioJustoPDB, ultimoPedido, 
			image1, setImage1,
			isBack, setBack,
			setUltimoPedido, setPrecioJustoPDB,
			setCartDB,
			setSession,
			setCheck,
			setFilterDis,
			setPaySuccess, setQrBCP,
			setWebScann,
			setBusinessData,
			setWhatsappMSG,
			setWhatsapp,
			setSound2,
			setSound1,
			setSearch,
			setIntroClientVideo,
			setSoundClient,
			setState,
			setSound,
			setPlay,
			setIntroVideo,
			setTienda,
			setMsg,
			setModal,
			setUserUuid,
			temporal,
			setTemporal,
			setNav,
			setRecetaDBP,
			setFilterQR,
			setFilter,
			setRecetaDB,
			setQRurl,
			setQr,
			setUserProfile,
			setUserData,
			setUserCart,
			setUserDistributorPDB,
			setUserProduct,
			setUserPedidos,
			setUserSuccess,
			setUserItem
		})
	}, [user, userDB, distributorPDB, productDB, pedidos, success, item, cart, cartDB, qr, QRurl, recetaDB, filter, filterQR, recetaDBP, nav, temporal, userUuid, modal, msg, tienda, introVideo, play, sound, state, videoClientRef,
		soundClient,
		introClientVideo,
		search,
		webcamRef1,
		sound1,
		image1,
		sound2, whatsapp,
		businessData,
		webScann,
		qrBCP,
		paySuccess, isBack, filterDis, check, session, precioJustoPDB, ultimoPedido])

	return (
		<UserContext.Provider value={value} >
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('error')
	}
	return context
}



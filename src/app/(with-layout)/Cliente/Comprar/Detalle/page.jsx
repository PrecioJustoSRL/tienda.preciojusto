'use client';
import { useState, useEffect } from 'react'
import Button from '@/components/Button';
import { useUser } from '@/context/Context.js'
import Subtitle from '@/components/Subtitle'
import { WithAuth } from '@/HOCs/WithAuth'
import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import Page from '@/components/Page'
import Label from '@/components/Label'
import MiniCard from '@/components/MiniCard'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation';
import Confeti from '@/components/Confeti';
import { useSearchParams } from 'next/navigation'
import dynamic from "next/dynamic";


const InvoicePDF = dynamic(() => import("@/components/comprobantePDF"), {
  ssr: false,
});
// import { useEffect } from 'react/ts5.0';

function Comprar({ theme, styled, click, children }) {

  const { user, userDB, cart, setUserCart, cartDB, setCartDB, productDB, setUserProduct, setUserItem, setUserData, setUserSuccess } = useUser()
  const [add, setAdd] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [state, setState] = useState({})
  const router = useRouter()
  const [dataQR, setDataQR] = useState(undefined)

  const searchParams = useSearchParams()
  const idBCP = searchParams.get('idBCP')
  console.log(idBCP)
  function onChangeHandler(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  function handlerPay() {
    // Object.values(cart).map((i) => {
    //   writeUserData('Pedido', {...i.cantidad, ...i.categoria, ...i.ciudad, ...i.costo, i.producto}, i.uuid, userDB, setUserData, setUserSuccess, 'existos', null)
    // })
    router.push('/Cliente/Comprar/Detalle')
  }
  function seguimiento() {

    router.push('/Cliente/Pedidos')
  }
  function redirect() {
    setUserCart({})
    router.push('/')
  }
  async function getDetaill() {
    const res = await readUserData('Pedido', idBCP, null, 'idBCP')
    setCartDB({ ...res[0], cart: JSON.parse(res[0].compra) })
    // console.log(res[0])
    // console.log({...res[0], cart: JSON.parse(res[0].compra)})
    // setDataQR(res[0])
  }

  // window.onbeforeunload = function (e) {
  //   console.log('onbefore')
  //   setUserCart({})
  //   return 'idsfhksdhfk'
  // }



  // window.location.hash="no-back-button";
  // window.location.hash="Again-No-back-button"
  // window.onhashchange=function(){
  //                     window.location.hash="no-back-button";
  // }



  // window.onhashchange = ()=>{
  //   console.log('change')
  //   setUserCart({})
  // }
  // window.history.forward()
  // console.log(cartDB)
  useEffect(() => {
    getDetaill()
    window.navigator.vibrate([1000])
  }, []);

  console.log(cartDB)
  return (<div className='w-full relative'>

    <Confeti />
    <audio src="/sound.mpeg" autoPlay></audio>

    <div className="relative w-full overflow-hiddden shadow-2xl bg-white lg:mx-5 lg:flex lg:flex-col lg:justify-center lg:items-center" >

      <InvoicePDF />
      {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 &&
        <h3 className='font-medium text-center text-[16px] p-5'>FELICIDADES SU COMPRA SE REALIZO CON EXITO !!!</h3>
      }

      <div className='relative items-center justify-between w-full lg:min-w-[800px] max-w-[1000px] bg-transparent   transition-all 	z-0' >
        <h3 className='text-center text-[16px] pb-3'>DETALLES DE LA COMPRA</h3>

        <br />
        <table className="w-full lg:min-w-[800px] border-[1px] border-gray-200 lg:w-full lg:min-w-auto text-[12px] text-left text-gray-500">
          <thead className="text-[12px] text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col-3" className="w-1/2 px-2 py-3 text-[16px]">
                Producto
              </th>
              <th scope="col" className="px-0 py-3 text-[16px]">
                Cantidad
              </th>
              <th scope="col" className="px-2 w-[200px] py-3 text-[16px]">
                Costo total
              </th>
            </tr>
          </thead>
          <tbody>

            {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 ? Object.values(cartDB.cart).map((i, index) => {
              return <tr className="bg-white text-[12px] border-b hover:bg-gray-50 " >
                <td className="px-3 py-4  flex flex-col text-[16px]  text-gray-700">
                  {i['nombre de producto 1']}
                  <br />
                  <span className="text-[16px]  text-gray-700  tracking-tight">Precio unidad: {i.costo} Bs.</span>
                </td>
                <td className="px-3 py-4 text-center text-gray-900">
                  {i.cantidad}
                </td>
                <td className="px-3 py-4 font-semibold text-gray-900">
                  <div className="flex items-baseline text-gray-900">
                    <span className="text-[16px]  text-gray-700  tracking-tight">{cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined ? cart[i.uuid].cantidad * i.costo : i.costo} Bs.</span>
                  </div>
                </td>
              </tr>
            })
              : <span className='block text-[16px] text-center'>No tienes productos <br /> selecciona alguno <br /> </span>}
            {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 ? Object.values(cartDB.cart).map((i, index) => {
              return <tr className="bg-white text-[12px] border-b hover:bg-gray-50 " >
                <td className="px-3 py-4  flex flex-col text-[16px]  text-gray-700">
                  TOTAl
                </td>
                <td className="px-3 py-4  text-gray-900">
                  {cartDB.check ? 'Provincía (+ 351 BS)' : ''}
                </td>
                <td className="px-3 py-4 text-[16px] text-gray-900">
                  {cartDB.cart !== undefined && cartDB.amount} BOB
                </td>
              </tr>
            }) : ''}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 && <span className='text-[16px] mt-[30px]'>*En uno momento ellos se comunicaran contigo</span>}

        <div className='flex flex-col h-[130px] justify-between items-center lg:flex-row lg:justify-around lg:gap-[10px] py-5 justify-center'>
          <Button theme='Primary' click={seguimiento}>Seguimiento de compra</Button>
          <Button theme="Primary" click={redirect}>Volver a la pagina Principal</Button>
        </div>

      </div>
      <br />
      <br />
    </div>
  </div>)
}

export default WithAuth(Comprar)

{/* <div className='relative items-center justify-between w-full max-w-[500px] bg-transparent   transition-all 	z-0' >
<ul className="flex flex-col bg-gray-100 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  p-5 ">
  <h3 className='text-center text-[16px] pb-3'>DETALLES DE LA COMPRA</h3>
  <li>{cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 ? Object.values(cartDB.cart).map((i, index) => {
    return <div className="relative w-full max-w-[500px] py-4" onClick={(e) => seeMore(e, i)} style={{ display: 'grid', gridTemplateColumns: 'auto 80px' }}>
      <div className=" flex  flex-col justify-between ">
        <div className=" font-bold text-[12px]  text-gray-950">
          Nombre de producto: {i['nombre de producto 1']}
        </div>
        <div className=" font-bold text-[12px]  text-gray-950">
          Cantidad: {i['cantidad']}u
        </div>
        <div className=" font-bold text-[12px]  text-gray-950">
          Costo Total: {i['costo'] * i['cantidad']}bs
        </div>
        <div className=" font-bold text-[12px]  text-gray-950">
          Empresa: {i['empresa']}
        </div>
        <div className=" font-bold text-[12px]  text-gray-950">
          Telefono: {i['telefono']}
        </div>
        <div className=" font-bold text-[12px]  text-gray-950">
          Celular: {i['whatsapp']}
        </div>
      </div>
    </div>
  }) : <span className='block text-[16px] text-center'>No tienes productos <br /> selecciona alguno <br /> </span>}</li>
  <li className='flex justify-between text-gray-700 text-[16px] '>
    <span className='font-bold '>TOTAL: </span>
    <span className='font-bold '>
      {cartDB.cart !== undefined && Object.values(cartDB.cart).reduce((acc, i, index) => {
        const sum = i['costo'] * i['cantidad']
        return sum + acc
      }, 0)} BOB
    </span>
  </li>
  {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 && <span className='text-[12px] pt-[12px]'>En uno momento ellos se comunicaran contigo</span>}
</ul>
<br />

<Button theme='Primary' click={seguimiento}>Seguimiento de compra</Button>
<Button theme="Primary" click={redirect}>Volver a la pagina Principal</Button>
</div> */}

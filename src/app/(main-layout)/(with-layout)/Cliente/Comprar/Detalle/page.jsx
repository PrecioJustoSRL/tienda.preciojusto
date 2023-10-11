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
        <div>
          <p className='text-[16px] pl-5'>Empresa distribuidora: {cartDB.empresa}</p>
          <p className='text-[16px] pl-5'>Celular: {cartDB.whatsapp}</p>
        </div>
        <br />
        <table className="w-full lg:min-w-[800px] border-[1px] border-gray-200 lg:w-full lg:min-w-auto text-[16px] text-left text-gray-500">
          <thead className="w-full text-[16px] text-gray-900 uppercase border-b bg-gray-100">
            <tr>
              <th scope="col-3" className="px-2 py-3 font-bold border-r">
                Productos
              </th>
              <th scope="col" className="px-0 py-3  w-[100px] text-center font-bold border-r">
                Cantidad
              </th>
              <th scope="col" className="px-2 py-3 w-[100px] text-center font-bold ">
                Costo total
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0
              ? Object.values(cartDB.cart).map((i, index) => {
                return <tr className="bg-white text-[16px] border-b hover:bg-gray-50 " >
                  <td className=" px-3 py-4  flex flex-col  text-gray-900 border-r">
                    {i['nombre de producto 1']}
                    <br />
                    Precio unidad: {i.costo} Bs.
                  </td>
                  <td className="px-3 py-4 text-center text-gray-900 border-r">
                    {i.cantidad}
                  </td>
                  <td className="px-3 py-4 text-center text-gray-900">
                    {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined ? cart[i.uuid].cantidad * i.costo : i.costo} Bs.
                  </td>
                </tr>
              })
              : ''}
            {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 ?
              <tr className="bg-white text-[16px] border-b hover:bg-gray-50 " >
                <td className="px-3 py-4 text-gray-900 border-r">
                  TOTAL
                </td>
                <td className="px-3 py-4 text-gray-900 border-r">
                  {cartDB.check ? 'Provincía (+ 351 BS)' : ''}
                </td>
                <td className="px-3 py-4 text-center text-gray-900 border-r">
                  {cartDB.cart !== undefined && cartDB.amount} Bs
                </td>
              </tr>
              : ''}
          </tbody>
        </table>

        <br />
        <br />
        <br />
        {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 && <span className='text-[16px] mt-[30px]'>*En uno momento tus proveedores se comunicaran contigo</span>}

        <div className='flex flex-col h-[130px] justify-between items-center lg:flex-row lg:justify-around lg:gap-[10px] p-5 justify-center'>
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

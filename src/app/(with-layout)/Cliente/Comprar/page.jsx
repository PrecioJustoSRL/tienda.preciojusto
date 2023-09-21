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
import Modal from "@/components/Modal"
import { useMask } from '@react-input/mask';
import { getDayMonthYear } from '@/utils/DateFormat';
const InvoicePDF = dynamic(() => import("@/components/ProformaPDF"), {
  ssr: false,
});

function Comprar({ theme, styled, click, children }) {

  const { user, userDB, cart, productDB, setUserProduct, setUserItem, setUserData, setUserSuccess, success, state, setState, modal, setModal, qrBCP, setQrBCP, paySuccess, setPaySuccess, check, setCheck } = useUser()
  const inputRefWhatsApp = useMask({ mask: '__ ___ ___', replacement: { _: /\d/ } });
  const inputRefWhatsApp2 = useMask({ mask: '__ ___ ___', replacement: { _: /\d/ } });
  const [pay, setPay] = useState(false)

  const router = useRouter()

  function onChangeHandler(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handlerPay(e) {
    e.preventDefault()
    e.stopPropagation()
    if (state['nombre del paciente'] && state['celular del paciente'] && state['celular del paciente'].length === 8 && state['referencia del paciente'].length === 8 && state['referencia del paciente']) {
      if (pay === true) {
        setModal('SuccessFull')
        const val = calculator()
        val >= 0 && requestQR()
      } else {
        setPay(true)
      }
    } else {
      setUserSuccess('Complete')
    }
  }

  function handlerCheck(data) {
    setCheck(data)
    setState({ ...state, check: data })
  }

  function calculator() {
    const val = Object.values(cart).reduce((acc, i, index) => {
      const sum = i['costo'] * i['cantidad']
      return sum + acc
    }, 0)
    return val
  }
  console.log(window.location.href.includes('https'))

  const requestQR = async () => {
    const amount = calculator()
    try {
      console.log('her')
      console.log(amount)
      //**********************BCP*************************
      const res = await fetch(window.location.href.includes('https') ? 'https://tienda.preciojusto.pro/api' : 'http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({ amount: amount + (check ? 350 : 0) }),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      })
      const data = await res.json()
      setQrBCP(data.data)
      // setQrBCP(data.data.qrImage)

      const write = {
        idBCP: data.data.id,
        expiration: data.data.expirationDate,
        amount: amount + (check ? 350 : 0),
        message: 'Inconcluso',
        qrBase64: data.data
      }
      const arr = Object.values(cart).map((i) => {
        const data = { ...i }
        delete data['created_at']
        delete data['id']
        // writeUserData('Pedido', { ...data, envio: check, ...state, estado: 'nuevo', cliente: user.uuid, ...write }, null, null, null, null, null, null)
        return data
      })
      await writeUserData('Pedido', { fecha: getDayMonthYear(), distribuidor: arr[0].distribuidor, empresa: arr[0].empresa, whatsapp: arr[0].whatsapp, compra: arr, envio: check, ...state, estado: 'Pendiente', cliente: user.uuid, correo: user.correo, ...write }, null, null, null, null, null, null)

      router.replace(`/Cliente/Comprar/Qr?idBCP=${data.data.id}`)

      // const interval = setTimeout(() => { verify() }, 10000)
    } catch (err) {
      console.log(err)
    }
  }

  function closeModal() {
    setModal('')
    setQrBCP(undefined)
  }


  window.onbeforeunload = function () {
    return "¿Desea recargar la página web?";
  };

  async function verify() {
    const res = await readUserData('Pedido', qrBCP.id, null, 'idBCP')
    res[0].message === 'Correcto' && router.push('/Cliente/Comprar/Detalle')
  }


  useEffect(() => {
    paySuccess !== null && paySuccess !== undefined && router.push('/Cliente/Comprar/Detalle')
  }, [paySuccess]);

  console.log(userDB)
  return (<div className='w-full min-h-screen relative px-5 pb-[50px] bg-gray-100' onClick={() => setPay(false)}>
    <InvoicePDF />

    {pay && <Modal
      funcion={handlerPay}
      successText={user.rol == 'Clinica' && userDB && userDB[0].access == 'Solicitadora' ? 'Confirmar Solicitud' : 'Confirmar compra'}
      cancelText="Revisar" 
      primary="bg-amber-400 hover:bg-amber-400  text-black font-bold">
      Revisar una vez mas mis productos
    </Modal>}

    {success == 'Complete' && <Msg>Complete el formulario</Msg>}
    <form >
      <Title>DATOS DEL PACIENTE</Title>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label htmlFor="">Nombre del paciente</Label>
          <Input type="text" name="nombre del paciente" onChange={onChangeHandler} require />
        </div>
        <div>
          <Label htmlFor="">Celular del paciente</Label>
          <Input type="text" name="celular del paciente" onChange={onChangeHandler} reference={inputRefWhatsApp2} category='phone' require />

          {/* <Input type="text" name="celular del paciente" onChange={onChangeHandler} reference={inputRefWhatsApp} require/> */}
        </div>
        <div>
          <Label htmlFor="">Numero de celular de referencia</Label>
          <Input type="text" name="referencia del paciente" onChange={onChangeHandler} reference={inputRefWhatsApp} category='phone'  require />

          {/* <Input type="number" name="referencia del paciente" reference={inputRefWhatsApp} onChange={onChangeHandler} require /> */}
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="">Referencia de lugar</Label>
            <div className="flex items-center" onClick={() => handlerCheck(false)}>
              <div className="flex  mt-[2px] h-5 mr-5">
                <input id="remember" type="radio" value="" checked={check == false ? true : false} onClick={() => handlerCheck(false)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="remember" className="ml-2 text-[14px] " onClick={() => handlerCheck(false)}>Para la ciudad</label>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center" onClick={() => handlerCheck(true)}>
              <div className="flex  mt-[2px] h-5 mr-5">
                <input id="remember1" type="radio" value="" checked={check == true ? true : false} onClick={() => handlerCheck(true)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="remember1" className="ml-2 text-[14px] " onClick={() => handlerCheck(true)} >Para provincia (+350bs)</label>
            </div>
          </div>
        </div>

      </div>
      {user.rol == 'Clinica' && userDB && userDB[0].access == 'Solicitadora'
        ? Object.values(cart).length > 0 && <div className="fixed w-screen px-5 lg:px-0  left-0 bottom-[70px] lg:w-[250px] lg:bottom-auto lg:top-[75px] lg:left-auto lg:right-5 z-50">
          <Button theme="SuccessBuy" styled={pay ? 'bg-amber-400' : ''} click={handlerPay}> {pay ? 'Confirmar Solicitud' : 'Solicitar'}</Button>
        </div>
        : Object.values(cart).length > 0 && <div className="fixed w-screen px-5 lg:px-0 left-0  bottom-[70px] lg:w-[250px] lg:bottom-auto lg:top-[75px] lg:left-auto lg:right-5 z-50">
          <Button theme="SuccessBuy" styled={pay ? 'bg-amber-400' : ''} click={handlerPay}> {pay ? 'Confirmar Compra' : 'Pagar por QR'}</Button>
        </div>
      }
    </form>


    <div className='relative border-t-4 border-t-gray-400 bg-white overflow-x-auto items-center justify-between w-full max-w-screen bg-transparent md:w-auto lg:max-w-auto transition-all	z-0' >
      <h3 className='text-center  border-[1px] border-gray-200  bg-gray-100 text-[16px] px-5 py-2  font-bold' >MIS COMPRAS</h3>

      <table className="w-full shadow-2xl lg:min-w-[800px] border-[1px] border-gray-200 lg:w-full lg:min-w-auto text-[12px] text-left text-gray-500">

        {Object.values(cart).length > 0 && <thead className="w-full text-[16px] text-gray-900 uppercase border-b bg-gray-100">
          <tr>
            <th scope="col-3" className="px-2 py-3 font-bold border-r">
              Producto
            </th>
            <th scope="col" className="px-0 py-3  w-[100px] text-center font-bold border-r">
              Cantidad
            </th>
            <th scope="col" className="px-2 py-3 w-[100px] text-center font-bold">
              Costo total
            </th>
          </tr>
        </thead>}

        {Object.values(cart).length > 0 ? Object.values(cart).map((i, index) => <MiniCard i={i} />) : <span className='block text-[16px] text-center'>No tienes productos <br /> selecciona alguno <br /> </span>}

        {Object.values(cart).length > 0 && <tbody>
          <tr className="bg-white text-[12px] border-b">
            <td className="px-2 py-4 text-[16px] text-gray-900 border-r">
              TOTAL:
            </td>
            <td className="px-2 py-4 text-[16px] text-gray-900 border-r">{check && '+350 Bs *Para provincia'}</td>
            <td className="px-2 py-4 text-[16px] text-gray-900 text-center">
              {Object.values(cart).reduce((acc, i, index) => {
                const sum = i['costo'] * i['cantidad']
                return sum + acc
              }, 0) + (check ? 350 : 0)}  Bs.
            </td>
          </tr>
        </tbody>}

      </table>
    </div>
    <br />
    <br />

  </div>)
}

export default WithAuth(Comprar)

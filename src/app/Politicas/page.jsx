'use client'


import Subtitle from '@/components/Subtitle'

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'

import { useMask } from '@react-input/mask';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {

    const { cart, productDB, setUserProduct, setUserCart, setUserItem, item } = useUser()

    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const router = useRouter()

    function HandlerCheckOut() {
        router.push('/Cliente/Comprar')
    }
    function seeMore() {
        router.push('/Producto')
    }
    const addCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: 1 } })
    }
    const addPlussCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad + 1 } })
    }
    const addLessCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        const obj = { ...cart }
        delete obj[i.uuid]
        console.log(obj)

        cart[i.uuid].cantidad - 1 == 0
            ? setUserCart(obj)
            : setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad - 1 } })
    }

    console.log(item)
    return (
        <main className="relative w-full flex items-center  justify-center lg:items-center pt-[20px] pb-[20px] px-5 md:px-[50px] bg-white">

            <div className='shadow-2xl p-5 '>


                <div className='flex justify-center  '>
                    <img src="/logo.png" className='w-auto  max-h-[200px]' alt="" />
                </div>
                <br />
                <div className=' p-5 lg:bg-white  '>
                    <Subtitle>Política de Servicio de la Aplicación "Precio Justo S.R.L."</Subtitle>
                    {/* <h3 className='text-center'>Política de Servicio de la Aplicación "Precio Justo S.R.L." </h3> */}
                    <p >
                        Las siguientes políticas de servicio tienen carácter de contrato entre ambas partes según legislación boliviana vigente.  <br /><br />
                        Este contrato de promoción de productos se establece entre el usuario "Distribuidora" que constituye una empresa en conformidad con las leyes de Bolivia (en adelante, la "Empresa") y, la Sub Distribuidora Precio Justo S.R.L., con domicilio en la calle: Lemoine N° 161 en adelante denominado, el "Promotor". Ambas partes acuerdan lo siguiente: <br /><br />
                        PRIMERA. Objeto del contrato: La Empresa designa al Promotor como su promotor exclusivo para los productos implantes en Osteosíntesis a traves de medios digitales. El Promotor se compromete a promover y comercializar el producto de la Empresa de manera diligente y profesional durante la vigencia de este Contrato. <br /><br />
                        SEGUNDA. Duración del contrato: Este Contrato entrará en vigor desde el momento en que la Empresa empiece a utilizar por primera vez la aplicación móvil y continuará vigente mientras la Distribuidora la utilice activamente. El Contrato se rescindirá automáticamente cuando la Empresa deje de usar la aplicación móvil o la desinstale. <br /><br />
                        TERCERA. Obligaciones del Promotor: <br /><br />
                        a) Promoción del producto: El Promotor se compromete a promover activamente el producto de la Empresa a través de actividades de marketing y publicidad mediante la plataforma, con las herramientas que este considere adecuado y cualquier otro medio que el Promotor considere necesario para promover eficazmente el producto. <br /><br />
                        b) Desembolso.- El Promotor a través de la sección que corresponda remitirá a la Empresa la transferencia del monto de dinero del producto que es seleccionado por el usuario para su adquisición, en el plazo máximo de 30 días. <br /><br />
                        CUARTA. Obligaciones de la Empresa: <br /><br />
                        a) Información del producto : Proporcionar la Información sobre los implantes de osteosíntesis de manera precisa, detalla y actual al Promotor. necesarios para llevar a cabo sus actividades de promoción. <br /><br />
                        b) Devoluciones y reembolsos: La Empresa asume en su totalidad la devolución y reembolso correspondiente de sus productos que fueron adquiridos por los usuarios, equivalentes al 95% del total de la compra. <br /><br />
                        QUINTO. Compensación: En consideración a los servicios prestados por el Promotor, la Empresa acuerda pagar al Promotor una comisión del 5% del coste del producto, sobre las ventas realizadas como resultado directo de las actividades de promoción del Promotor. <br /><br />
                        SEXTA. Confidencialidad: Durante y después de la vigencia de este Contrato, la Empresa se compromete a mantener en estricta confidencialidad toda la información y datos comerciales confidenciales de la plataforma de promoción a los que tenga acceso durante la ejecución de sus funciones. <br /><br />
                        SEPTIMA. Rescisión: El Contrato podrá rescindirse en cualquier momento de forma automática y sin necesidad de notificación por escrito cuando la Empresa deje de utilizar la aplicación móvil o la desinstale. No obstante, cualquier derecho u obligación que surja durante la vigencia de este Contrato seguirá siendo válido y exigible después de su terminación. <br /><br />
                        OCTAVA. Ley aplicable y jurisdicción: Este Contrato se regirá e interpretará de acuerdo con las leyes Bolivianas. Cualquier disputa que surja de este Contrato estará sujeta a los tribunales competentes de la jurisdicción correspondiente.. <br /><br />
                        NOVENA. Aceptación. Al utilizar nuestra aplicación móvil, la Empresa está aceptando los términos y condiciones expuestos en este Contrato. Ambas partes acuerdan los términos y condiciones establecidos anteriormente al utilizar esta aplicación móvil. <br /><br />
                        Por favor, tenga en cuenta que al utilizar nuestra aplicación, usted está aceptando los términos y condiciones expuestos en esta política de servicio como la Empresa
                    </p>
                    <br />
                    {/* <Subtitle>Politicas de Privacidad de Datos</Subtitle> */}
                </div>


            </div>
        </main>
    )
}
export default Home



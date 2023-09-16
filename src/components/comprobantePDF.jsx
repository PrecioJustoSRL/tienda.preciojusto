'use client'

import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from '../components/Button'
import { useRouter } from 'next/navigation';
import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL } from "next/dist/shared/lib/constants.js";


Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '1cm',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
    },
    image: {
        boxSizing: 'border-box',
        position: 'relative',
        objectFit: 'cover'
    },

})

const PDFView = ({ dbUrl, style }) => {
    const router = useRouter()

    const [dataUrl, setDataUrl] = useState('');

    const { userDB, user, state, cartDB } = useUser()
    const [isCliente, setisCliente] = useState(false);

    function download(url) {

        const isWebview = () => {

            if (typeof window === undefined) { return false };

            let navigator = window.navigator;

            const standalone = navigator.standalone;
            const userAgent = navigator.userAgent.toLowerCase();
            const safari = /safari/.test(userAgent);
            const ios = /iphone|ipod|ipad/.test(userAgent);
            return ios ? !standalone && !safari : userAgent.includes('wv');
        }
        if (isWebview()) {
            router.pathname !== '/DownloaderPDF' && window.open(`https://collage-two.vercel.app/DownloaderPDF?dataUrl=${dataUrl}&uid=${user.uid}`, '_system')
        } else {
            console.log('no es una webview')
        }
    }


    useEffect(() => {
        setDataUrl(dbUrl)
        setisCliente(true)
    });

    return (
        <div className="w-full p-5 height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document>
                    <Page size='A4' style={styles.body} >
                        <View>
                            <Text style={{ fontSize: '12px' }}>En precio justo nos sentimos orgullosos de poder proveerle productos al mejor precio y de calidad. {user.nombre}</Text>
                        </View>

                        <View style={{ width: '100%', }}>
                            <Text style={{ fontSize: '14px', textAlign: 'center', paddingTop: '20px', }}>COMPROBANTE DE PAGO</Text>
                            <Text style={{ fontSize: '12px', textAlign: 'center', paddingTop: '5px', }}>{cartDB.idBCP}</Text>
                        </View>

                        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', paddingTop: '50px' }}>
                            <View style={{ width: '50%', height: '200px', }}>
                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
                                    <Text style={{ fontSize: '12px', alignText: 'center' }}>DATOS DE CLIENTE</Text>
                                    <View style={{ paddingTop: '12px' }}>
                                        <Text style={{ fontSize: '12px' }}>Nombre del paciente: {cartDB['nombre del paciente']}</Text>
                                    </View>
                                    <View style={{ paddingTop: '12px' }}>
                                        <Text style={{ fontSize: '12px' }}>Número de celular: {cartDB['celular del paciente']}</Text>
                                    </View>
                                    <View style={{ paddingTop: '12px' }}>
                                        <Text style={{ fontSize: '12px' }}>Numero de celular Referencia: {cartDB['referencia del paciente']}</Text>
                                    </View>
                                    <View style={{ paddingTop: '12px' }}>
                                        <Text style={{ fontSize: '12px' }}>Solicitado para: {cartDB.check ? 'Provincía' : 'Ciudad'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '50%' , height: '200px', }}>
                                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
                                    <Image src="/logo-circle.png" style={{ height: '130px', width: '130px'}}></Image>
                                    <Text style={{ fontSize: '16px', paddingTop: '16px' }}>PRECIO JUSTO</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={{ fontSize: '12px', alignText: 'center', paddingTop: '25px' }}>PRODUCTOS ADQUIRIDOS</Text>

                        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', paddingTop: '20px' }}>
                            <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px', color: 'white', fontWeight: 'bold', backgroundColor: '#2A52BE' }}>
                                Producto
                            </Text>
                            <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px', color: 'white', fontWeight: 'bold', backgroundColor: '#2A52BE' }}>
                                Cantidad
                            </Text>
                            <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px', color: 'white', fontWeight: 'bold', backgroundColor: '#2A52BE' }}>
                                Costo total
                            </Text>
                        </View>

                        {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 ? Object.values(cartDB.cart).map((i, index) => {
                            return <View style={{ display: 'flex', width: '100%', flexDirection: 'row', }}>

                                <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px' }}>
                                    {i['nombre de producto 1']}
                                    {/* {i.costo} Bs. */}
                                </Text>
                                <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px' }}>
                                    {cartDB.cart && cartDB.cart[i.uuid] && cartDB.cart[i.uuid].cantidad !== undefined && cartDB.cart[i.uuid].cantidad !== 0 && cartDB.cart[i.uuid].cantidad}
                                </Text>
                                <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px' }}>
                                    {cartDB.cart && cartDB.cart[i.uuid] && cartDB.cart[i.uuid].cantidad !== undefined ? cartDB.cart[i.uuid].cantidad * i.costo : i.costo} Bs.
                                </Text>
                            </View>
                        }) : ''}
                        {cartDB.cart !== undefined && Object.values(cartDB.cart).length > 0 ? <View style={{ display: 'flex', width: '100%', flexDirection: 'row', }}>

                            <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px', fontWeight: 'bold', backgroundColor: 'yellow' }}>
                                TOTAL
                            </Text>
                            <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px', fontWeight: 'bold', backgroundColor: 'yellow' }}>
                                {state.check && '+350 Bs *Para provincia'}
                            </Text>
                            <Text style={{ width: '100%', fontSize: '12px', border: '1px solid black', padding: '5px 2px', fontWeight: 'bold', backgroundColor: 'yellow' }}>
                                {cartDB.amount}  Bs.
                            </Text>
                        </View>
                            : ''}


                        <View style={{ width: '100%', paddingTop: '25px' }}>
                            <Text style={{ fontSize: '12px' }}>

                                El médico especialista que le está atendiendo cuenta con la idoneidad necesaria para emitir esta receta de implantes de osteosíntesis.
                                Precio justo recomienda seguir siempre el criterio de su médico tratante, puesto su experiencia es invaluable.
                                Precio Justo. La mejor calidad al menor precio.

                            </Text>
                        </View>
                    </Page>
                </Document>
            }
                fileName='Proforma'>

                {({ blob, url, loading, error }) =>
                    <div className='fixed top-0 right-[15px] w-[300px] py-4 z-[50] '>
                        <Button theme='PrimaryPrint'>Imprimir Comprobante de Pago</Button>
                    </div>}
            </PDFDownloadLink>}
        </div>
    )
}

export default PDFView
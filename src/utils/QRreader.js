// import { PNG } from 'pngjs/browser';

// import jsQR from "jsqr";
// // var qr = new QrcodeDecoder();
//  function QRreaderUtils(e, setFilterQR, setFilter, readUserData, setRecetaDBP) {

//     const dataUri = 'data:image/png;base64,ABCDEFYOURIMAGEHEREABCDEF';
//     const png = PNG.sync.read(Buffer.from(dataUri.slice('data:image/png;base64,'.length), 'base64'));
//     const code = jsQR(Uint8ClampedArray.from(png.data), png.width, png.height);


// console.log(code)

// }





import qrcodeParser from "qrcode-parser";

async function QRreaderUtils(e, setFilterQR, setFilter, readUserData, setRecetaDBP) {
    console.log(e.target.files[0])
    try {
        const res = await qrcodeParser(e.target.files[0])
        setFilterQR(res);
        console.log(res)
        const data = await readUserData('Receta', res, setRecetaDBP, 'qr')
    } catch (err) {
        console.log(err)
    }

}

export { QRreaderUtils }
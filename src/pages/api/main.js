const { BCPServices } = require('../BCPService.js');
const fs = require('fs');

const collector = [
    {
        "Name": "Id",
        "Paremeter": "int",
        "Value": 123
    },
    {
        "Name": "Nombre",
        "Paremeter": "string",
        "Value": "Prueba"
    },
    {
        "Name": "Prueba",
        "Paremeter": "ClasePrueba",
        "Value": {
            "Key": "Value"
        }
    }
]

const bcp = new BCPServices();
bcp.generatedQr(1, "BOB", "GLOSA", collector, "1/00:00", "123")
.then(response => {
    console.log(response);
    const myContent = `
        <br/>
        <img src="data:image/png;base64,${response.data.data.qrImage}">
        <br/>
    `;
    fs.writeFileSync('./index.html', myContent);
})
.catch(error => {
    console.error(error);
})



















// const bcp = new BCPServices();
// bcp.generatedQr(1, "BOB", "GLOSA", collector, "1/00:00", "123")
// .then(response => {
//     console.log(response);
//     const myContent = `
//         <br/>
//         <img src="data:image/png;base64,${response.data.data.qrImage}">
//         <br/>
//     `;
//     fs.writeFileSync('./index.html', myContent);
// })
// .catch(error => {
//     console.error(error);
// })
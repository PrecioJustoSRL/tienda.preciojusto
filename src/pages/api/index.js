const { BCPServices } = require('./BCPService.js');



export default function handler(req, res) {




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

    console.log('here')

    if (req.method === 'POST') {
    console.log(req.body.amount)

    const bcp = new BCPServices();
    bcp.generatedQr(req.body.amount, "BOB", "GLOSA", collector, "1/00:00", "123")
        .then(response => {
            console.log(response.data)
            return res.json(response.data)
        })
        .catch(error => {
            console.error(error);
        })
    }
}







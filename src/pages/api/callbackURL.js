const { BCPServices } = require('./BCPService.js');

const { writeUserData, updateUserData } = require('./supabase.js');


const axios = require('axios');


export default async function handler(req, res) {

    if (req.method === 'POST') {

        if (req.headers.authorization === 'Basic ' + Buffer.from('PRECJUSTO_USER' + ':' + 'ujpw4CmvFo(c.D19').toString('base64') ) {

            if (req.body && req.body.Description === 'PROCESADO') {
                const resData = {
                    State: "000",
                    Message: "Correcto",
                    data: {
                        id: req.body.Id
                    }
                }
                const object = {
                    state: "000",
                    message: "Correcto",
                    uuid: req.body.Id,
                    amount: req.body.Amount
                }
                // writeUserData('Transacciones', object)
                const data = await updateUserData('Pedido', object, req.body.Id, 'idBCP')


                res.setHeader('Content-Type', 'application/json')
                return res.json(resData)

            } else {
                const resData = {
                    State: "017",
                    Message: "incorrecto",
                    data: {
                        id: req.body.Id
                    }
                }
                const object = {
                    state: "017",
                    message: "incorrecto",
                    uuid: req.body.Id,

                }
                updateUserData('Pedido', object, req.body.Id, 'idBCP')

                res.setHeader('Content-Type', 'application/json')
                return res.json(resData)

            }

        } else {
            const resData = {
                State: "017",
                Message: "Error de Autorizacion",
                data: {
                    id: req.body.Id
                }
            }
            res.setHeader('Content-Type', 'application/json')
            return res.json(resData)
        }
    } else {
        const resData = {
            Message: "Error: Method ",
         
        }
        res.setHeader('Content-Type', 'application/json')
        return res.json(resData)
    }

}





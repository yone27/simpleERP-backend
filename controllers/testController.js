const axios = require('axios');

exports.test = async(req, res) => {
    try {
        const q = await axios('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?&limit=5&convert=USD', {
            headers: {
                'X-CMC_PRO_API_KEY': 'cae0286f-b142-4831-b058-2ddbe85fd036'
            }
        })
        res.send(q.data)
    } catch (error) {
        console.log(error);
    }
}

exports.test2 = async(req, res) => {
    const q = await axios(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?&limit=5&convert=${req.params.moneda}`, {
        headers: {
            'X-CMC_PRO_API_KEY': 'cae0286f-b142-4831-b058-2ddbe85fd036'
        }
    })
    
    const result = q.data.data.find(cripto => cripto.id === Number(req.params.criptomoneda))
    
    res.send(result)    
}
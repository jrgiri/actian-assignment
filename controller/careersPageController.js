const axios = require('axios');
let careersPage = async (req, res) => {
    try {
        let response = await getData();
        console.log(JSON.stringify(response.data))
        res.status(200).send(response.data)
    } catch (error) {
        res.status(400).send(error)
    }
    
}

let getData = async () => {
    try {
        const response = await axios.get('https://jobs.lever.co/actian/');
        return response;
        //console.log(response);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {careersPage}
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let careersPage = async (req, res) => {
    try {
        let response = await getData();
        const dom = new JSDOM(response.data);
        //console.log(dom.window.document.querySelectorAll(".department").textContent);
        var els = dom.window.document.querySelectorAll('.department,.number-of-positions,.job-name');
        els.forEach((el) => {
            console.log(el.textContent,el.parentElement.textContent,el.childNodes.textContent);
        });
        //console.log(await response.data);
        //const root = parse(response.data);
        //console.log(root, response.data);
        //const department = root.querySelector("div");
        res.status(200).send(response.data)
    } catch (error) {
        res.status(400).send(error)
    }

}

let getData = async () => {
    try {
        const response = await axios.get('https://www.actian.com/company/careers/');
        return response;
        //console.log(response);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {careersPage}
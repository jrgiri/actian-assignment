const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let careersPage = async (req, res) => {
    try {
        let arr = [];
        let response = await getData();
        const dom = new JSDOM(response.data).window.document;
        let department = req.query.department ? req.query.department : undefined;
        if(department) {
            let jobs = dom.querySelectorAll('.job-posting');
            let final = {};
            var matched = false;
            for(let i=0; i<jobs.length; i++) {
                console.log(jobs[i].textContent);
                let str = 'Openings';       
                let trim = jobs[i].textContent.indexOf('Openings')+str.length;
                if ((jobs[i].textContent.slice(0, department.length)).toLowerCase() === department.toLowerCase()){
                    matched = true;
                    let openings = jobs[i].textContent.slice(trim);
                    final.department = department;
                    final.openings = openings;
                    arr.push(final)
                }                
            };
            if(matched === false) arr.push('No department found!');
        } else arr.push('Department is required!');
        res.status(200).send(arr)
    } catch (error) {
        res.status(400).send(error)
    }

}

let getData = async () => {
    try {
        const response = await axios.get('https://www.actian.com/company/careers/');
        return response;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {careersPage}
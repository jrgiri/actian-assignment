const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let careersPage = async (req, res) => {
    try {
        let response = await getData();
        const dom = new JSDOM(response.data).window.document;
        let department = req.params.department;
        var arr = [];
        //console.log(dom.window.document.querySelectorAll(".department").textContent);
        //let parent = dom.querySelector('.job-posting')
        let jobs = dom.querySelectorAll('.job-posting')
        for(let i=0; i<jobs.length; i++) {
            //console.log(jobs[i].textContent);
            //let department = dom.querySelectorAll('.department')
            //for (let j=0; j<department.length; j++) {
                //console.log(department[j].textContent);
                //console.log(department.length);
                console.log(jobs[i].textContent);
                let str = 'Openings';       
                let trim = jobs[i].textContent.indexOf('Openings')+str.length;
                if (jobs[i].textContent.slice(0, department.length) === department){
                    let final = {};
                    let openings = jobs[i].textContent.slice(trim);
                    final.department = department;
                    final.openings = openings;
                    arr.push(final)
                    //console.log(openings);
                }
                //final.department = department[j].textContent.length
                
            //}
            
        };
        //console.log(await response.data);
        //const root = parse(response.data);
        //console.log(root, response.data);
        //const department = root.querySelector("div");
        res.status(200).send(arr)
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
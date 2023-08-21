require(`${process.cwd()}/tests_explorer/base`)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`)
  , api_general = new apis.apigeneral

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
  
chai.use(chaiHttp)

describe("Test Suite Login Pos Configator", function () {
 
    
    it.only("Login Pos Configator with Valid Variable Should be Success #20230806125100", async function () {
        const dataLogin = {
            username: process.env.nama,
            password: process.env.password
        };

        let response = await api_general.Login_Yoshinoya(dataLogin);
        console.log(dataLogin)
        console.log(response)
        response.should.have.status(200);
        global.bearerToken = response.body.access_token
    });

    it("Login Pos Configator with Invalid Variable Should be Failure #20230806125100", async function () {
        const dataLogin = {
            email: process.env.email,
            password: process.env.password
        };

        let response = await api_general.Login_Yoshinoya(dataLogin);
        response.should.have.status(422);
    }); 
})
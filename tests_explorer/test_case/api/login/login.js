require(`${process.cwd()}/tests_explorer/base`)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`)
  , api_general = new apis.apigeneral

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
  
chai.use(chaiHttp)

describe("Test Suite Login Pos Configator", function () {
   
    it("Login Pos Configator #20230806125100", async function () {
        const dataLogin = {
            email: process.env.email,
            password: process.env.password
        };

        let response = await api_general.Login_Yoshinoya(dataLogin);
        response.should.have.status(200);
        response.body.user.should.have.property('id');
        response.body.user.should.have.property('user_id');
        response.body.user.should.have.property('username');
    }); 
})
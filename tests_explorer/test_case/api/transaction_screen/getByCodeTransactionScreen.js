require(`${process.cwd()}/tests_explorer/base`)

const baseurl = "https://yoshinoya-api.akasia.id"; 

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const should = chai.should();
  
chai.use(chaiHttp)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);
const { generateCityAndCode, generateRandomLocation, generateRandomCountryCode, phoneNumber08 } = require(process.cwd() + '/tests_explorer/utils/generate_data');
const generatedData = generateCityAndCode();
const generatedData2 = generateRandomLocation();
const generatedData3 = generateRandomCountryCode();
const phone = phoneNumber08();



describe("Test Suite Get By Code Transaction Screen", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it.only("Get By Code Transaction Screen with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetTransactionScreen();
    const Transaction = responseCode.body[0].code; 

    const response = await chai
            .request(baseurl)
            .get('/api/transaction-screen/' + Transaction)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.bearerToken)

    console.log(response.body);
    response.should.have.status(200);
    response.body.should.have.property('code');
    response.body.code.should.have.equal(Transaction);
    response.body.should.have.property('name');
    response.body.should.have.property('parents');
   });

   it("Get By Code Transaction Screen with inValid Code and Fill all Information should be Failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .get('/api/transaction-screen/' + process.env.InvalidCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.bearerToken)

    console.log(response.body);
    response.should.have.status(404);
   });
});
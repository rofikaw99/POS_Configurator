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



describe("Test Suite Get By Code Trans Type", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get By Code Trans Type with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetTransType();
    const transTypeCode = responseCode.body[0].code; 

    const response = await chai
            .request(baseurl)
            .get('/api/trans-type/' + transTypeCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(200);
    response.body.should.have.property('code');
    response.body.code.should.have.equal(transTypeCode);
    response.body.should.have.property('name');
   });

   it("Get By Code Trans Type with inValid Code and Fill all Information should be Failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .get('/api/trans-type/' + process.env.InvalidCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(404);
   });

});

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



describe("Test Suite Get By Code Payment Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get By Code Payment Group with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetPaymentGroup();
    const PaymentGroup = responseCode.body[0].code; 

    const response = await chai
            .request(baseurl)
            .get('/api/payment-group/' + PaymentGroup)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.bearerToken)

    console.log(response.body);
    response.should.have.status(200);
    response.body.should.have.property('id');
    response.body.should.have.property('code');
    response.body.code.should.have.equal(PaymentGroup);
    response.body.should.have.property('name');
   });

   it("Get By Code Payment Group with inValid Code and Fill all Information should be Failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .get('/api/payment-group/' + process.env.InvalidCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.bearerToken)

    console.log(response.body);
    response.should.have.status(404);
   });
});
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



describe("Test Suite Get By Code Item Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get By Code Item Group with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetItemGroup();
    const oldCode = responseCode.body[0].code;
    console.log(oldCode) 

    const response = await chai
            .request(baseurl)
            .get('/api/item-group/' + oldCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(200);
    response.body.should.have.property('id');
    response.body.should.have.property('code');
    response.body.code.should.have.equal(oldCode);
    response.body.should.have.property('name');
    response.body.should.have.property('name');
    if (response && response.body && response.body.general_products && response.body.general_products.length > 0) {
        expect(response.body.general_products[0]).to.have.property('name');
    } else {
        // Handle the case where the assertion cannot be executed due to missing data
        console.error("Assertion cannot be executed due to missing data.");
    }
   });

   it("Get By Code Item Group with inValid Code and Fill all Information should be Failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .get('/api/item-group/' + process.env.InvalidCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(404);
   });

});

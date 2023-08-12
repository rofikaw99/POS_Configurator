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



describe("Test Suite Update Trans Type", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Update TransType with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetTransType();
    const transTypeCode = responseCode.body[0].code; 
    let responseCode1 = await api_general.GetScreen();
    const screenID = responseCode1.body[0].id; 
    let responseCode2 = await api_general.SearchStore();
    const i = responseCode2.body.recordsFiltered - 1;
    const j = responseCode2.body.recordsFiltered - 2;
    const oldCodei = responseCode2.body.data[i].code;
    const oldCodej = responseCode2.body.data[j].code;

    const response = await chai
            .request(baseurl)
            .put('/api/trans-type/' + transTypeCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)
            .send({
                    "name": "Dine In "+transTypeCode,
                    "screen_id": screenID,
                    "is_active": true,
                    "store_ids": [oldCodei, oldCodei, oldCodej]
                });
    console.log(response.body);
    response.body.should.have.property('code');
    response.body.should.have.property('name');
    response.body.should.have.property('stores');
 });

   it("Update Trans Type with Invalid Code and fill all information should be failure #20230807092500", async function () {
        let responseCode = await api_general.GetTransType();
        const transTypeCode = responseCode.body[0].code; 
        let responseCode1 = await api_general.GetScreen();
        const screenID = responseCode1.body[0].id; 
        let responseCode2 = await api_general.SearchStore();
        const i = responseCode2.body.recordsFiltered - 1;
        const j = responseCode2.body.recordsFiltered - 2;
        const oldCodei = responseCode2.body.data[i].code;
        const oldCodej = responseCode2.body.data[i].code;
      console.log(generatedData.code)
      console.log(generatedData.city)

      const response = await chai
            .request(baseurl)
            .put('/api/trans-type/' + process.env.InvalidCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token) // No semicolon here
            .send({
                "name": "Dine In "+transTypeCode,
                "screen_id": screenID,
                "is_active": true,
                "store_ids": [oldCodei, oldCodei, oldCodej]
            });
      console.log(response.body);
      response.should.have.status(404);
   });
});
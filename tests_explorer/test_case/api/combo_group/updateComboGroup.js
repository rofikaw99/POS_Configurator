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



describe("Test Suite Update Combo Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Update Combo Group with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetComboGroup();
    const comboGroupCode = responseCode.body[0].code; 

    const response = await chai
            .request(baseurl)
            .put('/api/combo-group/' + comboGroupCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.bearerToken)
            .send({
                    "name": "Regular Ori Yaki Beef Update",
                    "is_active": true,
                    "details": [
                        {
                            "general_product_id": 2,
                            "quantity": 3
                        }
                    ]
                });
    console.log(response.body);
    response.body.code.should.have.equal(comboGroupCode);
    response.body.name.should.have.equal('Regular Ori Yaki Beef Update');
    response.body.should.have.property('details');
    response.body.updated_by.should.have.equal('icadoke');
   });

   it("Update Combo Group with Invalid Code and fill all information should be failure #20230807092500", async function () {
    let responseCode = await api_general.GetComboGroup();
    const comboGroupCode = responseCode.body[0].code; 

    const response = await chai
            .request(baseurl)
            .put('/api/combo-group/' + comboGroupCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.bearerToken)
            .send({
                    "name": "Regular Ori Yaki Beef Update",
                    "is_active": true,
                    "details": [
                        {
                            "general_product_id": 1,
                            "quantity": 3
                        }
                    ]
                });
      console.log(response.body);
      response.should.have.status(422);
   });

   it("Update Combo Group with Invalid General Product ID should be failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .put('/api/combo-group/' + process.env.name)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.bearerToken)
            .send({
                    "name": "Regular Ori Yaki Beef Update",
                    "is_active": true,
                    "details": [
                        {
                            "general_product_id": 2,
                            "quantity": 3
                        }
                    ]
                });
      console.log(response.body);
      response.should.have.status(404);
   });
});
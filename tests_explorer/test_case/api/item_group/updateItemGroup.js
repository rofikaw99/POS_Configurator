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



describe("Test Suite Update Item Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Update Item Group with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetItemGroup();
    const oldCode = responseCode.body[0].code; 

    const dataStore = {
        name:"EDC "+generatedData2.code,
        note: "",
        general_products_ids:[],
        is_active: true
    };

    
    const response = await chai
            .request(baseurl)
            .put('/api/item-group/' + oldCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)
            .send({
                    "name": "EDC BCA",
                    "is_active": true
                });
    console.log(response.body);
    response.body.should.have.property('id');
    response.body.should.have.property('code');
    response.body.should.have.property('name');
 });

   it("Update Item Group with Invalid Code and fill all information should be failure #20230807092500", async function () {
      console.log(generatedData.code)
      console.log(generatedData.city)

      const dataStore = {
        name:"EDC "+generatedData2.code,
        note: "",
        general_products_ids:[],
        is_active: true
      };

      const response = await chai
            .request(baseurl)
            .put('/api/item-group/' + process.env.InvalidCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token) // No semicolon here
            .send({
                "name": "EDC BCA",
                "is_active": true
            });
      console.log(response.body);
      response.should.have.status(404);
   });

});

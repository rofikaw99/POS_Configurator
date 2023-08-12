require(`${process.cwd()}/tests_explorer/base`)

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



describe("Test Suite Update Store", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Update Store with Valid Code and fill all information should be success #20230807092500", async function () {
      let responseCode = await api_general.SearchStore();
      const i = responseCode.body.recordsFiltered - 1;
      const oldCode = responseCode.body.data[i].code; 
      console.log(generatedData.code)
      console.log(generatedData.city)

      const dataStore = {
        code:oldCode,
        full_code:generatedData.code,
        name:generatedData2.street,
        street:generatedData2.street,
        city: generatedData2.city,
        zip:generatedData2.zip,
        country:generatedData3,
        phone:phone,
        is_active:"1"
      };

      
      let response = await api_general.UpdateStore(dataStore);
      console.log(response.body);
      response.should.have.status(200);
      response.body.success.should.have.equal(true);
      response.body.message.should.have.equal('Berhasil ter-update.');
      expect(response.body.data.code).to.have.equal(oldCode)
   });

   it("Update Store with Valid Code and not fill all information should be success #20230807092500", async function () {
    let responseCode = await api_general.GetEDCSetting();
    const i = responseCode.body.recordsFiltered - 1;
    const oldCode = responseCode.body.data[i].code; 
    
    console.log(generatedData.code)
    console.log(generatedData.city)

    const dataStore = {
      code:oldCode,
    };

    
    let response = await api_general.UpdateStore(dataStore);
    console.log(response.body);
    response.should.have.status(200);
    response.body.success.should.have.equal(true);
    response.body.message.should.have.equal('Berhasil ter-update.');
    expect(response.body.data.code).to.have.equal(oldCode)
   });

   it("Update Store with inValid Code should be Failure #20230807092500", async function () {
    let responseCode = await api_general.SearchStore();
    const i = responseCode.body.recordsFiltered - 1;
    const oldCode = responseCode.body.data[i].code; 
    console.log(generatedData.code)
    console.log(generatedData.city)

    const dataStore = {
      code:process.env.InvalidCode,
      full_code:null,
      name:null,
      street:null,
      city: null,
      zip:null,
      country:null,
      phone:null,
      is_active:null
    };

    
    let response = await api_general.UpdateStore(dataStore);
    console.log(response.body);
    response.should.have.status(422);
    response.body.success.should.have.equal(false);
    response.body.should.have.property('message');
    console.log(response.body.message)
   });
});

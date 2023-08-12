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



describe("Test Suite Add Store", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Add Store with Valid Code #20230807092500", async function () {
      console.log(generatedData.code)
      console.log(generatedData.city)

      const dataStore = {
        code:generatedData.code,
        full_code:generatedData.code,
        name:generatedData2.street,
        street:generatedData2.street,
        city: generatedData2.city,
        zip:generatedData2.zip,
        country:generatedData3,
        phone:phone,
        is_active:"1"
      };

      
      let response = await api_general.AddStore(dataStore);
      console.log(response.body);
      response.should.have.status(200);
      response.body.success.should.have.equal(true);
      response.body.message.should.have.equal('Berhasil Tersimpan');
      response.body.data.should.have.property('code');
      response.body.data.code.should.have.equal(generatedData.code);
   });

   it("Add Store while Code Already Exist #20230807092600", async function () {
    console.log(generatedData.code)
    console.log(generatedData.city)

    const dataStore = {
      code: process.env.storeGroub_Code,
      full_code:generatedData.code,
      name:generatedData2.street,
      street:generatedData2.street,
      city: generatedData2.city,
      zip:generatedData2.zip,
      country:generatedData3,
      phone:phone,
      is_active:"1"
    };

    
    let response = await api_general.AddStore(dataStore);
    console.log(response.body);
    response.should.have.status(422);
    response.body.success.should.have.equal(false);
    response.body.message.should.have.equal('<li>The code has already been taken.</li>');
     });

   it("Add Store with Empty Data #20230806034400", async function () {
    const dataStore = {
        code:global.storeGroupCode2,
        full_code:null,
        name:null,
        street:null,
        city: null,
        zip:null,
        country:null,
        phone:null,
        is_active:null
    };
    
    let response = await api_general.Add_StoreGroup(dataStore);
    console.log(response.body);
    response.should.have.status(422);
    response.body.success.should.have.equal(false);
    response.body.should.have.property('message');
   });
});

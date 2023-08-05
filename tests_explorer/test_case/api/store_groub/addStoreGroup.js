require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const should = chai.should();
  
chai.use(chaiHttp)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);
const { generateCityAndCode, randomString  } = require(process.cwd() + '/tests_explorer/utils/generate_data');
const generatedData = generateCityAndCode();



describe("Test Suite Add Store Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Add Store Group with Valid Code #20230806034400", async function () {
      console.log(generatedData.code)
      console.log(generatedData.city)

      const dataStore = {
        code: generatedData.code,
        name: generatedData.city,
        note: randomString
      };

      
      let response = await api_general.Add_StoreGroup(dataStore);
      console.log(response.body);
      response.should.have.status(200);
      response.body.success.should.have.equal(true);
      response.body.message.should.have.equal('Berhasil Tersimpan');
      response.body.data.should.have.property('id');
      console.log(response.body.data.id);
   });

   it("Add Store Group with Valid Code #20230806034400", async function () {
    const dataStore = {
      code: null,
      name: null,
      note: null
    };
    
    let response = await api_general.Add_StoreGroup(dataStore);
    console.log(response.body);
    response.should.have.status(422);
    response.body.success.should.have.equal(false);
 });
});

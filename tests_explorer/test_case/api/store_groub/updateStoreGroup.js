require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);
const { generateCityAndCode, randomString  } = require(process.cwd() + '/tests_explorer/utils/generate_data');
const generatedData = generateCityAndCode();

describe("Test Suite Update Store Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
      await initial.setupSearchStoreGroupValid();
   });

   it("Update Store Group #20230806052100", async function () {
      const dataStore = {
        code: global.storeGroupCode,
        name: generatedData.city,
        note: randomString,
        is_active: 1
      };

      let response = await api_general.Update_StoreGroup(dataStore);
      console.log(global.storeGroupCode)
      console.log(response.body);
      response.should.have.status(200);
      response.body.success.should.have.equal(true);
      response.body.message.should.have.equal('Berhasil ter-update.')
      response.body.data.should.have.property('id');
      response.body.data.should.have.property('code');
      response.body.data.code.should.have.equal(global.storeGroupCode);
   });
});
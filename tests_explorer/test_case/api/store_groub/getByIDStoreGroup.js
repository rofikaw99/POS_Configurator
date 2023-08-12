require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

describe("Test Suite Store Group Get By ID", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
      await initial.setupSearchStoreGroupValid();
   });

   it("Search Store Group Get By ID with Valid Code #20230806020700", async function () {
      let response = await api_general.StoreGroup_Get_By_ID();
      console.log(global.storeGroupCode)
      console.log(response.body);
      response.should.have.status(200);
      response.body.data.should.have.property('id');
      response.body.data.should.have.property('code');
      response.body.data.code.should.have.equal(global.storeGroupCode);
   });
});

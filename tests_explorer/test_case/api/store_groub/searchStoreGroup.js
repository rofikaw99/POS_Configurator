require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

describe("Test Suite Search Store Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Search Store Group with Valid Code #20230806020700", async function () {
      let response = await api_general.Search_StoreGroup_Valid();
      console.log(response.body);
      response.should.have.status(200);
      const i = response.body.recordsFiltered - 1; 
      console.log(response.body.data[i]);
      expect(response.body.data[i]).to.have.property('id');
      expect(response.body.data[i]).to.have.property('code');
      expect(response.body.data[i]).to.have.property('name');
      
   });

   it("Search Store Group with inValid Code #20230806020701", async function () {
      let response = await api_general.Search_StoreGroup_inValid();
      console.log(response.body);
      response.should.have.status(400);
   });

   it("Search Store Group When Code is NULL #20230806020702", async function () {
      let response = await api_general.Search_StoreGroup_NULL();
      console.log(response.body);
      response.should.have.status(400);
   });
});

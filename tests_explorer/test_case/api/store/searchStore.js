require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

describe("Test Suite Search Store", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Search Store should be success #20230806020700", async function () {
      let response = await api_general.SearchStore();
      console.log(response.body);
      response.should.have.status(200);
      response.body.should.have.property('data');
      response.body.should.have.property('recordsTotal');
      response.body.should.have.property('recordsFiltered');
      
   });
});

require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

describe("Test Suite GET User", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get User should be success #20230806020700", async function () {
      let response = await api_general.GetUser();
      console.log(response.body);
      response.should.have.status(200);
      expect(response.body).to.have.property('data');
      expect(response.body).to.have.property('recordsTotal');
      expect(response.body).to.have.property('recordsFiltered');
   });
});

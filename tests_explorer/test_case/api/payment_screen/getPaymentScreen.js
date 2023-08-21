require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

describe("Test Suite Get Payment Screen", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get Payment Screen should be success #20230806020700", async function () {
      let response = await api_general.GetPaymentScreen();
      console.log(response.body);
      response.should.have.status(200);
      expect(response.body[0]).to.have.property('code');
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0]).to.have.property('is_active');
   });
});
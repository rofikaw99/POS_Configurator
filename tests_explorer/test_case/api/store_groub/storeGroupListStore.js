require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

describe("Test Suite Store Group List Store", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get Store Group List Store with Valid Code #20230806100400", async function () {
      let response = await api_general.ListStore_StoreGroup();
      console.log(response.body);
      response.should.have.status(200);
      response.body.should.have.property('success');
      response.body.success.should.have.equal(true);
      response.body.should.have.property('message');
      response.body.message.should.have.equal('Successfully')
   });

   it("Get Store Group List Store with inValid Code #20230806100400", async function () {
    let response = await api_general.ListStore_StoreGroup2();
    console.log(response.body);
    response.should.have.status(422);
    response.body.success.should.have.equal(false);
    response.body.message.should.have.equal('<li>The selected code is invalid.</li>')
   });

});
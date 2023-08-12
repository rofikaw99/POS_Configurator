require(`${process.cwd()}/tests_explorer/base`)
const baseurl = "https://yoshinoya-api.akasia.id";

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

describe("Test Suite GET List Store Item Store Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get List Store Item Store Group with valid code should be success #20230806020700", async function () {
      let responseCode = await api_general.SearchStoreGroup();
      const i = responseCode.body.recordsFiltered - 1;
      const oldCode = responseCode.body.data[i].code;
      const response = await chai
      .request(baseurl)
      .get('/api/storegroup/list_store_items?code=' + oldCode)
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer ' + global.token)
      response.should.have.status(200);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.have.equal(true);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.have.equal('Successfully');
      expect(response.body).to.have.property('data');
   });

   it("Get List Store Item Store Group with valid code should be success #20230806020700", async function () {
    const response = await chai
    .request(baseurl)
    .get('/api/storegroup/list_store_items?code=' + process.env.InvalidCode)
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + global.token)
    console.log(response.body);
    response.should.have.status(422);
    expect(response.body.success).to.have.equal(false);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.have.equal('<li>The selected code is invalid.</li>');
 });
});

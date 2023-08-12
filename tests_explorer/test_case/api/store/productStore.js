require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const baseurl = "https://yoshinoya-api.akasia.id"; 

describe("Product Store API Test", function () {
  before(async function () {
        await initial.Login_Yoshinoya();
     });

  it("Get product store with existing code should return a successful response with expected properties", async function () {
    let responseCode = await api_general.SearchStore();
    const i = responseCode.body.recordsFiltered - 1;
    const oldCode = responseCode.body.data[i].code; 
    const response = await chai
        .request(baseurl)
        .get('/api/store/product?code=' + oldCode)
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+ global.token);

    console.log(response)      
    expect(response).to.have.status(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.message).to.equal('Successfully');
    expect(response.body).to.have.property('data');
  });

  it("Get product store with unavailable code should return a failure", async function () {
    const response = await chai
        .request(baseurl)
        .get('/api/store/product?code=' + process.env.InvalidCode)
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+ global.token);

    console.log(response)      
    expect(response).to.have.status(422);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal('<li>The selected code is invalid.</li>');
  });
});

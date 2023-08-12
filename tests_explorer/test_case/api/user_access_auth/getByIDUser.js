require(`${process.cwd()}/tests_explorer/base`)

const baseurl = "https://yoshinoya-api.akasia.id"; 

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const should = chai.should();
  
chai.use(chaiHttp)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);
const { generateCityAndCode, generateRandomLocation, generateRandomCountryCode, phoneNumber08 } = require(process.cwd() + '/tests_explorer/utils/generate_data');
const generatedData = generateCityAndCode();
const generatedData2 = generateRandomLocation();
const generatedData3 = generateRandomCountryCode();
const phone = phoneNumber08();



describe("Test Suite Get By ID User", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Get By ID User with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetUser();
    const i = responseCode.body.recordsTotal - 1;
    const id = responseCode.body.data[i].id;

    const response = await chai
            .request(baseurl)
            .get('/api/user/getByID?id=' + id)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(200);
    response.body.success.should.have.equal(true);
    response.body.data.id.should.have.equal(id);
    response.body.message.should.have.equal('Successfully');
    response.body.should.have.property('data');
   });

   it("Get By ID User with inValid Code (string) and Fill all Information should be Failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .get('/api/user/getByID?id=' + process.env.InvalidCode)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(500);
    response.body.success.should.have.equal(false);
    response.body.message.should.have.equal('SQLSTATE[22P02]: Invalid text representation: 7 ERROR:  invalid input syntax for integer: "Invalid" (SQL: select * from "users" where "id" = Invalid limit 1)');
   });

   it("Get By ID User with inValid Code (out of limit) and Fill all Information should be Failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .get('/api/user/getByID?id=999999999999999999999999999999999999999999999')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(500);
    response.body.success.should.have.equal(false);
    response.body.message.should.have.equal('SQLSTATE[22003]: Numeric value out of range: 7 ERROR:  value "999999999999999999999999999999999999999999999" is out of range for type integer (SQL: select * from "users" where "id" = 999999999999999999999999999999999999999999999 limit 1)');
   });

   it("Get By ID User with inValid Code and Fill all Information should be Failure #20230807092500", async function () {

    const response = await chai
            .request(baseurl)
            .get('/api/user/getByID?id=9999')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + global.token)

    console.log(response.body);
    response.should.have.status(500);
    response.body.success.should.have.equal(false);
    response.body.message.should.have.equal('No query results for model [App\\Models\\User].');
   });

});

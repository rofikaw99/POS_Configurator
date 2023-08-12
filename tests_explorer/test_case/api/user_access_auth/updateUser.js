require(`${process.cwd()}/tests_explorer/base`)

const baseurl = "https://yoshinoya-api.akasia.id"; 

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const should = chai.should();

const Name = faker.name.findName();
const FirstName = faker.name.firstName();
const LastName = faker.name.lastName();
const ID = faker.random.number({ min: 1, max: 9999 });
const Email = faker.internet.email();
  
chai.use(chaiHttp)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);
const { generateCityAndCode, generateRandomLocation, generateRandomCountryCode, phoneNumber08 } = require(process.cwd() + '/tests_explorer/utils/generate_data');
const generatedData = generateCityAndCode();
const generatedData2 = generateRandomLocation();
const generatedData3 = generateRandomCountryCode();
const phone = phoneNumber08();



describe("Test Suite Update User", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Update User with Valid Code and Fill all Information should be Success #20230807092500", async function () {
    let responseCode = await api_general.GetUser();
    const i = responseCode.body.recordsTotal - 1;
    const id = responseCode.body.data[i].user_id;

    const dataUser = {
        user_id: id,
        username:FirstName+" "+LastName,
        name: Name,
        password:process.env.password,
        password_confirmation:process.env.password,
        is_prompt_reset_password:false,
        prompt_every: 0,
        prompt_type: "",
        modules:[
            "1",
            "2",
            "3"
          ]
      };
    let response2 = await api_general.UpdateUser(dataUser);
    console.log(response2.body);
    response2.body.success.should.have.equal(true);
    response2.body.message.should.have.equal('Berhasil ter-update.');
    response2.body.data.user_id.should.have.equal(id);
 });

   it("Update User with Invalid Code and fill all information should be failure #20230807092500", async function () {
        let responseCode = await api_general.GetTransType();
        const transTypeCode = responseCode.body[0].code; 
        let responseCode1 = await api_general.GetScreen();
        const screenID = responseCode1.body[0].id; 
        let responseCode2 = await api_general.SearchStore();
        const i = responseCode2.body.recordsFiltered - 1;
        const j = responseCode2.body.recordsFiltered - 2;
        const oldCodei = responseCode2.body.data[i].code;
        const oldCodej = responseCode2.body.data[i].code;
      console.log(generatedData.code)
      console.log(generatedData.city)

      const dataUser = {
        user_id: process.env.invalidCode,
        username:FirstName+" "+LastName,
        name: Name,
        password:process.env.password,
        password_confirmation:process.env.password,
        is_prompt_reset_password:false,
        prompt_every: 0,
        prompt_type: "",
        modules:[
            "1",
            "2",
            "3"
          ]
      };
      let response2 = await api_general.UpdateUser(dataUser);
      console.log(response2.body);
      response2.should.have.status(500);
      response2.body.success.should.have.equal(false);
   });
});
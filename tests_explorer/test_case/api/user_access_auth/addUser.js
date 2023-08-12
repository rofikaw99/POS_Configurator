require(`${process.cwd()}/tests_explorer/base`)
const faker = require('faker');

const Name = faker.name.findName();
const FirstName = faker.name.firstName();
const LastName = faker.name.lastName();
const ID = faker.random.number({ min: 1, max: 9999 });
const Email = faker.internet.email();

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



describe("Test Suite Add User", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Add User with active status new Code should be success #20230807092500", async function () {

      const dataUser = {
        user_id: Name+ID,
        username:FirstName+" "+LastName,
        name: Name,
        role_id:"1",
        password:process.env.password,
        password_confirmation:process.env.password,
        is_prompt_reset_password:false,
        prompt_every: 0,
        prompt_type: "",
        modules:["1"]
      };
      
      let response = await api_general.AddUser(dataUser);
      console.log(response.body)
      response.should.have.status(200);
      response.body.success.should.have.equal(true);
      response.body.message.should.have.equal("Berhasil Tersimpan");
      response.body.data.user_id.should.have.equal(Name+ID);
      response.body.data.username.should.have.equal(FirstName+" "+LastName);
      console.log(response.body.data.id)
    });
});
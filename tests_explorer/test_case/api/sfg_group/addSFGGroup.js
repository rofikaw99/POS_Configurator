require(`${process.cwd()}/tests_explorer/base`)

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



describe("Test Suite Create SFG Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Create SFG Group with valid general product id should be success #20230807092500", async function () {
        console.log(generatedData)
        console.log(generatedData.code);

      const dataItem = {
        code: generatedData.code,
        name:'SFG '+ generatedData.code,
        note: 'note',
        is_active: true,
        product_codes:['BVRG00100'],
        general_product_ids:[
            2
        ]
      };
      console.log(dataItem)
      
      let response = await api_general.AddSFGGroup(dataItem);
      console.log(response.body)
      response.should.have.status(201);
      response.body.code.should.have.equal(generatedData.code);
      response.body.name.should.have.equal('SFG '+generatedData.code);
    });
});
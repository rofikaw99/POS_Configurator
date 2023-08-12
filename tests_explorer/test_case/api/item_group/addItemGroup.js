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



describe("Test Suite Create Item Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Create Item Group with active status new Code should be success #20230807092500", async function () {
    console.log(generatedData.code);
      const dataItem = {
        
        code: generatedData.code,
        name:"Beef "+ generatedData.code,
        note: "All Menu Beef",
        general_products_ids:[],
        is_active: false
      };
      
      let response = await api_general.AddItemGroup(dataItem);
      console.log(response.body)
      response.should.have.status(201);
      response.body.code.should.have.equal(generatedData.code);
      response.body.name.should.have.equal('Beef '+generatedData.code);
      console.log(response.id)
    });

    it("Create Item Group with inactive status new Code should be success #20230807092500", async function () {
  
        const dataStore = {
            code:generatedData.code+1,
            name:"Beef "+ generatedData.code+1,
            note: "All Menu Beef",
            general_products_ids:[],
            is_active: false
        };
        
        let response = await api_general.AddItemGroup(dataStore);
        response.should.have.status(201);
        response.body.code.should.have.equal(generatedData.code+1);
        console.log(response.id)
      });

      it("Create Item Group with existing Code should be failure #20230807092500", async function () {
        let responseCode = await api_general.GetItemGroup();
        const oldCode = responseCode.body[0].code; 
  
        const dataStore = {
            code:oldCode,
            name:"EDC "+generatedData2.code,
            note: "",
            general_products_ids:[],
            is_active: true
        };
        
        let response = await api_general.AddItemGroup(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        response.body.errors.should.have.property('code');
        response.body.errors.code[0].should.have.equal('The code has already been taken.');
      });

      it("Create Item Group with new Code but the data is empty should be failure #20230807092500", async function () {
        let responseCode = await api_general.SearchStore();
        const i = responseCode.body.recordsFiltered - 1;
        const oldCode = responseCode.body.data[i].code; 
  
        const dataStore = {
          code:generatedData.code+3,
          name:null,
          is_active: null
        };
        
        let response = await api_general.AddItemGroup(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        expect(response.body.errors.is_active[0]).to.have.equal('The is active field is required.');
      });

      it("Create Item Group with existing Code but the data is empty should be failure #20230807092500", async function () {
        let responseCode = await api_general.SearchStore();
        const i = responseCode.body.recordsFiltered - 1;
        const oldCode = responseCode.body.data[i].code; 
  
        const dataStore = {
          code:oldCode,
          name:null,
          is_active: null
        };
        
        let response = await api_general.AddItemGroup(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        expect(response.body.errors.is_active[0]).to.have.equal('The is active field is required.');
      });
});
require(`${process.cwd()}/tests_explorer/base`)

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const should = chai.should();

//faker
const faker = require('faker')
const fakeStartDate = faker.date.past();
const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const fakeEndDate = new Date(fakeStartDate.getTime() + oneWeekInMilliseconds);

const formattedStartDate = `${fakeStartDate.getFullYear()}-${String(fakeStartDate.getMonth() + 1).padStart(2, '0')}-${String(fakeStartDate.getDate()).padStart(2, '0')}`;
const formattedEndDate = `${fakeEndDate.getFullYear()}-${String(fakeEndDate.getMonth() + 1).padStart(2, '0')}-${String(fakeEndDate.getDate()).padStart(2, '0')}`;
const randomNum1and100 = faker.random.number({ min: 1.0, max: 100.0 });
  
chai.use(chaiHttp)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
const api_general = new apis.apigeneral;
const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);
const { generateCityAndCode, generateRandomLocation, generateRandomCountryCode, phoneNumber08 } = require(process.cwd() + '/tests_explorer/utils/generate_data');
const generatedData = generateCityAndCode();
const generatedData2 = generateRandomLocation();
const generatedData3 = generateRandomCountryCode();
const phone = phoneNumber08();



describe("Test Suite Create Discount", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Create Discount with active status new Code should be success #20230807092500", async function () {
        console.log(generatedData.code);
        let responseCode = await api_general.GetScreen();
        const screenID = responseCode.body[0].id; 
        console.log(responseCode.body[0].id)
        let responseCode2 = await api_general.SearchStore();
        const i = responseCode2.body.recordsFiltered - 1;
        const oldCode = responseCode2.body.data[i].code; 

      const data = {
        code: "DISC"+generatedData.code+screenID,
        name:"Discount "+ generatedData.code,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        start_time: process.env.start_time,
        end_time:process.env.end_time,
        active_days:process.env.active_days,
        screen_id: screenID,
        min_amount: process.env.min_amount,
        max_amount: process.env.max_amount,
        discount_type: "1",
        discount_percent: "20",
        max_discount_percent_amount: randomNum1and100,
        discount_amount: "0",
        reference: "DEF123",
        is_active: true,
        combo_definition_ids:[],
        payment_codes:[],
        store_codes:[],
        trans_type_codes:[]
      };
      
      let response = await api_general.AddDiscount(data);
      console.log(response.body)
      response.should.have.status(201);
      response.body.code.should.have.equal(generatedData.code+screenID);
      response.body.name.should.have.equal('Dine in '+generatedData.code);
      response.body.screen_id.should.have.equal(screenID);
      expect(response.body.stores[0].code).to.have.equal(oldCode);
    });

    it("Create Discount with inactive status new Code should be success #20230807092500", async function () {
      let responseCode = await api_general.GetScreen();
      const screenID = responseCode.body[0].id;
      let responseCode2 = await api_general.SearchStore();
      const i = responseCode2.body.recordsFiltered - 1;
      const oldCode = responseCode2.body.data[i].code;
      

        const dataStore = {
            code: generatedData.code,
            name:"Dine in "+ generatedData.code,
            screen_id: screenID,
            is_active: true,
            store_ids:[oldCode]
        };
        
        let response = await api_general.AddDiscount(dataStore);
        response.should.have.status(201);
        response.body.code.should.have.equal(generatedData.code);
        response.body.name.should.have.equal('Dine in '+generatedData.code);
        response.body.screen_id.should.have.equal(screenID);
        expect(response.body.stores[0].code).to.have.equal(oldCode);
      });

      it("Create Discount with existing Code should be failure #20230807092500", async function () {
        let responseCode1 = await api_general.GetDiscount();
        const oldCode1 = responseCode1.body[0].code; 
        let responseCode = await api_general.SearchStore();
        const i = responseCode.body.recordsFiltered - 1;
        const oldCode = responseCode.body.data[i].code;
        let responseCode2 = await api_general.GetScreen();
        const screenID = responseCode2.body[0].id; 
  
        const dataStore = {
            code: oldCode1,
            name:"Dine in "+ generatedData.code,
            screen_id: screenID,
            is_active: true,
            store_ids:[oldCode]
        };
        
        let response = await api_general.AddDiscount(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        response.body.errors.should.have.property('code');
        response.body.errors.code[0].should.have.equal('The code has already been taken.');
      });

      it("Create Discount with new Code but the data is empty should be failure #20230807092500", async function () { 
  
        const dataStore = {
          code:generatedData.code+3,
          name:null,
          screen_id: null,
          is_active: null,
          store_ids:null
        };
        
        let response = await api_general.AddDiscount(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        // expect(response.body.errors.is_active[0]).to.have.equal('The is active field must be true or false.');
        // expect(response.body.errors.code[0]).to.have.equal('The code has already been taken.');
        // expect(response.body.errors.name[0]).to.have.equal('The name field is required.');
        // expect(response.body.errors.screen_id[0]).to.have.equal('The screen id field is required.');
        // expect(response.body.errors.store_ids[0]).to.have.equal('The store ids field is required.');
      });

      it("Create Discount with existing Code but the data is empty should be failure #20230807092500", async function () {
        let responseCode1 = await api_general.GetDiscount();
        const oldCode1 = responseCode1.body[0].code; 
        let responseCode = await api_general.SearchStore();
        const i = responseCode.body.recordsFiltered - 1;
        const oldCode = responseCode.body.data[i].code; 
        let responseCode2 = await api_general.GetScreen();
        const screenID = responseCode2.body[0].id; 
  
        const dataStore = {
            code:generatedData.code+3,
            name:null,
            screen_id: null,
            is_active: null,
            store_ids:null
        };
        
        let v = 0;
        let response = await api_general.AddDiscount(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        console.log(response.body)
        // response.body.errors.should.have.property('code');
        // response.body.errors.should.have.property('name');
        // response.body.errors.should.have.property('screen_id');
        // response.body.errors.should.have.property('is_active');
        // response.body.errors.should.have.property('store_ids');
      });
});
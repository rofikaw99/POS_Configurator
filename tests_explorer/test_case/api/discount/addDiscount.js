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
      response.body.code.should.have.equal("DISC"+generatedData.code+screenID);
      response.body.name.should.have.equal("Discount "+ generatedData.code);
      response.body.screen_id.should.have.equal(screenID);
    });

    it("Create Discount with invalid format date #20230807092500", async function () {
      console.log(generatedData.code);
      let responseCode = await api_general.GetScreen();
      const screenID = responseCode.body[0].id; 
      console.log(responseCode.body[0].id)
      let responseCode2 = await api_general.SearchStore();
      const i = responseCode2.body.recordsFiltered - 1;
      const oldCode = responseCode2.body.data[i].code; 
      

        const data = {
          code: "DISC"+generatedData.code+screenID+'1',
          name:"Discount "+ generatedData.code,
          start_date: formattedStartDate,
          end_date: formattedEndDate+'1',
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
        response.should.have.status(422);
        response.body.errors.should.have.property(end_date);
      });

      it("Create Discount with invalid time should be failure #20230807092500", async function () {
        console.log(generatedData.code);
        let responseCode = await api_general.GetScreen();
        const screenID = responseCode.body[0].id; 
        console.log(responseCode.body[0].id)
        let responseCode2 = await api_general.SearchStore();
        const i = responseCode2.body.recordsFiltered - 1;
        const oldCode = responseCode2.body.data[i].code; 
  
        const dataStore = {
          code: "DISC"+generatedData.code+screenID+'1',
          name:"Discount "+ generatedData.code,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          start_time: process.env.start_time,
          end_time:process.env.end_time,
          active_days:process.env.active_days,
          screen_id: screenID,
          min_amount: process.env.min_amount,
          max_amount: '25:00',
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
        
        let response = await api_general.AddDiscount(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        response.body.errors.should.have.property('end_time');
        response.body.errors.end_time.should.have.equal('The end time does not match the format H:i.');
      });

      it("Create Discount with end_time more early than start time should be failure #20230807092500", async function () { 
        console.log(generatedData.code);
        let responseCode = await api_general.GetScreen();
        const screenID = responseCode.body[0].id; 
        console.log(responseCode.body[0].id)
        let responseCode2 = await api_general.SearchStore();
        const i = responseCode2.body.recordsFiltered - 1;
        const oldCode = responseCode2.body.data[i].code; 
  
        const dataStore = {
          code: "DISC"+generatedData.code+screenID+'1',
          name:"Discount "+ generatedData.code,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          start_time: process.env.end_time,
          end_time:process.env.start_time,
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
        
        let response = await api_general.AddDiscount(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        response.body.errors.should.have.property('end_time');
        response.body.errors.end_time.should.have.equal('The end time must be a date after start time.');
      });

      it("Create Discount with invalid screen id should be failure #20230807092500", async function () {
        console.log(generatedData.code);
        let responseCode = await api_general.GetScreen();
        const screenID = responseCode.body[0].id; 
        console.log(responseCode.body[0].id)
        let responseCode2 = await api_general.SearchStore();
        const i = responseCode2.body.recordsFiltered - 1;
        const oldCode = responseCode2.body.data[i].code; 
  
        const dataStore = {
          code: "DISC"+generatedData.code+screenID+'1',
          name:"Discount "+ generatedData.code,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          start_time: process.env.end_time,
          end_time:process.env.start_time,
          active_days:process.env.active_days,
          screen_id: '8',
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
        
        let response = await api_general.AddDiscount(dataStore);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        response.body.errors.should.have.property('screen_id');
        response.body.errors.end_time.should.have.equal('The selected screen id is invalid.');
      });
});
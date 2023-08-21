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



describe("Test Suite Create Combo Group", function () {
   before(async function () {
      await initial.Login_Yoshinoya();
   });

   it("Create Combo Group with active status new Code should be success #20230807092500", async function () {
        console.log(generatedData.code);

      const data = {
        code: "CG"+generatedData.code,
        name:"Regular Ori Yaki Beef "+ generatedData.code,
        is_active: true,
        details:[
            {
                general_product_id: '2',
                quantity: '2'
            }
        ]
      };
      
      let response = await api_general.AddComboGroup(data);
      console.log(response.body)
      response.should.have.status(201);
      response.body.code.should.have.equal('CG'+generatedData.code);
      response.body.name.should.have.equal('Regular Ori Yaki Beef '+ generatedData.code);
      response.body.created_by.should.have.equal('icadoke');
    });

    it("Create Combo Group with Code Already has Already been Taken #20230807092500", async function () {
      console.log(generatedData.code);

      const data = {
        code: "CG"+generatedData.code,
        name:"Regular Ori Yaki Beef "+ generatedData.code,
        is_active: true,
        details:[
            {
                general_product_id: '2',
                quantity: '2'
            }
        ]
      };
        
        let response = await api_general.AddComboGroup(data);
        response.should.have.status(422);
        expect(response.body).to.have.property('errors');
      });

      it("Create Combo Group with Empty Required Data Should be Failure #20230807092500", async function () {
        console.log(generatedData.code);
  
        const data = {
          code: "CG"+generatedData.code,
        //   name:"Regular Ori Yaki Beef "+ generatedData.code,
        //   is_active: true,
          details:[
              {
                //   general_product_id: '2',
                //   quantity: '2'
              }
          ]
        };
          
          let response = await api_general.AddComboGroup(data);
          response.should.have.status(422);
          expect(response.body.errors.name[0]).to.have.equal('The name field is required.');
          expect(response.body.errors.is_active[0]).to.have.equal('The is active field is required.');
          expect(response.body.errors["details.0.general_product_id"][0]).to.have.equal('The details.0.general_product_id field is required.');
          expect(response.body.errors["details.0.quantity"][0]).to.have.equal('The details.0.quantity field is required.');
        });  
    
              it("Create Combo Group with Empty Required Data Should be Failure #20230807092500", async function () {
        console.log(generatedData.code);
  
        const data = {
          code: "CG"+generatedData.code,
        //   name:"Regular Ori Yaki Beef "+ generatedData.code,
        //   is_active: true,
          details:[
              {
                //   general_product_id: '2',
                //   quantity: '2'
              }
          ]
        };
          
          let response = await api_general.AddComboGroup(data);
          response.should.have.status(422);
          expect(response.body.errors.name[0]).to.have.equal('The name field is required.');
          expect(response.body.errors.is_active[0]).to.have.equal('The is active field is required.');
          expect(response.body.errors["details.0.general_product_id"][0]).to.have.equal('The details.0.general_product_id field is required.');
          expect(response.body.errors["details.0.quantity"][0]).to.have.equal('The details.0.quantity field is required.');
        }); 
    
        it("Create Combo Group with Invalid General Product ID Should be Failure #20230807092500", async function () {
            console.log(generatedData.code);
      
            const data = {
              code: "CG"+generatedData.code,
              name:"Regular Ori Yaki Beef "+ generatedData.code,
              is_active: true,
              details:[
                  {
                      general_product_id: '1',
                      quantity: '2'
                  }
              ]
            };
              
              let response = await api_general.AddComboGroup(data);
              response.should.have.status(422);
              expect(response.body.errors["details.0.general_product_id"][0]).to.have.equal('The selected details.0.general_product_id is invalid.');
        });     
});
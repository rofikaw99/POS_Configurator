// require(`${process.cwd()}/tests_explorer/base`)

// const chai = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');
// const should = chai.should();

// //faker
// const faker = require('faker')
// const fakeStartDate = faker.date.past();
// const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
// const fakeEndDate = new Date(fakeStartDate.getTime() + oneWeekInMilliseconds);

// const formattedStartDate = `${fakeStartDate.getFullYear()}-${String(fakeStartDate.getMonth() + 1).padStart(2, '0')}-${String(fakeStartDate.getDate()).padStart(2, '0')}`;
// const formattedEndDate = `${fakeEndDate.getFullYear()}-${String(fakeEndDate.getMonth() + 1).padStart(2, '0')}-${String(fakeEndDate.getDate()).padStart(2, '0')}`;
// const randomNum1and100 = faker.random.number({ min: 1.0, max: 100.0 });
  
// chai.use(chaiHttp)

// const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`);
// const api_general = new apis.apigeneral;
// const initial = require(`${process.cwd()}/tests_explorer/test_case/initial`);
// const { generateCityAndCode, generateRandomLocation, generateRandomCountryCode, phoneNumber08 } = require(process.cwd() + '/tests_explorer/utils/generate_data');
// const generatedData = generateCityAndCode();
// const generatedData2 = generateRandomLocation();
// const generatedData3 = generateRandomCountryCode();
// const phone = phoneNumber08();



// describe("Test Suite Create Combo Definition", function () {
//    before(async function () {
//       await initial.Login_Yoshinoya();
//    });

//    it("Create Combo Definition with active status new Code should be success #20230815092500", async function () {
//         console.log(generatedData.code);

//       const data = {
//         code: 'CD'+generatedData.code,
//         name:'Promo '+ generatedData.code,
//         start_date: formattedStartDate,
//         end_date: formattedEndDate,
//         active_days:'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
//         sidebar_id: 3,
//         voucher_activation_id: 1,
//         combo_group_ids:[
//             3,
//             4
//         ],
//         payment_codes:[
//             'CCBSI',
//             'CCBRI'
//         ],
//         store_codes:[
//             'MGI3',
//             'MMM'
//         ],
//         trans_type_codes:[
//             'DI3',
//             'SI24'
//         ],
//         is_active: true
//       };
      
//       let response = await api_general.AddComboDefinition(data);
//       console.log(response.body)
//       response.should.have.status(201);
//       response.body.code.should.have.equal('CG'+generatedData.code);
//       response.body.name.should.have.equal('Regular Ori Yaki Beef '+ generatedData.code);
//       response.body.created_by.should.have.equal('icadoke');
//     });
// });
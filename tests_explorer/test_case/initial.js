require(`${process.cwd()}/tests_explorer/base`)

const apis = require(`${process.cwd()}/tests_explorer/object_repository/apis`)
   , api_general = new apis.apigeneral

/* Function login yang akan dipanggil di before di dalam describe */
async function Login_Yoshinoya() {
   const dataLogin = {
      email: process.env.email,
      password: process.env.password
  };

   let response = await api_general.Login_Yoshinoya(dataLogin);
   response.should.have.status(200);
   global.token = response.body.access_token
}

async function setupSearchStoreGroupValid() {
   let response = await api_general.Search_StoreGroup_Valid();
   console.log(response.body);
   response.should.have.status(200);
   const i = response.body.recordsFiltered - 1; 
   console.log(response.body.data[i]);
   expect(response.body.data[i]).to.have.property('id');
   expect(response.body.data[i]).to.have.property('code');
   expect(response.body.data[i]).to.have.property('name');
   global.storeGroupCode = response.body.data[i].code;
   global.storeGroupCode2 = response.body.data[0].code;
}

async function setupSearchStoreValid() {
   let response = await api_general.SearchStore();
   console.log(response.body);
   response.should.have.status(200);
   const i = response.body.recordsFiltered - 1; 
   console.log(response.body.data[i]);
   expect(response.body.data[i]).to.have.property('id');
   expect(response.body.data[i]).to.have.property('code');
   expect(response.body.data[i]).to.have.property('name');
   global.storeCode = response.body.data[i].code;
}

module.exports = {
   Login_Yoshinoya,
   setupSearchStoreGroupValid,
   setupSearchStoreValid
}
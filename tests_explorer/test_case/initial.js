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

module.exports = {
   Login_Yoshinoya
}
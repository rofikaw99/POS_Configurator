const ApiBase = require(`${process.cwd()}/tests_explorer/object_repository/api_base`)       // Harus selalu ada

class general extends ApiBase {                                                             // Sesuaikan nama module nya

    Login_Yoshinoya(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/auth/login')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')   
            .send(data);              
    }

    Search_StoreGroup_Valid() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search?code='+process.env.storeGroub_Code)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)            
    }

    Search_StoreGroup_inValid() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search?code=yara')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')   
            .set('authorization', 'Bearer ' + global.token)              
    }
    
    Search_StoreGroup_NULL() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search?code=')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)             
    }

    Add_StoreGroup(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/storegroup/add')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)  
            .send(data);           
    }
}

module.exports = general                                                                   
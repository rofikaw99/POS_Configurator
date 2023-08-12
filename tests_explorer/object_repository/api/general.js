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

    StoreGroup_Get_By_ID() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/getByID?code='+global.storeGroupCode)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)            
    }

    Update_StoreGroup(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.put('/api/storegroup/update')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)  
            .send(data);           
    }
    
    ListStore_StoreGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/list_stores?code='+process.env.storeGroub_Code)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)   
            
    }

    ListStore_StoreGroup2() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/list_stores?code='+global.storeGroupCode)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)   
            
    }
    
    AddStore_StoreGroup(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/storegroup/add_stores')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)  
            .send(data);           
    }

    AddStore(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/store/add')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)  
            .send(data);           
    }

    UpdateStore(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.put('/api/store/update')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)  
            .send(data);           
    }

    SearchStore() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/store/search')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    AddEDCSetting(data) {                                                   
        return this.endpoint.post('/api/edc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token) 
            .send(data);      
    }

    GetEDCSetting() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/edc?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    AddItemGroup(data) {                                                   
        return this.endpoint.post('/api/item-group')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token) 
            .send(data);      
    }

    GetItemGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/item-group?orderBy=code&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    GetTransType() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/trans-type?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    AddTransType(data) {                                                   
        return this.endpoint.post('/api/trans-type')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token) 
            .send(data);      
    }

    GetScreen() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/screen?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    SearchStoreGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    AddUser(data) {                                                   
        return this.endpoint.post('/api/user/add')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token) 
            .send(data);      
    }

    GetUserRole() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/userrole/sync')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    GetUser() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/user/search')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }

    UpdateUser(data) {                                                   
        return this.endpoint.put('/api/user/update')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token) 
            .send(data);      
    }

    GetDiscount() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/discount?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.token)     
    }


}

module.exports = general                                                                   
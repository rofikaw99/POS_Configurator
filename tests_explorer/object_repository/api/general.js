const ApiBase = require(`${process.cwd()}/tests_explorer/object_repository/api_base`)       // Harus selalu ada



class general extends ApiBase {                                                             // Sesuaikan nama module nya

    Login_Yoshinoya(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/auth/login')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')   
            .set('user-agent', 'PostmanRuntime/7.32.3') 
            .set('connection', 'keep-alive') 
            .send(data);              
    }

    Search_StoreGroup_Valid() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search?code='+process.env.storeGroub_Code)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)            
    }

    Search_StoreGroup_inValid() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search?code=yara')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')   
            .set('authorization', 'Bearer ' + global.bearerToken)              
    }
    
    Search_StoreGroup_NULL() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search?code=')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)             
    }
    

    Add_StoreGroup(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/storegroup/add')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)  
            .send(data);           
    }

    StoreGroup_Get_By_ID() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/getByID?code='+global.storeGroupCode)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)            
    }

    Update_StoreGroup(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.put('/api/storegroup/update')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)  
            .send(data);           
    }
    
    ListStore_StoreGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/list_stores?code='+process.env.storeGroub_Code)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)   
            
    }

    ListStore_StoreGroup2() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/list_stores?code='+global.storeGroupCode)                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)   
            
    }
    
    AddStore_StoreGroup(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/storegroup/add_stores')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)  
            .send(data);           
    }

    AddStore(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.post('/api/store/add')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)  
            .send(data);           
    }

    UpdateStore(data) {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.put('/api/store/update')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)  
            .send(data);           
    }

    SearchStore() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/store/search')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    AddEDCSetting(data) {                                                   
        return this.endpoint.post('/api/edc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken) 
            .send(data);      
    }

    GetEDCSetting() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/edc?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    AddItemGroup(data) {                                                   
        return this.endpoint.post('/api/item-group')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken) 
            .send(data);      
    }

    GetItemGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/item-group?orderBy=code&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetTransType() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/trans-type?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    AddTransType(data) {                                                   
        return this.endpoint.post('/api/trans-type')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken) 
            .send(data);      
    }

    GetScreen() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/screen?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    SearchStoreGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/storegroup/search')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    AddUser(data) {                                                   
        return this.endpoint.post('/api/user/add')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken) 
            .send(data);      
    }

    GetUserRole() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/userrole/sync')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetUser() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/user/search')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    UpdateUser(data) {                                                   
        return this.endpoint.put('/api/user/update')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken) 
            .send(data);      
    }

    GetDiscount() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/discount?orderBy=name&orderDirection=asc')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetComboGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/combo-group?orderBy=<string>&orderDirection=<string>')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    AddComboGroup(data) {                                                   
        return this.endpoint.post('/api/combo-group')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken) 
            .send(data);      
    }

    GetComboDefinition() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/combo-definition?orderBy=<string>&orderDirection=<string>')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetPaymentGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/payment-group?orderBy=<string>&orderDirection=<string>')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetPayment() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/payment?orderBy=<string>&orderDirection=<string>')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetPaymentScreen() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/payment-screen?orderBy=<string>&orderDirection=<string>')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetTransactionScreen() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/payment-screen?orderBy=<string>&orderDirection=<string>')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    GetSFGGroup() {                                                    // Sesuaikan nama function dengan nama API, parameternya disesuaikan juga
        return this.endpoint.get('/api/sfg-group?orderBy=<string>&orderDirection=<string>')                                       // Sesuaikan dengan path URL API nya    
            .set('authorization', 'Bearer ' + global.bearerToken)     
    }

    AddSFGGroup(data) {                                                   
        return this.endpoint.post('/api/sfg-group')                                       // Sesuaikan dengan path URL API nya
            .set('content-type', 'application/json')    
            .set('authorization', 'Bearer ' + global.bearerToken) 
            .send(data);      
    }
}

module.exports = general                                                                   
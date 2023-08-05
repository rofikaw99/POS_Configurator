class APIBase  {
    constructor() {
        require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
        this.chaihttp = require('chai-http');
        this.chai = require('chai');
        this.chai.use(this.chaihttp);
        this.endpoint = this.chai.request(process.env.BASE_URL);                 // Jika ada 2 endpoint, bisa ditambahkan satu lagi
    }
}

module.exports = APIBase
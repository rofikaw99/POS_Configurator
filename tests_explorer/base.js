require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
require('datejs');

const chai = require('chai')
global.faker = require('faker');  

global.expect = chai.expect
global.should = chai.should();
global.assert = chai.assert

module.exports = {
    chai
}
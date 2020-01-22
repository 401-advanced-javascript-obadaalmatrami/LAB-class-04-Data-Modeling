'use strict';

const DataModel = require('../memory-data-model.js');

class Products extends DataModel {
    constructor() {
        super();
        this.schema = {
            id: { string, required: true },
            price: { number, required: true },
            weight: { number },
            items_in_stock: { number },
        };
    }
}

module.exports = Products;
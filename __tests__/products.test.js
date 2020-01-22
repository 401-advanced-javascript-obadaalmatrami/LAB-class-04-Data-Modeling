'use strict';


const Products = require('../products/products.js');

describe('Products Model', () => {

    let products;

    beforeEach(() => {
        products = new Products();
    })


    it('can post() a new product', () => {
        let obj = { price: 8 };
        return products.create(obj)
            .then(record => {
                Object.keys(obj).forEach(key => {
                    expect(record[key]).toEqual(obj[key]);
                });
            })
            .catch(e => console.error('ERR', e));
    });

    it('can get() a product', () => {
        let obj = { price: 12 };
        return products.create(obj)
            .then(record => {
                return products.get(record._id)
                    .then(items => {
                        Object.keys(obj).forEach(key => {
                            expect(items[0][key]).toEqual(obj[key]);
                        });
                    });
            });
    });

    it('can delete() a product', () => {
        let obj = { name: 'Test product' };
        return products.create(obj)
            .then(record => {
                products.delete(record)
                    .then(() => {
                        products.get(record.id)
                            .then((products) => {
                                expect(products.length).toEqual(0);
                            })
                    })
            })
            .catch(err => console.error('Error', err));

    });

    it('can update() a product', () => {
        let obj = { price: 8 };
        return products.create(obj)
            .then(items => {
                items.price = 12;
                products.update(items.id, record)
                    .then(() => {
                        products.get(items.id)
                            .then((items) => {
                                expect(items[0].price).toEqual(12)
                            })
                    })
            })
            .catch(e => console.error('ERR', e));
    });




});
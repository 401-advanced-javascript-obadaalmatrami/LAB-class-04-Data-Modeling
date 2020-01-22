'use strict';

const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

    let categories;

    beforeEach(() => {
        categories = new Categories();
    });

    it('can post() a new category', () => {
        let obj = { name: 'Test Category' };
        return categories.create(obj)
            .then(record => {
                Object.keys(obj).forEach(key => {
                    expect(record[key]).toEqual(obj[key]);
                });
            })
            .catch(e => console.error('ERR', e));
    });

    it('can get() a category', () => {
        let obj = { name: 'Test Category' };
        return categories.create(obj)
            .then(record => {
                return categories.get(record._id)
                    .then(category => {
                        Object.keys(obj).forEach(key => {
                            expect(category[0][key]).toEqual(obj[key]);
                        });
                    });
            });
    });

    it('can delete() a category', () => {
        let obj = { name: 'Test Category' };
        return categories.create(obj)
            .then(record => {
                categories.delete(record)
                    .then(() => {
                        categories.get(record.id)
                            .then((categories) => {
                                expect(categories.length).toEqual(0);
                            })
                    })
            })
            .catch(err => console.error('Error', err));
    });

    it('can update() a category', () => {
        let obj = { name: 'Test Category' };
        return categories.create(obj)
            .then(record => {
                record.name = 'updated name';
                categories.update(record.id, record)
                    .then(() => {
                        categories.get(record.id)
                            .then((categories) => {
                                expect(categories[0].name).toEqual('updated name')
                            })
                    })
            })
            .catch(err => console.error('Error', err));
    });


});
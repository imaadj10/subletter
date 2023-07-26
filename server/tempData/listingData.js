const { v4: uuidv4 } = require('uuid');

const listingDB = [
    { name: 'Marine Drive Building 4', residence: 'Marine Drive', location: 'UBC campus', price: '$800 month'},
    { name: 'Ponderosa Building 3', residence: 'Ponderosa', location: 'UBC campus', price: '$1200 month'},
    { name: 'Brock Building 1', residence: 'Brock', location: 'UBC campus', price: '$300 month'},
    { name: 'Brock Building 1', residence: 'Brock', location: 'UBC campus', price: '$300 month'},
    { name: 'Brock Building 1', residence: 'Brock', location: 'UBC campus', price: '$300 month'},
    { name: 'Brock Building 1', residence: 'Brock', location: 'UBC campus', price: '$300 month'},
];

// React requires unique for every list elements
const addId = (db) => {
    return listingDB.map((listing) => ({
        id: uuidv4(),
        ...listing,
    }));
};

const idListingsDB = addId(listingDB);

module.exports = { idListingsDB };
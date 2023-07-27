const { v4: uuidv4 } = require('uuid');

const listingDB = [
    { name: 'Marine Drive Building 4', residence: 'Marine Drive', location: 'UBC campus', price: '$800 month', image: 'UBC-Marine-Residence'},
    { name: 'Ponderosa Building 3', residence: 'Ponderosa', location: 'UBC campus', price: '$1200 month', image: 'Ponderosa'},
    { name: 'Brock Building 1', residence: 'Brock', location: 'UBC campus', price: '$300 month', image: 'Tallwood'},
    { name: 'Brock Building 1', residence: 'Brock', location: 'UBC campus', price: '$300 month', image: 'Tallwood'},
    { name: 'Brock Building 1', residence: 'Brock', location: 'UBC campus', price: '$300 month', image: 'Tallwood'},
    { name: 'Orchard-Commons 3', residence: 'Orchard', location: 'UBC campus', price: '$1300 month', image: 'Orchard-Commons'},
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
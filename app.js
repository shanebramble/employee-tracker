const db = require('./db/connection');
const {mainPrompts} = require('./lib/prompts');

// Initialize the beginning prompts.
function init() {
    console.log('---------------------------------');
    console.log('|Content Management Systems(CMS) |');
    console.log('---------------------------------');

    mainPrompts();
}
// Start the original prompt listings.
init();

// Start DB connection
db.connect(err => {
    if (err) throw err;
    console.log('\nDatabase connected.');
});

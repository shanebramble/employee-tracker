const inquirer = require('inquirer');
const db = require('./db/connection');
const {viewDepartment, viewRoles, viewEmployee} = require('./lib/queries');


console.log('---------------------------------');
console.log('|Content Management Systems(CMS) |');
console.log('---------------------------------');

function init (){
    mainPrompts();
}
//  A prompt showcasing a list of different options.
function mainPrompts() {
    inquirer
        .prompt([{
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Quit']
        }])
        .then((ans) => {
            let selectedOption = ans.option;
            // Based on selection we trigger certain functions.
            switch (selectedOption) {
                case 'view all departments':
                    viewDepartment();
                    break;
                case 'view all roles':
                    viewRoles();
                    break;
                case 'view all employees':
                    viewEmployee();
                    break;
                case 'add a department':
                    addDepartment();
                    break;
                case 'add a role':
                    addRole();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateEmployeeRole();
                    break;
                default:
                    Quit();
                    break;
            }
        });
}

// Start the original prompt listings.

init();
// Start DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('../db');

const viewDepartment = () => {
    db.viewAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        });    
};

const viewRoles = () => {
    db.viewAllRoles()
        .then (([rows]) => {
            let roles = rows;
            console.table(roles);
        });
};

const viewEmployee = () => {
    db.viewAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        });
};

function addDepartment() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?'
        }])
        .then((ans) => {
            let name = ans;
            db.addNewDepartment(name)
                .then(() => console.log(`Added ${ans.department} to database!`));
        });
}
/*
function addRole() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'title',
                message: 'What is the name of the new role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this new role?'
            },
            {
                type: "list",
                name: 'department_id',
                message: 'Which department does this new role belong to?',
                choices: []
            }
        ])
        .then((ans) => {
            const sql = `INSERT INTO role (title, salary, department_id)
                  VALUE (?, ?, ?)`;
            const params = [ans.title, ans.salary, ans.department_id];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.error(500);
                }
                console.log(`Added a new role called: ${ans.title} to the database!`);
            });
        });
}

function addEmployee (){
    inquirer
        .prompt([{
                type: 'input',
                name: 'first_name',
                message: 'What is the new employees first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the new employees last name?'
            },
            {
                type: "list",
                name: 'role',
                message: 'What is the new employees role?',
                choices: []
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager for this employee?',
                choices: []
            }
        ])
        .then((ans) => {
            const sql = `INSERT INTO role (title, salary, department_id)
                VALUE (?, ?, ?)`;
            const params = [ans.title, ans.salary, ans.department_id];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.error(500);
                }
                console.log(`Added a new role called: ${ans.title} to the database!`);
            });
        });
}
// updateEmployeeRole
// Quit

*/
module.exports = {
    viewDepartment: viewDepartment,
    viewRoles: viewRoles,
    viewEmployee: viewEmployee,
    addDepartment: addDepartment
    // addRole: addRole,
    //updateEmployeeRole:updateEmployeeRole
};
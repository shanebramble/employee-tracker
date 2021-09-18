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
        .then(([rows]) => {
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
            let newDepartment = ans.department;
            db.addNewDepartment(newDepartment)
                .then(() => console.log(`Added a new department called: ${newDepartment} to the database`));
        });
}

function addRole() {
    db.viewAllDepartments()
        .then(([ans]) => {
            let departments = ans;
            const departmentChoices = departments.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));

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
                        name: 'all_departments',
                        message: 'Which department does this new role belong to?',
                        choices: departmentChoices
                    }
                ])
                .then((ans) => {
                    // console.log(ans);
                    let role = ans;
                    db.addNewRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`));
                });

        });
}

function addEmployee() {

    db.viewAllRoles()
        .then(([ans]) => {
            let allroles = ans;
            const roleList = allroles.map(({
                id,
                title
            }) => ({
                name: title,
                value: id
            }));
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
                        choices: roleList
                    },

                ])
                .then((ans) => {
                    let employeeInfo = ans;
                    let first_name = employeeInfo.first_name;
                    let last_name = employeeInfo.last_name;
                    let roleID = employeeInfo.role;
                })
                .then(() => {
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'Who is the manager for this employee?',
                                choices: []
                            }
                        ])
                })
                    
                
        });
}

                   
// updateEmployeeRole

function Quit (){
    console.log("GoodBye!");
    process.exit();
}

module.exports = {
    viewDepartment: viewDepartment,
    viewRoles: viewRoles,
    viewEmployee: viewEmployee,
    addDepartment: addDepartment,
    addRole: addRole
    //updateEmployeeRole:updateEmployeeRole
};
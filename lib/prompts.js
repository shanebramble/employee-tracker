const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('../db');

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

// View all departments in the database.
const viewDepartment = () => {
    db.viewAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
            mainPrompts();
        }).catch(err => console.log(err))
};
// View all roles in the database.
const viewRoles = () => {
    db.viewAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
            mainPrompts();
        });
};
// View all employees in the database.
const viewEmployee = () => {
    db.viewAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
            mainPrompts();
        });
};
// Add a new department by using an insert query.
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
            mainPrompts();
        });
}
// Add a new role by using an insert query.
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
                    let role = ans;
                    db.addNewRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`));
                    mainPrompts();
                });

        });
}
// Add a new employee by using an insert query.
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
                    let first_name = ans.first_name;
                    let last_name = ans.last_name;
                    let roleID = ans.role;

                    db.viewAllEmployees()
                        .then(([rows]) => {
                            let allEmployees = rows;
                            let managerChoice = allEmployees.map(({
                                id,
                                first_name,
                                last_name
                            }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));
                            inquirer
                                .prompt([{
                                    type: 'list',
                                    name: 'manager',
                                    message: 'Who is the manager for this employee?',
                                    choices: managerChoice
                                }])
                                .then((ans) => {
                                    var newEmployee = {
                                        first_name: first_name,
                                        last_name: last_name,
                                        roleID: roleID,
                                        managerChoice: ans.manager
                                    }
                                    // console.log(newEmployee);
                                    db.addNewEmployee(newEmployee)
                                        .then(() => console.log(`Added ${newEmployee.first_name} ${newEmployee.last_name} to the employee database`));
                                        mainPrompts();

                                });
                        });
                });
        });
}

// Update an existing employee role.
function updateEmployeeRole() {
    db.viewAllEmployees ()
        .then(([rows]) => {
            let allEmployees = rows;
            const employeeChoice = allEmployees.map(({
                id,
                first_name,
                last_name
            }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            inquirer
                .prompt([{
                    type: 'list',
                    name: 'employees',
                    message: 'Please select the employee you would like to update their role',
                    choices: employeeChoice
                }])
                .then((ans) => {
                    let selectedEmployeeID = ans.employees;
                    db.viewAllRoles()
                        .then(([rows]) => {
                            let allRoles = rows;
                            const roleChoices = allRoles.map(({
                                id,
                                title
                            }) => ({
                                name: title,
                                value: id
                            }));
                            inquirer
                                .prompt([{
                                    type: 'list',
                                    name: 'role',
                                    message: 'Please select the new role for this employee',
                                    choices: roleChoices
                                }])
                                .then((ans) => {
                                    const updatedEmployee ={
                                        employeeID:selectedEmployeeID,
                                        roleID: ans.role
                                    }
                                    // console.log(updatedEmployee);
                                    db.updateEmployeeRole (updatedEmployee.roleID, updatedEmployee.employeeID)
                                        .then(() => console.log(`Updated this employees role.`));
                                        mainPrompts();
                                });
                        });

                });
        });
}
// Quit the CLI application
function Quit() {
    console.log("GoodBye!");
    process.exit();
}

module.exports = {
    mainPrompts: mainPrompts
};
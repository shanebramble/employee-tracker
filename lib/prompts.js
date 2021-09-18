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
                                });
                        });
                });
        });
}


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
                                });
                        });

                });
        });
}

function Quit() {
    console.log("GoodBye!");
    process.exit();
}

module.exports = {
    viewDepartment: viewDepartment,
    viewRoles: viewRoles,
    viewEmployee: viewEmployee,
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee,
    updateEmployeeRole: updateEmployeeRole,
    Quit: Quit
};
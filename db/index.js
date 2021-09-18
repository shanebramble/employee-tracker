const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllDepartments() {
        return this.connection.promise().query(`SELECT * FROM department`);
    }
    viewAllRoles() {
        return this.connection.promise().query(`SELECT * FROM role`);
    }
    viewAllEmployees() {
        return this.connection.promise().query(`SELECT * FROM employee`);
    }
    addNewDepartment(department){
        return this.connection.promise().query(`INSERT INTO department (name) VALUE ("${department}")`);
    }
    
    addNewRole(role){
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUE ("${role.title}", "${role.salary}", "${role.all_departments}" )`);
    }
    
    addNewEmployee(employee){
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.first_name}", "${employee.last_name}", "${employee.roleID}", "${employee.managerChoice}")`);
    }
    
    updateEmployeeRole(roleId, employeeId){
        return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?",[roleId, employeeId]);
    }
}


module.exports = new DB(connection);
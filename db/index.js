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
    addNewDepartment(newDepartment){
        return this.connection.promise().query('INSERT INTO department SET ?', newDepartment);
    }
}


module.exports = new DB(connection);
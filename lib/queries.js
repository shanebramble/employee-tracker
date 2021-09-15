const db = require('../db/connection');
const cTable = require('console.table');

const viewDepartment = () => {
    const sql = `SELECT * FROM department`;

    db.query (sql, (err, rows) => {
        if (err){
            console.error(500);
        }
        console.table (rows);
    });
}

const viewRoles  = () => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(500);
        }
        console.table(rows);
    })
};


const viewEmployee = () => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(500);
        }
        console.table(rows);
    })
};



module.exports = {
    viewDepartment :viewDepartment,
    viewRoles: viewRoles,
    viewEmployee: viewEmployee
};
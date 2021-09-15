INSERT INTO department (name)
VALUE 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Marketing', 90000, 1),
    ('Advertising sales agent', 71000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Finance Manager',90000, 3),
    ('Law Firm Administrator', 100000, 4),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
    ('Contract Administrator', 130000, 4),
    ('Electrical Engineer', 90000, 2),
    ('Mechanical Engineer', 110000, 2),
    ('Aerospace Engineer', 120000, 2);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7),
    ('Peter', 'Wade', 1, NULL),
    ('Stephanie', 'Johnson', 2, 1),
    ('Mellanie', 'Monroe', 3, NULL),
    ('Tiffany', 'Jame', 4, 3),
    ('Sean', 'Bowe', 5, NULL),
    ('Adam', 'Silver', 6, 5),
    ('Micheal', 'Jordan', 7, NULL),
    ('Joseph', 'Thompson', 8, 7),
    ('Alicia', 'James', 1, NULL),
    ('Shane', 'Brown', 2, 1),
    ('Kenny', 'Hunt', 3, NULL),
    ('Brandon', 'Tonge', 4, 3),
    ('Mia', 'Lina', 5, NULL),
    ('Julz', 'Betty', 6, 5),
    ('Becky', 'Anderson', 7, NULL),
    ('Stephanie', 'Harris', 8, 7);


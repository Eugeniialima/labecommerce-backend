-- Active: 1675034930807@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
('u001', 'carlos01@email.com', '1sfs'),
('u002', 'maria02@email.com', '1fdf5'),
('u003', 'alexfofinho@email.com', '645df');

PRAGMA table_info('users');

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES 
('p001', 'O duque e eu', 37.90, 'book'),
('p002', 'Copo Stanley', 99, 'car'),
('p003', 'Notebook Dell', 3000, 'dog'),
('p004', 'Iphone 14 pro max', 9899.99, 'smartphone'),
('p005', 'Aplee watch', 3999.90, 'clothes');

PRAGMA table_info('products');

SELECT * FROM products;

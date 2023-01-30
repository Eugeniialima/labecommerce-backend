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
('p001', 'O duque e eu', 37.90, 'livro'),
('p002', 'Copo Stanley', 99, 'acessorios'),
('p003', 'Notebook Dell', 3000, 'eletrônico'),
('p004', 'Iphone 14 pro max', 9899.99, 'eletrônico'),
('p005', 'Aplee watch', 3999.90, 'eletrônico');

PRAGMA table_info('products');

SELECT * FROM products;

SELECT * FROM products
WHERE name like '%hone%';

SELECT * FROM products
WHERE id like '%p002';

DELETE FROM products
WHERE id = 'p003';

UPDATE users
SET 
id = 'u007',
email = 'novousuarioeditado',
password = 'digimon123'
WHERE id = 'u004';

SELECT * FROM users;

UPDATE products
SET 
id = 'p010',
name = 'Iphone 15 pro max',
price = 15000,
category = 'eletrônico'
WHERE id = 'p004';
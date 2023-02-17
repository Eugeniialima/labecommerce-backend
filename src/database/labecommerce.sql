-- Active: 1675946368465@@127.0.0.1@3306

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

CREATE TABLE purchases
(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTERGE NOT NULL, 
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL FOREIGN KEY (users_id) REFERENCES users(id) 
)
INSERT INTO users (id, email, password)
VALUES 
    ("u001", "maria01@gmail.com", "9834"),
    ("u002", "alex1@gmail.com", "9asd4"),
    ("u003", "lalalandia@gmail.com", "13.6548");

INSERT INTO users (id, email, password)
VALUES ("u004", "banananinha@gmail.com", "why235");

INSERT into purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
    ("pur001", 9000, 0, NULL, "u001"),
    ("pur002", 3090, 0, NULL, "u001"),
    ("pur003", 99, 0, NULL, "u002"),
    ("pur004", 9899.99, 0, NULL, "u002"),
    ("pur005", 301.90, 0, NULL, "u003"),
    ("pur006", 4136.80, 0, NULL, "u003"),
    ("pur007", 136.90, 0, NULL, "u004"),
    ("pur008", 16989.89, 0, NULL, "u004");

    SELECT * FROM purchases;

    UPDATE purchases
    SET 
        paid = 1,
        delivered_at = DATETIME('now')
    WHERE id = "pu001";

        SELECT * FROM purchases
    INNER JOIN users
    ON purchases.buyer_id = users.id
    where users.id = "u001";
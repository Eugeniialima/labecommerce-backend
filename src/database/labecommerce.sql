-- Active: 1676598676627@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DEFAULT (DATETIME('now','localtime')) NOT NULL
);
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);
CREATE TABLE purchases
(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTERGE NOT NULL, 
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL,
     FOREIGN KEY (buyer_id) REFERENCES users(id) 
);

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

INSERT INTO users (id, name, email, password)
VALUES
('u001', 'Carlos', 'carlos01@email.com', '1sfs'),
('u002', 'Maria', 'maria02@email.com', '1fdf5'),
('u003', 'Alex', 'alexfofinho@email.com', '645df');

INSERT INTO users (id, email, name,  password)
VALUES ('u004','Marcela', 'Marcelina@gmail.com', 'why235');

PRAGMA table_info('users');

SELECT * FROM users;


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

INSERT into purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
    ("pur001", 9000, 0, NULL, "u001"),
    ("pur002", 3099, 0, NULL, "u001"),
    ("pur003", 99, 0, NULL, "u002"),
    ("pur004", 9899.99, 0, NULL, "u002"),
    ("pur005", 3999.90, 0, NULL, "u003"),
    ("pur006", 4136.80, 0, NULL, "u003"),
    ("pur007", 136.90, 0, NULL, "u004"),
    ("pur008", 13889.98, 0, NULL, "u004");

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




INSERT INTO purchases_products 
VALUES
    ("pur001", "p003", 3),
    ("pur002", "p003", 1),   
    ("pur002", "p002", 1),
    ("pur003", "p002", 1),
    ("pur004", "p004", 1),
    ("pur005", "p005", 1),
    ("pur006", "p001", 1),
    ("pur006", "p002", 1),
    ("pur006", "p005", 1),
    ("pur007", "p001", 1),
    ("pur007", "p002", 1),
    ("pur008", "p004", 1),
    ("pur008", "p005", 1);

    SELECT * FROM purchases_products;

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;
-- Active: 1680531972623@@127.0.0.1@3306
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);


INSERT INTO users 
VALUES ("u001", "natalia@gmail.com", "natalia123"),
("u002", "daniel@gmail.com", "daniel123"),
("u003", "larissa@gmail.com", "larissa123");


CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products 
VALUES ("p001", "Colar Lua Cheia", 59.9, "Acessórios"),
("p002", "Nike Air Jordan", 299.9, "Roupas e Calçados"),
("p003", "Moletom Punisher", 69.9, "Roupas e Calçados"),
("p004", "Vinil Happier Than Ever", 199.9, "Eletrônicos"),
("p005", "Bucket Verde Limão", 39.9, "Roupas e Calçados");


-- GET ALL PRODUCTS

SELECT * from products;

-- GET ALL USERS

SELECT * from users;

-- SEARCH PRODUCT BY NAME 

SELECT * FROM products
WHERE name LIKE "%colar%";

-- CREATE USER

INSERT INTO users
VALUES ("u004", "michelle@gmail.com", "michelle123");

-- CREATE PRODUCT

INSERT INTO products
VALUES ("p006", "Pulseira perolada", 69.9, "Acessórios");

-- GET PRODUCT BY ID

SELECT * FROM products
WHERE id = "p001";

-- DELETE USER BY ID

DELETE FROM users
WHERE id = "u004";

-- DELETE PRODUCT BY ID

DELETE FROM products
WHERE id = "p005";

-- EDIT USER BY ID

UPDATE users
SET password = "larissa321"
WHERE id = "u003";

-- EDIT PRODUCT BY ID

UPDATE products
SET price = 189.9
WHERE id = "p004";

-- GET ALL USERS IN ASC ORDER BY EMAIL

SELECT * FROM users
ORDER BY email ASC;

-- GET ALL PRODUCTS IN ASC ORDER BY PRICE / LIMIT 20 OFFSET 1

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;

-- GET ALL PRODUCTS WHERE PRICE BETWEEN 100 - 300 IN ASC ORDER

SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL DEFAULT 0,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);


INSERT INTO purchases (id, total_price, buyer_id)
VALUES ("pu001", 199.9, "u001"),
("pu002", 349.9, "u001"),
("pu003", 69.9,"u002");

SELECT * FROM purchases;

UPDATE purchases
SET paid = 1
WHERE id = "pu002";

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "pu002";




SELECT 
users.id AS userId,
users.email,
purchases.id AS purchaseId,
purchases.total_price AS totalPrice,
(CASE WHEN purchases.paid = 0 THEN 'not paid' ELSE 'paid' END) AS paid,
purchases.delivered_at AS deliveredAt,
purchases.buyer_id AS buyerId
FROM users 
INNER JOIN purchases
ON users.id = purchases.buyer_id;

DROP TABLE purchases;
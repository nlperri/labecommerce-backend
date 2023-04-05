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

-- Active: 1680531972623@@127.0.0.1@3306
INSERT INTO users 
VALUES ("u001", "natalia@gmail.com", "natalia123"),
("u002", "daniel@gmail.com", "daniel123"),
("u003", "larissa@gmail.com", "larissa123");

INSERT INTO users
VALUES ("u004", "michelle@gmail.com", "michelle123");

INSERT INTO products 
VALUES ("p001", "Colar Lua Cheia", 59.9, "Acessórios"),
("p002", "Nike Air Jordan", 299.9, "Roupas e Calçados"),
("p003", "Moletom Punisher", 69.9, "Roupas e Calçados"),
("p004", "Vinil Happier Than Ever", 199.9, "Eletrônicos"),
("p005", "Bucket Verde Limão", 39.9, "Roupas e Calçados");

INSERT INTO products
VALUES ("p006", "Pulseira perolada", 69.9, "Acessórios");

INSERT INTO purchases (id, total_price, buyer_id)
VALUES ("pu001", 199.9, "u001"),
("pu002", 349.9, "u001"),
("pu003", 69.9,"u002");

INSERT INTO purchases_products 
VALUES ("pu001", "p001", 3),
("pu001", "p003", 1),
("pu002", "p002", 2);

INSERT INTO purchases_products
VALUES ("pu003", "p002", 1),
("pu003", "p001", 2);


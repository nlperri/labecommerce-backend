-- Active: 1680531972623@@127.0.0.1@3306
UPDATE users
SET password = "larissa321"
WHERE id = "u003";

UPDATE products
SET price = 189.9
WHERE id = "p004";

UPDATE purchases
SET paid = 1
WHERE id = "pu002";

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "pu002";

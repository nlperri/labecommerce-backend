
-- Active: 1680531972623@@127.0.0.1@3306

SELECT * from users;

SELECT * FROM users
ORDER BY email ASC;

SELECT * from products;

SELECT * FROM products
WHERE name LIKE "%colar%";

SELECT * FROM products
WHERE id = "p001";

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;

SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;

SELECT * FROM purchases;

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


SELECT 
purchases.buyer_id AS buyerId,
users.email AS userEmail,
products.id AS productId,
products.name AS productName,
products.price,
purchases_products.quantity,
products.category,
purchases.id AS purchaseId,
(CASE WHEN purchases.paid = 0 THEN 'not paid' ELSE 'paid' END) AS paid,
purchases.delivered_at AS deliveredAt,
purchases.total_price AS totalPrice
FROM purchases_products
INNER JOIN products
ON purchases.id = purchases_products.purchase_id
INNER JOIN purchases 
ON products.id = purchases_products.product_id
INNER JOIN users
ON purchases.buyer_id = users.id;


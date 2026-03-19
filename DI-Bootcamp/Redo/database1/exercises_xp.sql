-- ============================================================
-- Exercise 1: Items and Customers (public database)
-- ============================================================

-- 1. All items ordered by price (lowest to highest)
SELECT * FROM items
ORDER BY price ASC;

-- 2. Items with price >= 80, ordered by price (highest to lowest)
SELECT * FROM items
WHERE price >= 80
ORDER BY price DESC;

-- 3. First 3 customers alphabetically by first name (no primary key)
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

-- 4. All last names in reverse alphabetical order (Z-A)
SELECT last_name FROM customers
ORDER BY last_name DESC;


-- ============================================================
-- Exercise 2: dvdrental database
-- ============================================================

-- 1. Select all columns from the customer table
SELECT * FROM customer;

-- 2. First name and last name aliased as "full_name"
SELECT first_name || ' ' || last_name AS full_name
FROM customer;

-- 3. All unique create dates from the customer table
SELECT DISTINCT create_date FROM customer;

-- 4. All customer details ordered by first name descending
SELECT * FROM customer
ORDER BY first_name DESC;

-- 5. Film ID, title, description, release year, rental rate ordered by rental rate ascending
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;

-- 6. Address and phone number of customers in the Texas district
SELECT address, phone FROM address
WHERE district = 'Texas';

-- 7. All movie details where film_id is 15 or 150
SELECT * FROM film
WHERE film_id IN (15, 150);

-- 8. Film ID, title, description, length, rental rate for a specific movie
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Inception';

-- 9. Film ID, title, description, length, rental rate for movies starting with 'In'
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'In%';

-- 10. The 10 cheapest movies
SELECT * FROM film
ORDER BY rental_rate ASC
LIMIT 10;

-- 11. The next 10 cheapest movies (using OFFSET)
SELECT * FROM film
ORDER BY rental_rate ASC
LIMIT 10 OFFSET 10;

-- 11. Bonus: next 10 cheapest without LIMIT
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY rental_rate ASC) AS rn
    FROM film
) ranked
WHERE rn BETWEEN 11 AND 20;

-- 12. Join customer and payment tables: first name, last name, amount, date ordered by customer id
SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id ASC;

-- 13. Movies not in inventory
SELECT film_id, title FROM film
WHERE film_id NOT IN (
    SELECT DISTINCT film_id FROM inventory
);

-- 14. Which city is in which country
SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;

-- 15. Bonus: Customer id, names, amount and payment date ordered by staff member id
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id ASC;

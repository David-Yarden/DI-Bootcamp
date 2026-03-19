-- ============================================================
-- Exercise 1: DVD Rental
-- ============================================================

-- 1. Get all languages from the language table
SELECT * FROM language;

-- 2. All films joined with their languages (film title, description, language name)
SELECT f.title, f.description, l.name AS language
FROM film f
JOIN language l ON f.language_id = l.language_id;

-- 3. All languages even if no films exist in those languages
SELECT f.title, f.description, l.name AS language
FROM language l
LEFT JOIN film f ON f.language_id = l.language_id;

-- 4. Create new_film table and insert some films
CREATE TABLE new_film (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES
    ('Inception'),
    ('The Matrix'),
    ('Interstellar'),
    ('The Dark Knight');

-- 5. Create customer_review table
--    ON DELETE CASCADE ensures reviews are deleted when the film is deleted
CREATE TABLE customer_review (
    review_id   SERIAL PRIMARY KEY NOT NULL,
    film_id     INT REFERENCES new_film(id) ON DELETE CASCADE,
    language_id SMALLINT REFERENCES language(language_id),
    title       VARCHAR(255),
    score       SMALLINT CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT NOW()
);

-- 6. Add 2 movie reviews (linking to valid new_film and language rows)
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES
    (1, 1, 'Mind-bending masterpiece', 10, 'Inception is one of the greatest films ever made. The layers of dreams are incredible.'),
    (2, 1, 'Classic sci-fi', 9, 'The Matrix changed cinema forever. Still holds up today.');

-- 7. Delete a film that has a review — the review is automatically deleted due to ON DELETE CASCADE
DELETE FROM new_film WHERE name = 'Inception';
-- After running this, the review for film_id = 1 will also be gone from customer_review.
SELECT * FROM customer_review; -- verify: only the Matrix review remains


-- ============================================================
-- Exercise 2: DVD Rental
-- ============================================================

-- 1. Update the language of some films (using valid language_id values)
UPDATE film
SET language_id = 2
WHERE film_id IN (1, 2, 3);

-- 2. Foreign keys on the customer table
--    customer.store_id    → store(store_id)
--    customer.address_id  → address(address_id)
--    When inserting into customer, store_id and address_id must already exist
--    in their respective tables, otherwise PostgreSQL will throw a FK violation error.

-- 3. Drop the customer_review table
--    This is straightforward because no other table references customer_review,
--    so no extra checking is needed.
DROP TABLE customer_review;

-- 4. Find how many rentals have not been returned yet
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

-- 5. 30 most expensive outstanding movies (not yet returned)
SELECT f.title, f.rental_rate
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

-- 6a. Film about a sumo wrestler where one of the actors is Penelope Monroe
SELECT DISTINCT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo%'
  AND a.first_name = 'Penelope'
  AND a.last_name = 'Monroe';

-- 6b. Short documentary less than 1 hour, rated R
SELECT title, description, length, rating
FROM film
WHERE length < 60
  AND rating = 'R';

-- 6c. Film rented by Matthew Mahan, paid over $4.00,
--     returned between July 28 and August 1, 2005
SELECT DISTINCT f.title
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN payment p ON r.rental_id = p.rental_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND p.amount > 4.00
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

-- 6d. Film Matthew Mahan watched with "boat" in title/description,
--     and a high replacement cost
SELECT DISTINCT f.title, f.description, f.replacement_cost
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC;

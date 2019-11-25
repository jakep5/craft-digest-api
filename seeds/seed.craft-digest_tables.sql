BEGIN;

TRUNCATE
    "craft-digest_beers",
    "craft-digest_users"
    RESTART IDENTITY CASCADE;

INSERT INTO "craft-digest_users" (id, user_name, password)
VALUES
    (1, 'testuser', 'testpassword');

INSERT INTO "craft-digest_beers" (name, brewery_name, brewery_location, tasting_notes, abv, rating, user_id)
VALUES
    ('Spotted cow', 'New Glarus Brewing Company', 'New Glarus, WI', 'Wheat, citrus', 5, 4.5, 1);

COMMIT;
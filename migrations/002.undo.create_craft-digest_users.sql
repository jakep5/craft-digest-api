ALTER TABLE craft-digest_beers
    DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS craft-digest_users;
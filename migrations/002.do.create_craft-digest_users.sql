CREATE TABLE craft-digest_users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
);

ALTER TABLE craft-digest_beers (
    ADD COLUMN
         user_id INTEGER REFERENCES craft-digest_users(id)
         ON DELETE SET NULL;
);
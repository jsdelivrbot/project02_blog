CREATE TABLE member(
   id			SERIAL PRIMARY KEY,
   first_name	TEXT NOT NULL,
   last_name	TEXT NOT NULL
);

CREATE TABLE login(
   login_id    SERIAL  PRIMARY KEY,
   member_id   INTEGER REFERENCES member(id),
   username	   text    NOT NULL,
   password    text    NOT NULL 
);

INSERT INTO member(first_name, last_name) VALUES
 ('Bryan',  'Lopez');
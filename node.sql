CREATE TABLE member(
   id			SERIAL PRIMARY KEY,
   first_name	TEXT NOT NULL,
   last_name	TEXT NOT NULL
);

DROP TABLE IF EXISTS login;
CREATE TABLE login(
   login_id         SERIAL  PRIMARY KEY,
   member_id        INTEGER REFERENCES member(id),
   username	        text    NOT NULL,
   password_hash    text    NOT NULL 
);

INSERT INTO member(first_name, last_name) VALUES
 ('Bryan',  'Lopez');

 CREATE TABLE list (
   id 			 SERIAL   PRIMARY KEY,
   member_id     INTEGER  REFERENCES member(id),
   new_item      text     NOT NULL,
   finished_item text     NOT NULL
 	);

 CREATE TABLE comments (
   id 			  SERIAL PRIMARY KEY,
   comment_id     INTEGER   REFERENCES member(id),
   comments       TEXT      NOT NULL
 	);

INSERT INTO list (new_item, finished_item) VALUES ('New Computer', 'XP compatability with Firefox');
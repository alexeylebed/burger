USE irnpthad9oi1fxc2;

CREATE TABLE burgers(
id INTEGER(10) AUTO_INCREMENT, 
burger VARCHAR(30), 
devoured BOOLEAN,
PRIMARY KEY(id)
);

INSERT INTO burgers(burger, devoured)
VALUES("Bacon bluecheese burger" , FALSE);

INSERT INTO burgers(burger, devoured)
VALUES("Chicken burger" , FALSE);

UPDATE  burgers SET devoured = TRUE  WHERE id = 1;
SELECT *FROM burgers;
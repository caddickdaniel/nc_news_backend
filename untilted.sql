DROP DATABASE IF EXISTS hogwartsql;
CREATE DATABASE hogwartsql;
​
\c hogwartsql;
​
CREATE TABLE houses (
 house_id SERIAL PRIMARY KEY,
 house_name VARCHAR(40) NOT NULL,
 founder VARCHAR(40) NOT NULL,
 animal VARCHAR(40)
);
​
CREATE TABLE students (
 student_id SERIAL PRIMARY KEY,
 student_name VARCHAR(40) NOT NULL,
 house_id INT REFERENCES houses(house_id)
);
​
INSERT INTO houses
 (house_name, founder, animal)
VALUES
 ('Gryffindor', 'Godric Gryffindor', 'Lion'),
 ('Slytherin', 'Salazar Slytherin', 'Serpent'),
 ('Ravenclaw', 'Rowena Ravenclaw', 'Eagle'),
 ('Hufflepuff', 'Helga Hufflepuff', 'Badger');
​
INSERT INTO students
 (student_name, house_id)
VALUES
 ('Harry Potter', 1),
 ('Hermione Granger', 1),
 ('Ron Weasley', 1),
 ('Neville Longbottom', 1),
 ('Percy Weasley', 1),
 ('Ginevra Weasley', 1),
 ('George Weasley', 1),
 ('Fred Weasley', 1),
 ('Tom Riddle', 2),
 ('Draco Malfoy', 2),
 ('Bellatrix Lestrange', 2),
 ('Ella Wilkins', 2),
 ('Tom Riddle', 2),
 ('Spencer Whiddon', 2),
 ('Cho Chang', 3),
 ('Myrtle Warren', 3),
 ('Cordelia Gifford', 3),
 ('Sue Li', 3),
 ('Nigel Wroxton', 3),
 ('Cedric Diggory', 4),
 ('Hannah Abbott', 4),
 ('Susan Bones', 4),
 ('Satinder Singh', 4);

SELECT house_name, COUNT student_name AS student_count 
FROM houses 
JOIN students ON houses.house_id = students.house_id
GROUP BY house_name;

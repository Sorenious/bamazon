DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER auto_increment NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cards Against Humanity", "Games", 20.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Breath of the Wild", "Electronics", 60.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NES Classic", "Electronics", 150.00, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Teddy Ruxpin", "Toys", 25.00, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rainbow Dash", "Toys", 15.00, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gum", "Grocery", .99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Grocery", .59, 67);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Apparel", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Standing Desk", "Office", 170.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk Chair", "Office", 37.50, 15);
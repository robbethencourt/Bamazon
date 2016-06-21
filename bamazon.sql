-- CREATE DATABASE Bamazon;

USE Bamazon;

 CREATE TABLE Products (
   ItemID INTEGER(10) AUTO_INCREMENT NOT NULL,
   ProductName VARCHAR(30) NOT NULL,
   DepartmentName VARCHAR(30) NOT NULL,
   Price DECIMAL(10, 2),
   StockQuantity INTEGER(10),
   PRIMARY KEY(ItemID)
);

INSERT INTO Products 
	(ProductName, DepartmentName, Price, StockQuantity)
VALUES 
	("Friday the 13th Part 2", "VHS", 9.95, 39),
    ("A Nightmare on Elm Street 3", "VHS", 7.25, 67),
    ("Jaws", "Laserdisc", 23.50, 18),
    ("Jaws 3D", "Film", 765.00, 10),
    ("R.O.T.O.R.", "VHS", 12.95, 43),
    ("Horror Hospital", "VHS", 17.50, 75),
    ("Near Dark", "DVD", 14.99, 127),
    ("Night of the Comet", "Film", 875.00, 9),
    ("Sleepaway Camp", "VHS", 12.99, 49),
    ("Fright Night", "DVD", 14.99, 33);
    
-- DROP TABLE Products;
    
SELECT * from Products;

UPDATE Products SET Price = 12.50 WHERE ItemID = 11;

CREATE TABLE Departments (
	DepartmentID INTEGER(10) AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(30) NOT NULL,
    OverHeadCosts DECIMAL(10, 2),
    TotalSales DECIMAL(10, 2),
    PRIMARY KEY(DepartmentID)
);

INSERT INTO Departments
	(DepartmentName, OverHeadCosts, TotalSales)
VALUES
	("VHS", 3500.00, 0.00),
    ("Laserdisc", 180.00, 0.00),
    ("Film", 1900.00, 0.00),
    ("DVD", 350.00, 0.00);
    
DROP TABLE Departments;
    
SELECT * from Departments;

DELETE from Departments WHERE DepartmentName is NULL;
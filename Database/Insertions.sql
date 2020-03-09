USE Supermarket_DB

GO

INSERT INTO Addresses(City,Street,Number)
	VALUES('Yerevan','Isahakyan','3'),
		  ('Yerevan','Tumanyan','6'),
		  ('Yerevan','Teryan','9'),
		  ('Yerevan','Aleq Manukyan','6'),
		  ('Yerevan','Moskovyan','1'),
		  ('Yerevan','Komitas','6'),
		  ('Yerevan','Argishti','1'),
		  ('Yerevan','Arshakunyats','6'),
		  ('Yerevan','Charents','7'),
		  ('Gyumri','Abovyan','9'),
		  ('Yerevan','Saryan','4'),
		  ('Yerevan','Mashtots','7'),
		  ('Yerevan','Zaqyan','1'),
		  ('Yerevan','Qochar','7'),
		  ('Yerevan','Vagharshyan','5'),
		  ('Yerevan','Kilikia','1')
		  		
GO
	
INSERT INTO Branches(Branch_Name,Address_ID)
	VALUES('Branch of Navy',1),
		  ('Branch of Gold',2),
		  ('Branch of N Oxford',6),
		  ('Branch of Corsa Ave.',7)
		
GO

INSERT INTO Users(Username,Password,Email,User_Rank)
  VALUES('Poghos Petrosyan','123321','poghos1@example.com','customer'),
		('Samvel Poghosyan','dolphin','samvel2@example.com','delivery-worker'),
		('Petros Karapetyan','doors','petros3@example.com','cashier'),
		('Levon Petrosyan','bigmoney','levon4@example.com','manager'),
		('Arman Hakobyan','shania','arman5@example.com','customer'),
		('Hakob Gevorgyan','lawman','hakob6@example.com','delivery-worker'),
		('Armen Hakobyan','whiskers','armen7@example.com','cashier'),
		('Gevorg Sargsyan','morrison','gevorg8@example.com','manager'),
		('Mariam Hovhannisyan','teacher','mariam9@example.com','customer'),
		('Armine Movsisyan','maxime','armine10@example.com','delivery-worker'),	
		('Karine Poghosyan','barney','karine11@example.com','cashier'),
		('Arev Muradyan','barney','arev12@example.com','manager'),
		(null,null,null,'customer'),
		('Anna Khachatryan', '123456', 'anna13@example.com','delivery-worker')
				
GO 


INSERT INTO Customers(User_Id,Name,Phone_Number,Address_ID)
	VALUES (1,'Poghos Petrosyan','+374 99 999 999',9),
		   (5,'Armen Hakobyan','+374 88 888 888',10),
		   (9,'Mariam Hovhannisyan','+374 77 777 777',11),
		   (13,null,'+374 66 666 666',null)

GO	

INSERT INTO Transactions(Amount,Status,Payment_Type,Date,Branch_name)
	Values (1872,'Completed','cash','2020-03-09 10:00:00','Branch of Corsa Ave.'),
		   (320,'Canceled','card','2020-02-09 11:00:00','Branch of Gold'),
		   (100,'Completed','cash','2020-01-09 10:35:00','Branch of Corsa Ave.'),
		   (27,'Completed','card','2020-01-09 10:25:00','Branch of N Oxford'),
		   (63,'Canceled','cash','2020-02-10 10:15:00','Branch of Navy'),
		   (150,'Completed','cash','2020-01-11 11:35:00','Branch of Gold'),
		   (500,'Completed','cash','2020-03-09 10:45:00','Branch of Gold'),
		   (465,'Canceled','card','2020-02-09 11:45:00','Branch of N Oxford'),
		   (100,'Completed','cash','2020-01-09 11:31:00','Branch of N Oxford'),
		   (27,'Completed','card','2020-01-09 10:22:00','Branch of Corsa Ave.'),
		   (63,'Canceled','cash','2020-01-10 11:11:00',null),
		   (150,'Completed','cash','2020-01-11 12:35:00',null) 
GO

INSERT INTO Workers(Worker_Id,Name,Salary,Rank)
	VALUES (2,'Samvel Poghosyan',800,'delivery-worker'),
		   (3,'Petros Karapetyan',2000,'cashier'),
		   (4,'Levon Petrosyan',1800,'manager'),
		   (6,'Hakob Gevorgyan',900,'delivery-worker'),
		   (7,'Armen Hakobyan',1000,'cashier'),
		   (8,'Gevorg Sargsyan',900,'manager'),
		   (10,'Armine Movsisyan',900,'delivery-worker'),
		   (11,'Karine Poghosyan',900,'cashier'),
		   (12,'Arev Muradyan',900,'manager'),
		   (14, 'Anna KHachatryan',900, 'delivery-worker')
		 
GO

INSERT INTO Delivery_Person(Delivery_Id,Social_ID,Address_ID)
	VALUES (2,257844444215,1),
		   (6,15787777742,2),
		   (10,111111111112,3),
		   (14,121212121212,5)
GO

INSERT INTO Orders(Order_Id,Customer_Id,Delivery_Id,Order_Date,Order_Confirm_Date,Planned_Delivery_Receive_Date,Address_ID,Status)
VALUES (12,1,2,'2020-03-08 12:35:29','2020-03-08 13:00:00','2020-03-08 18:30:00',9,'confirmed'),
		   (11,1,2,'2020-03-15 11:16:52','2020-03-05 12:00:00','2020-03-16 17:00:00',10, 'canceled')

GO

INSERT INTO Suppliers(Company_Name)
	VALUES ('MexiFoods'),
		   ('Health & Wellness'),
		   ('Eatco'),
		   ('Meal Factory'),
		   ('Southern Wine & Spirits of California'),
		   ('Freshqo'),
		   ('Marco')
		   
GO

INSERT INTO Categories(Parent_Category,Category_Name)
	VALUES (null,'Drink'),
	       ('Drink','Alcohol'),
	       ('Alcohol','Brandy'),
	       ('Alcohol','Vodka'),
	       ('Alcohol','Wine'),
	       ('Alcohol','alcohol-free'),
	       ('alcohol-free','Water'),
	       (null,'Frozen Foods'),
	       (null,'Bread & Bakery'),
	       (null,'Coffee')
	       
GO


INSERT INTO Products(Barcode,Cost_Price,Selling_Price,Supplier_Name,Name,Category_Name)
	VALUES ('485326587',200,219,'Southern Wine & Spirits of California','Merlot','Wine'),
		   ('485632574',301,329,'Southern Wine & Spirits of California','Chardonnay','Wine'),
		   ('58743565',180,199,'Southern Wine & Spirits of California','Van Ryns. Landy','Brandy'),
		   ('5453454',250,299,'Southern Wine & Spirits of California','Meukow Cognac. Jacquins','Brandy'),
		   ('6544788',1,1.5,'Health & Wellness','Sourdough','Bread & Bakery'),
		   ('545475874',0.9,1.2,'Health & Wellness','Whole-Wheat Bread','Bread & Bakery'),
		   ('68756785',1.1,1.5,'Health & Wellness','Pita Bread','Bread & Bakery'),
		   ('5474357',2,2.6,'Marco','Espresso','Coffee'),
		   ('5456364',1.6,2.1,'Marco','Mochaccino','Coffee'),
		   ('6564545',1.6,2.1,'Marco','Irish Coffee','Coffee')
		   
GO

INSERT INTO Warehouses(Warehouse_Name,Capacity,Address_ID)
	VALUES ('Warehouse of Elgin St',100,14),
		   ('Warehouse of Corsa Ave.',100,15),
		   ('Warehouse of  Gold st.',100,16)

GO

INSERT INTO Workers_Branches(Branch_Name,Worker_Id,Schedule)
	VALUES ('Branch of Navy',3,'MAMAMO0'), --M - Morning shift
		   ('Branch of Gold',4,'MAMAMO0'), --A - Aternoon shift
		   ('Branch of N Oxford',11,'MAMAMO0'), --O - Open day
		   ('Branch of Corsa Ave.',12,'OOMAMAM')		   
		   
GO

INSERT INTO Branches_Warehouses(Warehouse_Name,Branch_Name)
	VALUES ('Warehouse of Elgin St','Branch of Navy'),
		   ('Warehouse of Corsa Ave.','Branch of Navy'),
		   ('Warehouse of  Gold st.','Branch of Navy'),
		   ('Warehouse of Elgin St','Branch of Gold'),
		   ('Warehouse of Corsa Ave.','Branch of Gold'),
		   ('Warehouse of  Gold st.','Branch of Gold'),
		   ('Warehouse of Elgin St','Branch of N Oxford'),
		   ('Warehouse of Corsa Ave.','Branch of N Oxford'),
		   ('Warehouse of Elgin St','Branch of Corsa Ave.'),
		   ('Warehouse of  Gold st.','Branch of Corsa Ave.')	

GO

INSERT INTO Products_input_date(Product_code,Warehouse_name,Date_,Quantity)
	VALUES ('485326587','Warehouse of Elgin St','2020-03-09 10:00:00',20),
		   ('485632574','Warehouse of Elgin St','2020-03-11 11:00:00',15),
		   ('58743565','Warehouse of Elgin St','2020-03-10 15:00:00',18),
		   ('5453454','Warehouse of Elgin St','2020-03-10 10:30:00',25),
		   ('5456364','Warehouse of Elgin St','2020-03-12 14:15:00',90),
		   ('5456364','Warehouse of Corsa Ave.','2020-03-12 14:15:00',110),
		   ('68756785','Warehouse of Corsa Ave.','2020-03-15 15:15:00',75),
		   ('5456364','Warehouse of Corsa Ave.','2020-03-17 15:15:00',53),
		   ('5453454','Warehouse of Corsa Ave.','2020-03-15 16:40:00',20),
		   ('485632574','Warehouse of Corsa Ave.','2020-03-13 13:20:00',13),
		   ('485632574','Warehouse of  Gold st.','2020-03-14 17:15:00',13),
		   ('6564545','Warehouse of  Gold st.','2020-03-13 16:15:00',50),
		   ('5474357','Warehouse of  Gold st.','2020-03-22 10:50:00',70)
		   
GO	

INSERT INTO Products_in_Branches(Product_code,Branch_name,[Count])
	VALUES ('485326587','Branch of Navy',15),
		   ('485632574','Branch of Navy',11),
		   ('58743565','Branch of Navy',13),
		   ('5453454','Branch of Navy',19),
		   ('5456364','Branch of Navy',80),
		   ('5456364','Branch of Gold',100),
		   ('68756785','Branch of Gold',66),
		   ('5474357','Branch of Gold',47),
		   ('5453454','Branch of N Oxford',18),
		   ('485632574','Branch of N Oxford',9),
		   ('5474357','Branch of N Oxford',7),
		   ('68756785','Branch of Corsa Ave.',40),
		   ('485632574','Branch of Corsa Ave.',8),
		   ('545475874','Branch of Corsa Ave.',20),
		   ('6544788','Branch of Corsa Ave.',45)
		   
GO


INSERT INTO Transaction_Products(TransactionID,ProductsCode,[Count])
	VALUES (1,'485326587',1),
		   (1,'485632574',2),
		   (1,'58743565',5),
		   (2,'5453454',1),
		   (2,'5456364',10),
		   (3,'5456364',2),
		   (3,'68756785',6),
		   (3,'5474357',8),
		   (4,'5453454',2),
		   (5,'485632574',1),
		   (5,'5474357',1),
		   (5,'68756785',5),
		   (6,'68756785',2),
		   (6,'545475874',6),
		   (6,'6544788',2),
		   (7,'485326587',1),
		   (7,'5453454',10),
		   (7,'58743565',5),
		   (8,'5453454',1),
		   (8,'5456364',10),
		   (9,'5456364',2),
		   (9,'68756785',6),
		   (9,'5474357',8),
		   (10,'5453454',2),
		   (10,'485632574',1),
		   (11,'5474357',1),
		   (11,'68756785',5),
		   (12,'485632574',2),
		   (12,'545475874',6),
		   (12,'6544788',2)
GO

INSERT INTO Terminals(Id,Branch_Name)
	VALUES(1,'Branch of Navy'),
		  (2,'Branch of Navy'),
		  (3,'Branch of Navy'),
		  (1,'Branch of Gold'),
		  (2,'Branch of Gold'),
		  (1,'Branch of N Oxford'),
		  (2,'Branch of N Oxford'),
		  (3,'Branch of N Oxford'),
		  (1,'Branch of Corsa Ave.'),
		  (2,'Branch of Corsa Ave.'),
		  (3,'Branch of Corsa Ave.'),
		  (4,'Branch of Corsa Ave.')

GO

INSERT INTO Cashiers(Cashier_Id,Name,Salary,[Rank],Amount)
	VALUES (3,'Petros Karapetyan',800,'cashier',10000),
		   (7,'Armen Hakobyan',800,'cashier',10000)
		 
GO

INSERT INTO Suppliers_Warehouses(Supplier_name,Warehouse_name,[Count],Product_take_out_date,Product_receiving_date)
	VALUES ('MexiFoods','Warehouse of Elgin St',50,'2020-03-08 12:00:00','2020-03-12 09:00:00'),
           ('Health & Wellness','Warehouse of Elgin St',90,'2020-03-08 16:00:00','2020-03-10 09:00:00'),
           ('Southern Wine & Spirits of California','Warehouse of Elgin St',44,'2020-03-09 10:00:00','2020-03-10 15:00:00'),
           ('Meal Factory','Warehouse of Elgin St',150,'2020-03-09 10:00:00','2020-03-10 15:00:00'),
           ('Marco','Warehouse of Corsa Ave.',300,'2020-03-08 12:00:00','2020-03-15 09:00:00'),
           ('Health & Wellness','Warehouse of Corsa Ave.',90,'2020-03-08 16:00:00','2020-03-16 11:00:00'),
           ('Eatco','Warehouse of Corsa Ave.',44,'2020-03-09 10:00:00','2020-03-10 15:00:00'),
		   ('Freshqo','Warehouse of Corsa Ave.',150,'2020-03-09 10:00:00','2020-03-10 15:00:00'),
           ('Health & Wellness','Warehouse of  Gold st.',88,'2020-03-08 16:00:00','2020-03-16 11:00:00'),
           ('Eatco','Warehouse of  Gold st.',56,'2020-03-09 10:00:00','2020-03-10 15:00:00'),
           ('Marco','Warehouse of  Gold st.',200,'2020-03-09 10:00:00','2020-03-10 15:00:00')
         
 GO


INSERT INTO Orders_Products(Order_Id, Product_code, Quantity)
VALUES (11,'485326587',5),
	  (11, '485632574',1),
	  (12, '5453454',2),
	  (12, '545475874',2)

GO

INSERT INTO OrderProducts_Branches(Order_Id,Branch_Name,Product_code,Quantity)
VALUES(11,'Branch of Corsa Ave.','485326587',2),
	  (11,'Branch of Gold','485632574',1),
	  (12,'Branch of Navy','5453454',3),
	  (12,'Branch of N Oxford','5453454',2),
	  (12,'Branch of N Oxford','545475874',3)

GO

INSERT INTO Orders_DeliveryWorkers(Order_Id, Id1,Id2,Id3,Accepted_Id)
VALUES (11,2,6,10,2),
	   (12,2,6,10,null)
GO



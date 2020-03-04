USE Supermarket_DB

GO

INSERT INTO Addresses(City,Street,Number)
	VALUES('New York','Navy st.','39531'),
		  ('New York','Gold st.','65874'),
		  ('New York','Henry st.','95471'),
		  ('New York','Willow st.','6985'),
		  ('New York','Plymounth st.','1247'),
		  ('New York','N Oxford st.','6985'),
		  ('New York','Corsa Ave.','12574'),
		  ('New York','Waring Ave','6985'),
		  ('San Jose',' Samaritan Dr','7091'),
		  ('Half Moon Bay','Poplar Dr','917'),
		  ('Texas','Valwood Pkwy','4419'),
		  ('Texas','Pecan Acres','7590'),
		  ('New York','Spring St','1314'),
		  ('Ottawa','Elgin St','7276'),
		  ('New York','Corsa Ave.','57845'),
		  ('New York','Gold st.','124')
		  		
GO
	
INSERT INTO Branches(Branch_Name,Address_ID)
	VALUES('Branch of Navy',1),
		  ('Branch of Gold',2),
		  ('Branch of N Oxford',6),
		  ('Branch of Corsa Ave.',7)
		
		
GO

INSERT INTO Users(Username,Password,Email)
  VALUES('Serenity_Morris','123321','serenity.morris@example.com'),
		('Addison_Chambers','dolphin','addison.chambers@example.com'),
		('Joel_Hale','doors','joel.hale@example.com'),
		('Jennifer_Perry','bigmoney','jennifer.perry@example.com'),
		('Nevaeh_Bennett','shania','nevaeh.bennett@example.com'),
		('Lily_Crawford','lawman','lily.crawford@example.com'),
		('Zoe_Hart','whiskers','zoe.hart@example.com'),
		('Alice_Hoffman','morrison','alice.hoffman@example.com'),
		('Johnni_Cook','teacher','johnni.cook@example.com'),
		('Harper_Watkins','maxime','harper.watkins@example.com'),	
		('Duane_Campbell','barney','duane.campbell@example.com')
				
GO 

INSERT INTO Customers(User_Id,Name,Phone_Number,Address_ID)
	VALUES (1,'Serenity Morris','(169)-942-1771',9),
		   (2,'Addison Chambers','(576)-032-7026',10),
		   (3,'Joel Hale','(139)-183-2094',11),
		   (4,'Jennifer Perry','(114)-916-3858',12),
		   (5,'Nevaeh Bennett','(362)-866-1619',13)

GO	

INSERT INTO Transactions(Amount,Status,Payment_Type,Branch_name)
	Values (500,'Completed','cash','Branch of Navy'),
		   (465,'Canceled','card','Branch of Navy'),
		   (100,'Completed','cash','Branch of N Oxford'),
		   (27,'Completed','card','Branch of Corsa Ave.'),
		   (63,'Canceled','cash','Branch of Corsa Ave.'),
		   (150,'Completed','cash','Branch of Gold')	 
		   

GO

INSERT INTO Workers(Worker_Id,Name,Salary,Rank)
	VALUES (6,'Lily Crawford',800,'Cashier'),
		   (7,'Zoe Hart',2000,'Branch Manager'),
		   (8,'Alice Hoffman',1800,'Warehouse Manager'),
		   (9,'Johnni Cook',900,'Shipper'),
		   (10,'Harper Watkins',1000,'Cashier'),
		   (11,'Duane Campbell',900,'Shipper')
		 
GO

INSERT INTO Delivery_Person(Delivery_Id,Social_ID)
	VALUES (9,2578413586215),
		   (11,1578965478542)
		 
GO

INSERT INTO Orders(Order_Id,Customer_Id,Delivery_Id,Order_Date,Order_Confirm_Date,Planned_Delivery_Receive_Date,Address_ID)
	VALUES (1,1,9,'2020-03-08 12:35:29','2020-03-08 13:00:00','2020-03-08 18:30:00',9),
		   (3,2,11,'2020-03-15 11:16:52','2020-03-05 12:00:00','2020-03-16 17:00:00',10)

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
	VALUES ('Branch of Navy',6,'MAMAMO0'), --M - Morning shift
		   ('Branch of Navy',7,'MAMAMO0'), --A - Aternoon shift
		   ('Branch of Navy',9,'MAMAMO0'), --O - Open day
		   ('Branch of Gold',10,'OOMAMAM')		   
		   
GO

INSERT INTO Workers_Warehouses(Warehouse_Name,Worker_Id,Schedule)
	VALUES ('Warehouse of Elgin St',8,'MAMAMO0'),
	       ('Warehouse of  Gold st.',11,'MAMOMOA')		

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
		   (6,'485632574',2),
		   (6,'545475874',6),
		   (6,'6544788',2)
		   
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
	VALUES (6,'Lily Crawford',800,'Cashier',10000),
		   (10,'Harper Watkins',800,'Cashier',15000)
		 
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
 
INSERT INTO TCT(Transaction_Id,Terminal_Id,Branch_Name,Cashier_Id)
	VALUES (1,1,'Branch of Navy',6),
		   (2,1,'Branch of Navy',6),
		   (3,2,'Branch of Gold',10),
		   (4,2,'Branch of Gold',10),
		   (5,2,'Branch of Gold',10)
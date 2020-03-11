CREATE PROC LOGIN
AS
	SELECT Username, Password FROM Users 
	WHERE Id IN(
		SELECT Worker_Id FROM Workers 
		WHERE Rank = 'Cashier' or 
			Rank = 'Branch Manager' or 
			Rank = 'Warehouse Manager')

GO


CREATE PROC GetProducts 
AS
	SELECT Barcode, Cost_Price, Selling_Price, Supplier_Name, Name, Category_Name, Branch_name, Count
	FROM Products as P join Products_in_Branches as PiB on P.Barcode = PiB.Product_code 

GO


CREATE PROC PutProducts
	@Product_code char(14),
	@Branch_name varchar(50),
	@Count int
AS
	Update Products_in_Branches SET
	Count = Count - @Count
	WHERE TRIM(Product_code) = @Product_code and Branch_name = @Branch_name

GO


CREATE PROC GetCashier
	@Username varchar(50) = null
AS
	SELECT Worker_Id, W.Name, W.Rank, U.Email
	FROM Users AS U join Workers AS W on U.Id = W.Worker_Id
	Where Username = isnull(@Username,Username) and 
		(Rank = 'Cashier' or Rank = 'Branch Manager' or Rank = 'Warehouse Manager')

GO


CREATE PROC GetBranches
	@Branch_Name VARCHAR(50) = null
AS
	SELECT Branch_Name FROM Branches
	WHERE Branch_Name = ISNULL(@Branch_Name, Branch_Name)

GO


CREATE PROC GetWarehouses
	@Warehouse_Name VARCHAR(50) = null
AS
	SELECT Warehouse_Name FROM Warehouses
	WHERE Warehouse_Name = ISNULL(@Warehouse_Name, Warehouse_Name)

GO


CREATE PROC GetTransactions
	@Id BIGINT = null
AS
	SELECT * FROM Transactions
	WHERE Id = ISNULL(@Id, Id)

GO


CREATE PROC PostTransaction
	@Amount MONEY,
	@Status CHAR(10),
	@Payment_Type CHAR(10),
	@Branch_name VARCHAR(50)
AS
	INSERT INTO Transactions (Amount, Status, Payment_Type, Branch_name)
	VALUES (@Amount, @Status, @Payment_Type, @Branch_name)
	SELECT SCOPE_IDENTITY()

GO


CREATE PROC PutTransaction
	@Id BIGINT,
	@Amount MONEY, 
	@Status CHAR(10),
	@Payment_Type CHAR(10),
	@Branch_name VARCHAR(50),
	@Date DATETIME
AS 
	UPDATE Transactions SET
		Amount = Amount + @Amount,
		Status = @Status,
		Payment_Type = @Payment_Type,
		Branch_name = @Branch_name,
		Date = @Date
			WHERE Id = @Id

GO


CREATE PROC DeleteTransaction 
    @Id BIGINT
AS 
	DELETE FROM Transactions WHERE  Id = @Id

GO


CREATE PROC PostProductInTransaction
	@TransactionID BIGINT,
	@ProductsCode CHAR(14),
    @Count INT
AS
	INSERT INTO Transaction_Products (TransactionID, ProductsCode, Count)
	VALUES (@TransactionID, @ProductsCode, @Count)

GO


CREATE PROCEDURE UpdateProductInBranch
	@Product_code CHAR(14),
	@Branch_name VARCHAR(50),
	@Count INT 
AS
BEGIN
	UPDATE Products_in_Branches SET
		Count = @Count
			WHERE TRIM(Product_code) = @Product_code AND TRIM(Branch_name) = @Branch_name
END
GO


CREATE PROCEDURE UpdateProductInWarehouse
	@Product_code CHAR(14),
	@Warehouse_name VARCHAR(50),
	@Quantity INT 
AS
BEGIN
	UPDATE Products_input_date SET
		Quantity = @Quantity
			WHERE TRIM(Product_code) = @Product_code AND TRIM(Warehouse_name) = @Warehouse_name
END
GO


CREATE PROCEDURE DeleteFromBranches
	@Product_code CHAR(14),
	@Branch_name VARCHAR(50)
AS 
BEGIN
	DELETE FROM Products_in_Branches
	WHERE Product_code = @Product_code AND Branch_name = @Branch_name
END
GO


CREATE PROCEDURE DeleteFromWarehouses
	@Product_code CHAR(14),
	@Warehouse_name VARCHAR(50)
AS 
BEGIN
	DELETE FROM Products_input_date
	WHERE Product_code = @Product_code AND Warehouse_name = @Warehouse_name
END
GO


CREATE PROCEDURE InsertInBranch
	@Product_code CHAR(14),
	@Branch_name VARCHAR(50),
	@Count INT
AS
BEGIN
	INSERT INTO Products_in_Branches (Product_code, Branch_name, Count)
	VALUES (@Product_code, @Branch_name, @Count)
END
GO


CREATE PROCEDURE InsertInWarehouse
	@Product_code CHAR(14),
	@Warehouse_name VARCHAR(50),
	@Quantity INT,
	@Date DATETIME
AS
BEGIN
	INSERT INTO Products_input_date(Product_code, Warehouse_name, Quantity,Date_)
	VALUES (@Product_code, @Warehouse_name, @Quantity, @Date)
END
GO


CREATE PROC SearchInBranch
	@Barcode char(14) = null,
	@Name varchar(50) = null,
	@Category_Name varchar(50) = null,
	@Supplier_Name varchar(50) = null 
AS
	SELECT Barcode,Cost_Price,Selling_Price,Supplier_Name,Name,Category_Name,Branch_name,Count 
	FROM Products AS P join Products_in_Branches as pib on P.Barcode = Pib.Product_code
	WHERE
		Trim(Barcode) = isnull(@Barcode, Barcode) and
		Trim(Name) = isnull(@Name, Name) and
		Trim(Category_Name) = isnull(@Category_Name, Category_Name) and
		Trim(Supplier_Name) = isnull(@Supplier_Name, Supplier_Name)

GO


CREATE PROC SearchInWarehouse
	@Barcode char(14) = null,
	@Name varchar(50) = null,
	@Category_Name varchar(50) = null,
	@Supplier_Name varchar(50) = null 
AS
	SELECT Barcode,Cost_Price,Selling_Price,Supplier_Name,Name,Category_Name,Warehouse_name,Quantity 
	FROM Products AS P join Products_input_date as pid on P.Barcode = Pid.Product_code
	WHERE
		Barcode = isnull(@Barcode, Barcode) and
		Name = isnull(@Name, Name) and
		Category_Name = isnull(@Category_Name, Category_Name) and
		Supplier_Name = isnull(@Supplier_Name, Supplier_Name)

GO


CREATE PROCEDURE PutCategory
	@Parent_Category VARCHAR(50),
	@NewCategoryName VARCHAR(50),
	@OldCategoryName VARCHAR(50)	
AS
BEGIN
	Update Categories SET
		Parent_Category = @Parent_Category,
		Category_Name = @NewCategoryName
			WHERE Category_Name = @OldCategoryName
END
GO


CREATE PROCEDURE GetCategories
	@Category_Name VARCHAR(50),
	@Parent_Category VARCHAR(50)
AS
	SELECT * FROM Categories
	WHERE Category_Name = ISNULL(@Category_Name, Category_Name) and
		  Parent_Category = ISNULL(@Parent_Category, Parent_Category)
GO


CREATE PROCEDURE PostCategory
	@Category_Name VARCHAR(50),
	@Parent_Category VARCHAR(50)
AS 
	INSERT INTO Categories(Parent_Category,Category_Name)
	VALUES (@Parent_Category, @Category_Name)
	SELECT SCOPE_IDENTITY()
GO


CREATE PROCEDURE DeleteCategory
	@Category_Name VARCHAR(50)
AS 
	DELETE FROM Categories WHERE Category_Name = @Category_Name
GO


CREATE PROCEDURE GetSuppliers
	@Company_Name VARCHAR(50)
AS 
	SELECT * FROM Suppliers
	WHERE Company_Name = ISNULL(@Company_Name, Company_Name)
GO


CREATE PROCEDURE PostSupplier
	@Company_Name VARCHAR(50)
AS
	INSERT INTO Suppliers (Company_Name)
	VALUES (@Company_Name)
	SELECT SCOPE_IDENTITY()
GO


CREATE PROCEDURE PutSupplier
	@Company_Name VARCHAR(50),
	@New_Name VARCHAR(50)
AS
	UPDATE Suppliers SET
		Company_Name = @New_Name
			WHERE Company_Name = @Company_Name
GO


CREATE PROC DeleteSupplier
	@Company_Name VARCHAR(50)
AS
	DELETE FROM Suppliers WHERE Company_Name = @Company_Name
GO
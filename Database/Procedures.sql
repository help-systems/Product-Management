-----------------------TERMINAL------------------------
-------------------------------------------------------
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
	@Branch_name VARCHAR(50) 
AS 
	UPDATE Transactions SET
		Amount = @Amount,
		Status = @Status,
		Payment_Type = @Payment_Type,
		Branch_name = @Branch_name
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

---------------------------------------------------------------------
-------------------------PRODUCT MANAGEMENT--------------------------
---------------------------------------------------------------------


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
CREATE PROC GetProducts
AS
	SELECT * FROM Products
GO

CREATE PROC GetProductById
	@Barcode char(14)
AS
	SELECT * FROM Products WHERE Barcode = @Barcode
GO

CREATE PROC PostProduct
	@Barcode char(14),
	@Cost_Price money,
	@Selling_Price money,
	@Supplier_Name varchar(50),
	@Name varchar(50),
	@Category_Name varchar(50)
AS
	INSERT INTO Products(Barcode, Cost_Price, Selling_Price, Supplier_Name, Name, Category_Name)
	VALUES (@Barcode, @Cost_Price, @Selling_Price, @Supplier_Name, @Name, @Category_Name)
GO

CREATE PROC PutProduct
	@Barcode char(14),
	@Cost_Price money,
	@Selling_Price money,
	@Supplier_Name varchar(50),
	@Name varchar(50),
	@Category_Name varchar(50)
AS
BEGIN
	IF EXISTS (SELECT Barcode FROM Products WHERE Barcode = @Barcode)
		update Products set
			Name = @Name,
			Barcode = @Barcode, 
			Cost_Price = @Cost_Price, 
			Selling_Price = @Selling_Price,
			Supplier_Name = @Supplier_Name,
			Category_Name = @Category_Name 
				WHERE Barcode = @Barcode 

	ELSE
		PRINT 'Barcode ' + CAST(@Barcode AS Varchar(50)) + ' Does Not Exist'
END
GO

CREATE PROC DeleteProduct
	@Barcode char(14)
AS
	DELETE FROM Products WHERE Barcode = @Barcode 
GO

EXEC GetProductById 3

Drop proc GetProducts
Drop proc GetProductById
Drop proc PostProduct
Drop proc PutProduct
Drop proc DeleteProduct


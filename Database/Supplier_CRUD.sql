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
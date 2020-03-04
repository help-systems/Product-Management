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
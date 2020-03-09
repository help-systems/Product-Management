CREATE DATABASE Supermarket_DB    
ON							  
(
	NAME = 'Supermarket_DB',            
	FILENAME = 'D:\Supermarket_DB.mdf', 
	SIZE = 100MB,                    
	MAXSIZE = 1000MB,				
	FILEGROWTH = 10MB				
)
LOG ON						  
( 
	NAME = 'LogSupermarket_DB',            
	FILENAME = 'D:\LogSupermarket_DB.ldf', 
	SIZE = 10MB,                        
	MAXSIZE = 100MB,                    
	FILEGROWTH = 10MB                   
)   

GO

USE Supermarket_DB 
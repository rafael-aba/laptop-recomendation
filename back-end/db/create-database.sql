CREATE DATABASE [todolist-db]
GO

USE [todolist-db];
GO

CREATE TABLE elements (
	Id INT NOT NULL IDENTITY,
	Text TEXT NOT NULL,
	Completed BIT NOT NULL,
	Deleted BIT NOT NULL,
	PRIMARY KEY (Id)
);
GO

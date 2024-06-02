IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'todolist-db')
	CREATE DATABASE [todolist-db]
GO

USE [todolist-db];
GO

IF NOT EXISTS (select * from sysobjects where name='entries' and xtype='U')
	CREATE TABLE entries (
	Id INT NOT NULL IDENTITY,
	Text TEXT NOT NULL,
	Completed BIT NOT NULL,
	Deleted BIT NOT NULL,
	CreatedAt DATETIME NOT NULL,
	CompletedAt DATETIME,
	DeletedAt DATETIME,
	PRIMARY KEY (Id)
	);
GO


GO
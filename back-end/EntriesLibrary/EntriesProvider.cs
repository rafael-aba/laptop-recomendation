﻿using System;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace EntriesLibrary
{
    public class EntriesProvider
    {
        private const string CONN_STRING = "Server=db;Database=todolist-db;User Id=sa;Password=validpassword123!@#;";
        private const string QUERY_GET_ENTRY = "SELECT * FROM entries WHERE Id = @id";
        private const string QUERY_GET_ALL = "SELECT * FROM entries";
        private const string QUERY_GET_NOT_COMPLETED = "SELECT * FROM entries WHERE Completed = 0 AND Deleted = 0";
        private const string QUERY_GET_COMPLETED = "SELECT * FROM entries WHERE Completed = 1 AND Deleted = 0";
        private const string QUERY_GET_DELETED = "SELECT * FROM entries WHERE Deleted = 1";
        private const string QUERY_INSERT_NEW_ENTRY = "INSERT INTO entries (Text, Completed, Deleted, CreatedAt, CompletedAt, DeletedAt) VALUES (@text, 0, 0, @date, null, null); SELECT SCOPE_IDENTITY()";
        private const string QUERY_COMPLETE_ENTRY = "UPDATE entries SET Completed = 1, CompletedAt = @date WHERE Id = @id";
        private const string QUERY_UNCOMPLETE_ENTRY = "UPDATE entries SET Completed = 0, CompletedAt = null WHERE Id = @id";
        private const string QUERY_TOGGLE_ENTRY = "UPDATE entries SET Completed = @oppositeState, CompletedAt = @date WHERE Id = @id";
        private const string QUERY_DELETE_ENTRY = "UPDATE entries SET Deleted = 1, DeletedAt = @date WHERE Id = @id";
        private const string QUERY_EDIT_TEXT = "UPDATE entries SET Text = @text WHERE Id = @id";
        private const string QUERY_GET_NOT_DELETED = "SELECT * FROM entries WHERE Deleted = 0";

        public Entry[] Get_All()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Entry>(QUERY_GET_ALL).ToArray();
            }
        }

        public Entry[] Get_Not_Deleted()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Entry>(QUERY_GET_NOT_DELETED).ToArray();
            }
        }

        public Entry Get_Entry( int id)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Entry>(QUERY_GET_ENTRY, new { Id = id }).FirstOrDefault();
            }
        }

        public Entry[] Get_Not_Completed()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Entry>(QUERY_GET_NOT_COMPLETED).ToArray();
            }
        }

        public Entry[] Get_Completed()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Entry>(QUERY_GET_COMPLETED).ToArray();
            }
        }

        public Entry[] Get_Deleted()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Entry>(QUERY_GET_DELETED).ToArray();
            }
        }

        public int Insert_Entry(string text, DateTime date)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Execute(QUERY_INSERT_NEW_ENTRY, new { text, date });
            }
        }
        
        public int Complete_Entry(int id, DateTime date)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Execute(QUERY_COMPLETE_ENTRY, new { id, date});
            }
        }

        public int Uncomplete_Entry(int id)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Execute(QUERY_UNCOMPLETE_ENTRY, new { id });
            }
        }

        public int Toggle_Entry(int id, DateTime date)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                var oppositeState = !Get_Entry(id).Completed;
                return connection.Execute(QUERY_TOGGLE_ENTRY, new { id, oppositeState, date});
            }
        }

        public int Delete_Entry(int id, DateTime date)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Execute(QUERY_DELETE_ENTRY, new { id, date });
            }
        }

        public int Edit_Entry(int id, string text)
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Execute(QUERY_EDIT_TEXT, new { id, text });
            }
        }
    }
}


using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace TodolistLibrary
{
    public class TodoListProvider
    {
        private const string CONN_STRING = "Server=db;Database=todolist-db;User Id=sa;Password=SenhaForteParaNinguemQuebrarNaSorte;";
        private const string QUERY_GET_ALL = "SELECT Id, Text, Completed, Deleted FROM elements";
        private const string QUERY_GET_COMPLETED = "SELECT Id, Text, Completed, Deleted FROM elements WHERE Completed = 1";
        private const string QUERY_GET_NOT_COMPLETED = "SELECT Id, Text, Completed, Deleted FROM elements WHERE Completed = 0";
        
        public Element[] GetAll()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Element>(QUERY_GET_ALL).ToArray();
            }
        }

        public Element[] GetCompleted()
        {
            using (var connection = new SqlConnection(CONN_STRING))
            {
                return connection.Query<Element>(QUERY_GET_COMPLETED).ToArray();
            }
        }

        public Element[] GetNotCompleted()
        {
            using (var connection = new SqlConnection(QUERY_GET_NOT_COMPLETED))
            {
                return connection.Query<Element>(QUERY).ToArray();
            }
        }

    }
}

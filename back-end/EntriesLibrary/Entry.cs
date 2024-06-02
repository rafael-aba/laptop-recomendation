using System;

namespace EntriesLibrary
{
    public class Entry
    {
        public int Id { get; }
        public string Text { get; }
        public bool Completed { get; }
        public bool Deleted { get; }
        public DateTime CreatedAt { get; }
        public DateTime CompletedAt { get; }
        public DateTime DeletedAt { get; }
        
        public Entry(int id, string text, bool completed, bool deleted, DateTime createdAt, DateTime completedAt, DateTime deletedAt)
        {
            Id = id;
            Text = text;
            Completed = completed;
            Deleted = deleted;
            CreatedAt = createdAt;
            CompletedAt = completedAt;
            DeletedAt = deletedAt;
        }
    }
}
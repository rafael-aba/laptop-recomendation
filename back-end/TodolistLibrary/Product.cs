namespace TodolistLibrary
{
    public class Element
    {
        public int Id { get; }
        public string Text { get; }
        public bool Completed { get; }
        public bool Deleted { get; }
        
        public Element(int id, string text, bool completed, bool deleted)
        {
            Id = id;
            Text = text;
            Completed = completed;
            Deleted = deleted;
        }
    }
}
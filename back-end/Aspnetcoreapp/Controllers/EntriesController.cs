using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using EntriesLibrary;

namespace aspnetcoreapp.Controllers
{
    [Route("")]
    public class EntriesController : ControllerBase
    {
        private readonly EntriesProvider _provider = new EntriesProvider();

        [HttpGet("health")]
        public ActionResult<bool> Healthcheck()
        {
            return true;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Entry>> Get()
        {
            try
            {
                return _provider.Get_All();
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Entry> Get(int id)
        {
            try
            {
                return _provider.Get_Entry(id);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpGet("list")]
        public ActionResult<IEnumerable<Entry>> GetNotDeleted()
        {
            try
            {
                return _provider.Get_Not_Deleted();
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpGet("not-completed")]
        public ActionResult<IEnumerable<Entry>> GetNotCompleted()
        {
            try
            {
                return _provider.Get_Not_Completed();
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpGet("completed")]
        public ActionResult<IEnumerable<Entry>> GetCompleted()
        {
            try
            {
                return _provider.Get_Completed();
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpGet("deleted")]
        public ActionResult<IEnumerable<Entry>> GetDeleted()
        {
            try
            {
                return _provider.Get_Deleted();
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpPost]
        public ActionResult<int> Post([FromBody] Entry entry)
        {
            if (string.IsNullOrEmpty(entry.Text))
            {
                return BadRequest("Empty text");
            }

            try
            {
                return _provider.Insert_Entry(entry.Text, DateTime.Now);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpPut("{id}/complete")]
        public ActionResult<int> Complete(int id)
        {
            try
            {
                return _provider.Complete_Entry(id, DateTime.Now);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpPut("{id}/toggle")]
        public ActionResult<int> Toggle(int id)
        {
            try
            {
                return _provider.Toggle_Entry(id, DateTime.Now);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpPut("{id}/uncomplete")]
        public ActionResult<int> Unomplete(int id)
        {
            try
            {
                return _provider.Uncomplete_Entry(id);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpPut("{id}/delete")]
        public ActionResult<int> Delete(int id)
        {
            try
            {
                return _provider.Delete_Entry(id, DateTime.Now);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }

        [HttpPost("{id}")]
        public ActionResult<int> Edit([FromRoute] int id, [FromBody] Entry entry)
        {
            try
            {
                return _provider.Edit_Entry(id, entry.Text);
            }
            catch (Exception e)
            {
                throw new Exception("Internal Server Error", e);
            }
        }
    }
}
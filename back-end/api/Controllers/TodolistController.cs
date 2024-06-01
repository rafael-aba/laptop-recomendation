using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodolistLibrary;

namespace aspnetcoreapp.Controllers
{
    [Route("")]
    public class TodolistController : ControllerBase
    {
        private readonly TodolistProvider _provider = new TodolistProvider();

        [HttpGet]
        public ActionResult<IEnumerable<Element>> Get()
        {
            try
            {
                return _provider.GetAll();
            }
            catch (Exception e)
            {
                Console.WriteLine("Something went wrong. Maybe DB is not fully initialized yet? Try again in a few minutes.");
                Console.WriteLine({e});
                
                throw new Exception("Internal server error");
            }
        }
    }
}
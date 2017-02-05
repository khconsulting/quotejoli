using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using quotejoliservice.Data;
using quotejoliservice.Models;

namespace quotejoliservice.Controllers
{
    public class QuotesController : ApiController
    {
        private quotejoliContext db = new quotejoliContext();

        [Route("api/Quotes")]
        [HttpGet]
        public IQueryable<Quote> GetQuotes()
        {
            return db.Quotes;
        }

        [ResponseType(typeof(Quote))]
        [Route("api/Quotes")]
        [HttpPost]
        public IHttpActionResult AddQuote(Quote quote)
        {
            // Validate incoming quote object
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Save the quote to the database
                db.Quotes.Add(quote);
                db.SaveChanges();

                return StatusCode(HttpStatusCode.Created);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IHttpActionResult UpdateQuote(Quote quote)
        {
            var id = 0;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != quote.id)
            {
                return BadRequest();
            }

            db.Entry(quote).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        // GET: api/Quotes/5
        [ResponseType(typeof(Quote))]
        public IHttpActionResult GetQuote(int id)
        {
            Quote quote = db.Quotes.Find(id);
            if (quote == null)
            {
                return NotFound();
            }

            return Ok(quote);
        }

        // POST: api/Quotes
        [ResponseType(typeof(Quote))]
        public IHttpActionResult PostQuote(Quote quote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Quotes.Add(quote);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = quote.id }, quote);
        }

        // DELETE: api/Quotes/5
        [ResponseType(typeof(Quote))]
        public IHttpActionResult DeleteQuote(int id)
        {
            Quote quote = db.Quotes.Find(id);
            if (quote == null)
            {
                return NotFound();
            }

            db.Quotes.Remove(quote);
            db.SaveChanges();

            return Ok(quote);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QuoteExists(int id)
        {
            return db.Quotes.Count(e => e.id == id) > 0;
        }
    }
}